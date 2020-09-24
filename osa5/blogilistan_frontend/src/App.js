import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Message from './components/Message'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)

    const sortedBlogs = blogs.sort(function (a, b) {
        return b.likes - a.likes
    })

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUser')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem('loggedUser')
    }

    const messageWith = (message, type = 'success') => {
        setMessage({ message, type })
        setTimeout(() => {
            setMessage(null)
        }, 4000)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            setUser(user)
            setUsername('')
            setPassword('')
            blogService.setToken(user.token)
        } catch (exception) {
            messageWith('wrong username or password', 'error')
        }
    }

    const createBlog = async (blogObject) => {
        try {
            const returnedBlog = await blogService.post(blogObject)
            setBlogs(blogs.concat(returnedBlog))
            messageWith(`${blogObject.title} added succesfully`)
        } catch (exception) {
            messageWith('required information missing', 'error')
        }
    }

    const updateBlogLike = async (blog) => {
        try {
            const oldBlog = blogs.find(b => b.id === blog.id)
            const changedBlog = { ...oldBlog, likes: oldBlog.likes + 1 }
            await blogService.put(changedBlog)
            setBlogs(blogs.map(b => b.id === blog.id ? changedBlog : b))
        } catch (exception) {
            messageWith('something went wrong when updating blog', 'error')
        }
    }

    const removeBlog = async (blog) => {
        const confirm = window.confirm(`remove ${blog.title} by ${blog.author}?`)
        if (confirm) {
            try {
                await blogService.remove(blog.id)
                setBlogs(blogs.filter(b => b !== blog))
            } catch (exception) {
                if (exception.message.includes('403')) {
                    messageWith('You are not authorized to remove this blog', 'error')
                } else {
                    messageWith('something went wrong when removing blog', 'error')
                }
            }
        }
    }

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div id='loginForm'>
                <h2>log in to application</h2>
                <div> username <input id='username' name="username" type="text" value={username}
                    onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div> password <input id='password' name="password" type="password" value={password}
                    onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button id='login-button' type="submit"> login </button>
            </div>
        </form>
    )

    const showBlogs = () => (
        <div>
            <h2>blogs</h2>
            <p>{user.name} logged in <button onClick={handleLogout}> logout </button> </p>
            {sortedBlogs.map(blog =>
                <Blog key={blog.id} blog={blog} updateBlogLike={updateBlogLike} removeBlog={removeBlog}
                    userId={user.id} />
            )}
        </div>
    )

    return (
        <div>
            <Message message={message} />
            {user === null ? loginForm() : showBlogs()}
            {user !== null && <BlogForm addBlog={createBlog} />}
        </div>
    )
}

export default App