import { ALL_AUTHORS, ALL_BOOKS } from '../graphql/queries'

// function that takes care of manipulating cache
export const updateCache = (cache, addedBook) => {
  // helper that is used to eliminate saving same book twice
  const uniqById = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.id
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
    return {
      allBooks: uniqById(allBooks.concat(addedBook)),
    }
  })
  cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
    const authorExist = allAuthors.find(item => item.id === addedBook.author.id)

    return {
      allAuthors: !authorExist ? uniqById(allAuthors.concat(addedBook.author)) : allAuthors
    }
  })
}
