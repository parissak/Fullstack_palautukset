import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'
import styled from 'styled-components'

const Button = styled.button`
background: white;
color: black;
padding: 0.25em 1em;
border: 2px solid cornflowerBlue;
border-radius: 3px;
`

const Nav = () => {
    const user = useSelector(({ user }) => user)
    const dispatch = useDispatch()

    const padding = {
        paddingLeft: 10
    }

    return (
        <div>
            <Link style={padding} to="/">home</Link>
            <Link style={padding} to="/blogs">blogs</Link>
            <Link style={padding} to="/users">users</Link>
            {user &&
                <span style={padding}> {user.name} logged in <Button onClick={() => dispatch(logout())}> logout </Button> </span>}
            {!user &&
                <Link style={padding} to="/login">login</Link>}
        </div>

    )
}

export default Nav