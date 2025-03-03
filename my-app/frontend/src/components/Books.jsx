import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, FILTRED_BOOKS } from '../graphql/queries'


const Books = (props) => {
  const [genre, setGenre] = useState(null)
  let booksToShow = []
  const getFiltredBooks = useQuery(FILTRED_BOOKS, {
    variables: { genre },
    skip: !genre,
    fetchPolicy: 'network-only'
  })
  const queryAllBooks = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }
  if (getFiltredBooks.loading)  {
    return <div>loading...</div>
  }
  if (genre && getFiltredBooks.data) {
    booksToShow = getFiltredBooks.data.allBooks
  } else {
    if (!genre){
      booksToShow = queryAllBooks.data.allBooks
    }
  }
  const books = queryAllBooks.data.allBooks


  const genresList = [...new Set(books.flatMap((book) => book.genres))]
  return (
    <div>
      <h2>books</h2>
      <div>in genre: <b>{genre ? `${genre}` : 'all genres'}</b></div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.id}>
              <td>{ a.title }</td>
              <td>{ a.author.name }</td>
              <td>{ a.published }</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genresList.map((genre) => (
          <button key={genre} onClick={() => setGenre(genre)}
          >
            {genre}
          </button>
        ))}
        <button onClick={() => setGenre(null)} >all genres</button>
      </div>
    </div>
  )
}

export default Books