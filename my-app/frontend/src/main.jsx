import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  HttpLink,
  split
} from '@apollo/client'

import { setContext } from '@apollo/client/link/context'

import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

import storage from './services/storage.js'

const authLink = setContext((_, { headers }) => {
  const token = storage.loadToken()
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
})

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000',
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_BACKEND_WS || 'ws://localhost:4000/subscriptions',
  })
)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)