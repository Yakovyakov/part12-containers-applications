import { useEffect, useState } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'

import { GET_USER, INIT_QUERY } from './graphql/queries'
import { BOOK_ADDED } from './graphql/subscriptions'

import { updateCache } from './utils/updateCache'

import storage from './services/storage'
import LoginForm from './components/LoginForm'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import Notification from './components/Notification'
import Footer from './components/Footer'



const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const result = useQuery(INIT_QUERY)
  const client = useApolloClient()
  useEffect(() => {
    const token = storage.loadToken()
    if (token) {
      setToken(token)
    }
  }, [])
  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      notifyWith('Book Added', 'notification')
      updateCache(client.cache,  addedBook)
    },
  })
  const notifyWith = (message, type='notification') => {
    setErrorMessage({
      'txt':message,
      'type': type
    })

    setTimeout(() => {
      setErrorMessage( null )
    }, 5000)
  }
  const logout = () => {
    setToken(null)
    storage.removeToken()
    client.resetStore()
    setPage('books')
  }
  const dataUser = useQuery(GET_USER, {
    skip: !token, // Skip the query if the user is not logged in
  })
  if (result.loading || dataUser.loading)  {
    return <div>loading...</div>
  }
  const user = dataUser.data?.me
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { !token && <button onClick={() => setPage('login')}>login</button> }
        { token && <button onClick={() => setPage('add')}>add book</button> }
        { token && <button onClick={() => setPage('recommend')}>recommend</button> }
        { token && <button onClick={() => logout()}>logout</button>}
      </div>

      <Notification message={errorMessage}/>

      <Authors show={page === 'authors'} token={ token } setError={ notifyWith }/>

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} setError={ notifyWith }/>

      <LoginForm show={ page === 'login' } setToken={ setToken } setPage={ setPage } setError={ notifyWith }/>

      <Recommend show={page === 'recommend'} user={user} />

      <Footer />

    </div>
  )
}

export default App