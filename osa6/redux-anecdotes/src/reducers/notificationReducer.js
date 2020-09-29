const reducer = (state = '', action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      const front = action.data.frontPart
      const objectContent = action.data.content
      const stringed = `${front} "${objectContent}"`
      return stringed
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

export const setNotification = (frontPart, content, time) => {
  const seconds = time * 1000
  return async dispatch => {
    await dispatch({
      type: 'ADD_MESSAGE',
      data: { frontPart: frontPart, content: content }
    })
    
    setTimeout(() => {
      dispatch( clearMessage())
    }, seconds)
  }
}

export const clearMessage = () => {
  return {
    type: 'CLEAR',
  }
}


export default reducer