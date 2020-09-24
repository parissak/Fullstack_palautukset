import React from 'react'
import PropTypes from 'prop-types'

const Message = ({ message }) => {
    if (!message) {
        return null
    }

    const succesfull = { color: 'green', fontSize: 20 }
    const unsuccesfull = { color: 'red', fontSize: 20 }
    const messageStyle = message.type === 'error' ? unsuccesfull : succesfull

    return (
        <div className='message' style={messageStyle}>
            <p> {message.message} </p>
        </div>
    )
}

Message.propTypes = {
    message: PropTypes.object
}

export default Message