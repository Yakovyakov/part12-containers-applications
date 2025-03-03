import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { useField } from '../hooks'

import { ADD_BOOK } from '../graphql/mutations'

import { updateCache } from '../utils/updateCache'

const NewBook = ({ show, setError }) => {
  const title = useField('text')
  const author = useField('text')
  const published = useField('number')
  const genre = useField('text')
  const [genres, setGenres] = useState([])
  const [ addBook ] = useMutation(ADD_BOOK, {
    onError: (error) => {
      let messages=''
      if (error.graphQLErrors){
        messages = error.graphQLErrors.map(e => `['GraphQLError:'] ${e.message}`).join('\n')
      }
      if (error.networkError){
        messages = `[Network error]: ${error.networkError}`
      }
      console.log(messages)
      setError(messages, 'error')
    },
    update: (cache, response) => {
      updateCache(cache, response.data.addBook)
    }
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')
    addBook({ variables: {
      title: title.inputFields.value,
      author: author.inputFields.value,
      published: parseInt(published.inputFields.value),
      genres,
    } })
    title.setValue('')
    published.setValue('')
    author.setValue('')
    genre.setValue('')
    setGenres([])

  }

  const addGenre = () => {
    setGenres(genres.concat(genre.inputFields.value))
    genre.setValue('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            placeholder='title...'
            { ...title.inputFields }
          />
        </div>
        <div>
          author
          <input
            placeholder='author...'
            { ...author.inputFields }
          />
        </div>
        <div>
          published
          <input
            placeholder='published year...'
            { ...published.inputFields }
          />
        </div>
        <div>
          <input
            placeholder='add genre...'
            { ...genre.inputFields }
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: { genres.join(' ') }</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook