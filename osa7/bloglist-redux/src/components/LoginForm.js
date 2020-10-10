import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import styled from 'styled-components'

const Button = styled.button`
background: cornflowerBlue;
color: white;
padding: 0.25em 1em;
border: 2px solid cornflowerBlue;
border-radius: 3px;
`
const Input = styled.input`
margin: 0.25em
`
const LoginForm = () => {
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        dispatch(login(username, password))
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div id='loginForm'>
                    <h2>log in to application</h2>
                    <div> username <Input id='username' name="username" type="text" value={username}
                        onChange={({ target }) => setUsername(target.value)} />
                    </div>
                    <div> password <Input id='password' name="password" type="password" value={password}
                        onChange={({ target }) => setPassword(target.value)} />
                    </div>
                    <Button id='login-button' type="submit"> login </Button>
                </div>
            </form>
        </div >
    )
}

export default LoginForm