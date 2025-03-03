/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { LOGIN } from '../graphql/mutations'

import { useField } from '../hooks'

import storage from '../services/storage'


const LoginForm = ({ show, setToken, setPage, setError }) => {
  const username = useField('text')
  const password = useField('password')


  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      let messages=''
      if (error.graphQLErrors){
        messages = error.graphQLErrors.map(e => `['GraphQLError:'] ${e.message}`).join('\n')
      }
      if (error.networkError){
        messages = `[Network error]: ${error.networkError}`
      }
      setError(messages, 'error')
    }
  })



  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      storage.saveToken(token)
      setPage('authors')
      username.setValue('')
      password.setValue('')
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username: username.inputFields.value, password: password.inputFields.value } })
  }
  if ( !show )
    return null

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            { ...username.inputFields }
          />
        </div>
        <div>
          password <input
            { ...password.inputFields }
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm