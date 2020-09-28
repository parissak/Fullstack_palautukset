const reducer = (state = '', action) => {
  switch (action.type) {
    case 'ADD_ANECDOTE':
      return `you added "${action.data}"`
    case 'VOTE_ANECDOTE':
      return `you voted "${action.data}"`
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

export const addAnecdoteMessage = (message) => {
  return {
    type: 'ADD_ANECDOTE',
    data: message
  }
}

export const voteAnecdoteMessage = (name) => {
  return {
    type: 'VOTE_ANECDOTE',
    data: name
  }
}

export const clearMessage = () => {
  return {
    type: 'CLEAR',
  }
}


export default reducer