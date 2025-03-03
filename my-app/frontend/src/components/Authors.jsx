
import { useQuery } from '@apollo/client'

import { ALL_AUTHORS } from '../graphql/queries'

import AuthorBirthYear from './AuthorBirthYear'

const Authors = ({ token, show, setError }) => {
  const result = useQuery(ALL_AUTHORS)
  const showBirthForm = token ? true : false
  if (!show) {
    return null
  }
  if (result.loading)  {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      { showBirthForm && <AuthorBirthYear authors={ authors } setError={ setError } /> }
    </div>
  )
}

export default Authors