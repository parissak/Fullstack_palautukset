import React, { useState, useEffect } from 'react'
import { LOGIN } from '../queries'
import { useMutation } from '@apollo/client'

const LoginForm = ({ show, setToken, setPage }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [login, loginResult] = useMutation(LOGIN)
 
    useEffect(() => {
        if (loginResult.data) {
            const token = loginResult.data.login.value
            setToken(token)
            localStorage.setItem('library-user-token', token)
        }
    }, [loginResult.data]) //eslint-disable-line

    if (!show) {
        return null
    }

    const submit =  (event) => {
        event.preventDefault()
        login({ variables: { username, password } })
        setUsername('')
        setPassword('')
        setPage('books')
    }

    return (
        <div>
            <h2>login</h2>
            <form onSubmit={submit}>
                <div>
                    username
                    <input value={username} onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
                    password
                    <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button>login</button>
            </form>
        </div >
    )
}

export default LoginForm