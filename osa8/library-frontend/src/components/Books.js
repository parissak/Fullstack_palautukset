import React, { useState, useEffect } from 'react'

const Books = ({ show, allBooks }) => {
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])

  useEffect(() => {
    setBooks(allBooks)
  }, [allBooks])

  useEffect(() => {
    books.map(book =>
      book.genres.map(g => {
        if (!genres.includes(g)) {
          setGenres(genres.concat(g))
        }
        return null
      }))
  }, [books, genres])

  if (!show) {
    return null
  }

  const filterGenre = (option) => {
    const filter = option.genre

    let filteredBooks = []
    allBooks.map(book => {
      if (book.genres.includes(filter)) {
        filteredBooks.push(book)
      }
      return null
    })
    setBooks(filteredBooks)
  }

  const setAllBooks = () => {
    setBooks(allBooks)
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
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