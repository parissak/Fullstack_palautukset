import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Message from './components/Message'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)

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

  const handleBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    try {
      await blogService.post(blogObject)
      setBlogs(blogs.concat(blogObject))
      messageWith(`${title} added succesfully`)
    } catch (exception) {
      messageWith('required information missing', 'error')
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <h2>log in to application</h2>
        <div> username <input name="username" type="text" value={username}
          onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div> password <input name="password" type="password" value={password}
          onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit"> login </button>
      </div>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={handleBlog}>
      <div>
        <h2>create new</h2>
        <div> title: <input name="title" type="text" value={title}
          onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div> author: <input name="author" type="text" value={author}
          onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div> url: <input name="url" type="text" value={url}
          onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit"> create </button>
      </div>
    </form>
  )

  const showBlogs = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}> logout </button> </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <Message message={message}/>
      {user === null ? loginForm() : showBlogs()}
      {user !== null && blogForm()}
    </div>
  )
}

export default App