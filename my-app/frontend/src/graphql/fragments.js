import { gql } from '@apollo/client'

const AUTHOR_DETAILS =gql`
  fragment AuthorDetails on Author {
    id
    name
    born
    bookCount
  }
`
const BOOK_DETAILS=gql`
  fragment BookDetails on Book {
    id
    title
    published
    genres
    author{
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`
export { AUTHOR_DETAILS, BOOK_DETAILS }