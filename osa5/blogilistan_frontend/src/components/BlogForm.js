import React, { useState } from 'react'

const BlogForm = ({ addBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const setEmptyValues = () => {
        setVisible(false)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    const handleBlog = async (event) => {
        event.preventDefault()
        const blogObject = {
            title: title,
            author: author,
            url: url
        }
        addBlog(blogObject)
        setEmptyValues()
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>new note</button>
            </div>
            <div style={showWhenVisible}>
                <form onSubmit={handleBlog}>
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
                    <button type="submit"> create new blog </button>
                </form>
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div >
    )
}

export default BlogForm