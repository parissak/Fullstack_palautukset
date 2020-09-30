import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const filteredAnecdotes = useSelector(({ anecdotes, filter }) => {
        const nonFiltered = anecdotes.sort(function (a, b) { return b.votes - a.votes })
        if (filter !== '') {
            const filtered = anecdotes.filter(a => a.content.toLowerCase().includes(filter))
            return filtered
        }
        return nonFiltered
    })

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification("you voted", anecdote.content, 5))
    }

    return (
        <div>
            {filteredAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList