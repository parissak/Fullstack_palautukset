import React from 'react'

const Error = ({ message }) => {
    const unsuccessfull = {
        color: 'red',
        fontSize: 20,
        padding: 10,
        marginBottom: 10
    }

    if (message === null) {
        return null
    }

    return (
        <div style={unsuccessfull}>
            {message}
        </div>
    )
}

export default Error