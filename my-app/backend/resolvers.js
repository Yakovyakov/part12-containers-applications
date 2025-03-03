const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const resolvers = {
  Query: {
    dummy: () => 0,
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let query = {}

      if (args.author){
        const author = await Author.findOne({ name: args.author })
        if (!author)
          return []
        query.author = author._id.toString()
      }
      if (args.genre)
        query.genres = args.genre
      const books = await Book.find(query).populate({
        path: 'author',
        populate: { path: 'bookCount' }
      })
      return books
    },
    allAuthors: async () => {
      const authors = await  Author.find({}).populate('bookCount')
      return authors

    },
    me: (root, args, context) => {
      return context.currentUser
    },


  },
  Mutation: {
    addBook: async (root, args,context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      const newBook = new Book({
        ...args
      })
      let authorID = ''
      let author = await Author.findOne({ name: args.author }).populate('bookCount')
      if (!author){
        author = new Author({
          name: args.author,
        })
        try {
          const savedAuthor = await author.save()
          authorID = savedAuthor._id.toString()
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
        /*
        Init virtual bookCount
        */
        author.bookCount=0
      } else {
        authorID = author._id
      }
      /*
      Update virtual bookCount
      */
      author.bookCount=author.bookCount + 1
      newBook.author = authorID
      try {
        await newBook.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error
          }
        })

      }
      /*
      const populatedBook = await Book.populate(newBook, {
        path: 'author'
      })

      pubsub.publish('BOOK_ADDED', { bookAdded: populatedBook })
      return populatedBook
      */
      newBook.author=author
      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
      return newBook
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      const author = await Author.findOne({ name: args.name }).populate('bookCount')
      if (!author)
        return null
      author.born = args.setBornTo
      return author.save()
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
    },
    /*
    User Mutations
    */
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED'),
    },
  },
  /*
  Author: {
    bookCount: async (root) => {
        console.log(root)
      const books= await Book.find({ author: root.id })
      console.log('[Author.bookCount]: booksCount(Book.find): ', !books ? 0 : books.length)

      return  (!books ? 0 : books.length)
    }
  }
    */
}
module.exports = resolvers