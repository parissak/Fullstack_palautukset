import React from 'react'
import BookList from './BookList'
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
        <BookList books={books.data.allBooks} />
    )
}
