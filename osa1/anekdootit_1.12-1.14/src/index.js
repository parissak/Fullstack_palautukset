import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))

  const newNumber = () => {
    var arrayLength = props.anecdotes.length
    var ranNumber = Math.floor(Math.random() * Math.floor(arrayLength))
    setSelected(ranNumber)
  }

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const mostVoted = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <div>
          {props.anecdotes[selected]}
        </div>
        <div>
          has {votes[selected]} votes
        </div>
        <div>
          <button onClick={vote}>vote</button>
          <button onClick={newNumber}>next anecdote</button>
        </div>
      </div>
      <div>
        <Anecdotes votes={votes} anecdotes={anecdotes} mostVoted={mostVoted} />
      </div>
    </div>
  )
}

const Anecdotes = ({ votes, anecdotes, mostVoted }) => {
  if (mostVoted === 0 && votes[mostVoted] === 0) {
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        <div>No votes yet!</div>
      </div>
    )
  }

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[mostVoted]}</div>
      <div>has {votes[mostVoted]} votes</div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)