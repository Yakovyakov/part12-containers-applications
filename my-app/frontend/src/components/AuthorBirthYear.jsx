import { useState } from 'react'
import Select from 'react-select'
import { useMutation } from '@apollo/client'

import { useField } from '../hooks'

import { ALL_AUTHORS } from '../graphql/queries'
import { EDIT_AUTHOR } from '../graphql/mutations'



const AuthorBirthYear = ({ authors, setError }) => {
  const bornYear = useField('number')
  const [selectedOption, setSelectedOption] = useState(null)
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      let messages=''
      if (error.graphQLErrors){
        messages = error.graphQLErrors.map(e => `['GraphQLError:'] ${e.message}`).join('\n')
      }
      if (error.networkError){
        messages = `[Network error]: ${error.networkError}`
      }
      setError(messages, 'error')
    },
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        return {
          allAuthors: allAuthors.map(author => author.id === response.data.editAuthor.id ? response.data.editAuthor : author),
        }
      })
    },
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!selectedOption){
      return
    }
    const name = selectedOption.value
    editAuthor({
      variables: {
        name,
        born: parseInt(bornYear.inputFields.value)
      }
    })
  }
  const handleChangeSelect = (e) => {
    const author = authors.find(a => a.name === e.value)

    setSelectedOption({ value: author.name, label: author.name })
    if (author.born)
      bornYear.setValue(author.born)
  }
  if ( !authors || authors.length === 0)
    return null

  const selectAuthorOptions = authors.map((author) => (
    { value: author.name, label: author.name }
  ))
  return (
    <div>
      <h2>Set birthday</h2><form onSubmit={handleSubmit}>
        <div>
              Author
          <Select
            defaultValue={selectedOption}
            onChange={handleChangeSelect}
            options={selectAuthorOptions} />
        </div>
        <div>
              Born
          <input
            { ...bornYear.inputFields } />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AuthorBirthYear


