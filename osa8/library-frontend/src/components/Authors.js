import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_BIRTHYEAR } from '../queries'

const Authors = ({ show, authors }) => {
  const [name, setName] = useState(authors[0].name)
  const [born, setBorn] = useState('')
  const [updateAuthor] = useMutation(UPDATE_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!show) {
    return null
  }

  const submit = (event) => {
    event.preventDefault()
    const setBornTo = Number(born)
    updateAuthor({ variables: { name, setBornTo } })
    setName(authors[0].name)
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>authors</h2>
      <form onSubmit={submit}>
        <div>
          <label>name
          <select value={name} onChange={({ target }) => setName(target.value)}>
              {authors.map(a =>
                <option key={a.name}>
                  {a.name}
                </option>)}
            </select>
          </label>
        </div>
        <div>
          <label>born
          <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </label>
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
