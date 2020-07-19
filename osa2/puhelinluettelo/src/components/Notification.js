import React from 'react'

const Notification = ({ message }) => {
    const successfull = {
        color: 'green',
        fontSize: 20,
        padding: 10,
        marginBottom: 10
    }

    if (message === null) {
        return null
    }

    return (
        <div style={successfull}>
            {message}
        </div>
    )
}

export default Notification