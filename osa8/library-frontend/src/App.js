
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'

import { useQuery, useLazyQuery, useApolloClient, useSubscription } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, ME, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('books')
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => {
      set.map(p => p.id).includes(object.id)
    }

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  const [getUser, userData] = useLazyQuery(ME,
    {
      fetchPolicy: "no-cache",
    })

  useEffect(() => {
    if (userData.data) {
      setUser(userData.data.me)
    }
  }, [userData])

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  useEffect(() => {
    const loggedToken = window.localStorage.getItem('library-user-token')
    if (loggedToken) {
      setToken(loggedToken)
    }
  }, [])


  if (authors.loading || books.loading || userData.loading) {
    return <div>loading...</div>
  }


  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.clear()
    client.resetStore()
    setPage('books')
  }

  const populate = () => {
    getUser()
    setPage('recommended')

  }

  return (
    <div>
      <div>
        {token && <button onClick={() => setPage('authors')}>authors</button>}
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => populate()}>recommend</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={() => logout()}>logout</button>}
      </div>

      <Authors
        show={page === 'authors'} authors={authors.data.allAuthors}
      />

      <Books
        show={page === 'books'} allBooks={books.data.allBooks}
      />

      <LoginForm setToken={setToken} setPage={setPage}
        show={page === 'login'}
      />

      <NewBook
        show={page === 'add'} setPage={setPage}
      />

      <Recommended
        show={page === 'recommended'} user={user}
      />
    </div>
  )
}

export default App