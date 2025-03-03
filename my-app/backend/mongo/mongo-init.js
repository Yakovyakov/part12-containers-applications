const initialBooks = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    genres: ['classic', 'crime']
  },
  {
    title: 'Demons',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    genres: ['classic', 'revolution']
  },
];

const initialAuthors = [
  {

    name: 'Robert Martin',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    born: 1821
  },
  {
    name: 'Joshua Kerievsky'
  },
  {
    name: 'Sandi Metz'
  },
];

const initialUsers = [
  {
    username: 'mluukkai',
    favoriteGenre: 'patterns'
  },
  {
    username: 'hellas',
    favoriteGenre: 'code'
  },
  {
    username: 'root',
    favoriteGenre: 'revolution'
  }
  
]
const adminDb = db.getSiblingDB('admin');
adminDb.auth('root', 'example');
/* select bd or create */
db = db.getSiblingDB('library_database');
db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'library_database',
    },
  ],
});


db.createCollection('users');
db.createCollection('books');
db.createCollection('authors');

authorsResult = db.authors.insertMany(initialAuthors)
const authorsMap = {}; // Map to store name --> _id

Object.entries(authorsResult.insertedIds).forEach(([index, id]) => {
  const authorName = initialAuthors[parseInt(index)].name;
  authorsMap[authorName] = id;
});
const booksToInsert = initialBooks.map(book => {
  return {
    title: book.title,
    published: book.published,
    author: authorsMap[book.author], // Reference _id --> author
    genres: book.genres
  };
});
db.books.insertMany(booksToInsert);
db.users.insertMany(initialUsers);

