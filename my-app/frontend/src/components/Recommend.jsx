import { useQuery } from '@apollo/client'
import { ALL_BOOKS, FILTRED_BOOKS } from '../graphql/queries'




const Recommend = ({ show, user }) => {
  const genre = !user?.favoriteGenre ? null : user.favoriteGenre
  let booksToShow = []
  const getFiltredBooks = useQuery(FILTRED_BOOKS, {
    variables: { genre },
    skip: !genre,
    fetchPolicy: 'no-cache'
  })
  const queryAllBooks = useQuery(ALL_BOOKS)

  if (!show) {
    return null
  }
  if (getFiltredBooks.loading)  {
    return <div>loading...</div>
  }
  if (genre && getFiltredBooks.data) {
    booksToShow = getFiltredBooks.data.allBooks
  }
  const books = queryAllBooks.data.allBooks


  const genresList = [...new Set(books.flatMap((book) => book.genres))]
  return (
    <div>
      <h2>recommendations</h2>
      { genre &&
        <div>books in your favorite genre : <b>{genre}</b></div>
      }
      { !genre &&
        <div>You don&apos;t have favorite genres to recommend yet</div>
      }

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend