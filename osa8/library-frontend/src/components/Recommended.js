import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommended = ({ show, user }) => {
    if (!show || user === null) {
        return null
    }

    return (
        <div>
            <h2>recommendations</h2>
            <p>books in your favorite genre <b> {user.favoriteGenre} </b></p>
            <RecommendedList genre={user.favoriteGenre} />
        </div>
    )
}

export default Recommended

const RecommendedList = ({ genre }) => {
    const books = useQuery(ALL_BOOKS,
        {
            fetchPolicy: "no-cache",
            variables: { genre: genre }
        })

    if (books.loading) {
        return <div>loading...</div>
    }

    return (
        <div>
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
                    {books.data.allBooks.map(a =>
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
