const messageReducer = (state = null, action) => {
    switch (action.type) {
    case 'ADD_MESSAGE': {
        const message = action.data
        return message
    }
    case 'EMPTY_MESSAGE':
        return null
    default:
        return state
    }
}

export const setMessage = (message) => {
    return dispatch => {
        dispatch({
            type: 'ADD_MESSAGE',
            data: message
        })

        setTimeout(() => {
            dispatch({
                type: 'EMPTY_MESSAGE'
            })
        }, 4000)
    }
}

export default messageReducer