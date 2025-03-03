import { gql } from '@apollo/client'
import { AUTHOR_DETAILS, BOOK_DETAILS } from './fragments'

export const INIT_QUERY = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
  ${AUTHOR_DETAILS}
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`
export const ALL_BOOKS = gql`
  query {
    allBooks  {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}

`
export const FILTRED_BOOKS = gql`
  query filtredBook($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
export const GET_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`
