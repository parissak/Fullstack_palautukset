import React, { useState, useEffect } from 'react'
import { ALL_BOOKS } from '../queries'
import { useQuery, useLazyQuery } from '@apollo/client'
import BookList from './BookList'

const Books = ({ show }) => {
  const allBooks = useQuery(ALL_BOOKS)
  const [genreBooks, genreBooksResult] = useLazyQuery(ALL_BOOKS)

  const [books, setBooks] = useState(null)
  const [genres, setGenres] = useState([])

  useEffect(() => {
    if (allBooks.data && allBooks.data.allBooks) {
      const books = allBooks.data.allBooks
      setBooks(books)
      books.map(book =>
        book.genres.map(g => {
          if (!genres.includes(g)) {
            setGenres(genres.concat(g))
          }
          return null
        }))
    }
  }, [allBooks.data, genres])

  useEffect(() => {
    if (genreBooksResult.data) {
      setBooks(genreBooksResult.data.allBooks)
    }
  }, [genreBooksResult.data])

  if (!show || !books) {
    return null
  }

  const filterGenre = (option) => {
    genreBooks({
      variables: {
        genre: option.genre
      }
    })
  }

  const setAllBooks = () => {
    setBooks(allBooks.data.allBooks)
  }

  return (
    <div>
      <h2>books</h2>
        <BookList books={books} />
      <p>
        {genres.map(genre =>
          <span key={genre}>
            <button onClick={() => filterGenre({ genre })}>{genre}</button>
          </span>)
        }
        <span>
          <button onClick={() => setAllBooks()}>all</button>
        </span>
      </p>

    </div>
  )
}

export default Books