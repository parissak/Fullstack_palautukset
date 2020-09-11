import React from 'react'

const Message = ({ message }) => {
    if (!message) {
        return null
    }

    console.log(message.type)

    const succesfull = {color:'green', fontSize:20}
    const unsuccesfull = {color:'red', fontSize:20}
    const messageStyle = message.type === 'error' ? unsuccesfull : succesfull

    return (
        <div style={messageStyle}>
            <p> {message.message} </p>
        </div>
    )
}

export default Message