import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styled from 'styled-components'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userListReducer'
import { setUser } from './reducers/userReducer'

import Blog from './components/Blog'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Message from './components/Message'
import Nav from './components/Nav'
import UserList from './components/UserList'
import User from './components/User'

const Page = styled.div`
background: whitesmoke;
width: 100vw;
min-height: 100vh;
`

const Navigation = styled.div`
background: cornflowerBlue;
height: 20vh;
line-height: 20vh;
font-size: 20px;
`

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUser')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            dispatch(setUser(user))
        }
    }, [dispatch])

 

    return (
        <Page>
            <Router>
                <Navigation>
                    <Nav />
                </Navigation>
                <Message />

                <Switch>
                    <Route path="/users/:id">
                        <User />
                    </Route>
                    <Route path="/users">
                        <UserList />
                    </Route>
                    <Route path="/blogs/:id">
                        <Blog />
                    </Route>
                    <Route path="/blogs">
                        <BlogList />
                    </Route>
                    <Route path="/login">
                        <LoginForm />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </Page>
    )
}

const Home = () => {
    return (
        <div>
            <h2>You are Home</h2>
        </div>
    )
}

export default App