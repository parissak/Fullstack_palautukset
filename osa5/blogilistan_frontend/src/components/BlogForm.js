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
                <button id='buttonShow' onClick={toggleVisibility}>new note</button>
            </div>
            <div style={showWhenVisible}>
                <form onSubmit={handleBlog}>
                    <h2>create new</h2>
                    <div> title: <input id='title' name="title" type="text" value={title}
                        onChange={({ target }) => setTitle(target.value)} />
                    </div>
                    <div> author: <input id='author' name="author" type="text" value={author}
                        onChange={({ target }) => setAuthor(target.value)} />
                    </div>
                    <div> url: <input id='url' name="url" type="text" value={url}
                        onChange={({ target }) => setUrl(target.value)} />
                    </div>
                    <button id='buttonCreate' type="submit"> create new blog </button>
                </form>
                <button id='buttonHide' onClick={toggleVisibility}>cancel</button>
            </div>
        </div >
    )
}

export default BlogForm