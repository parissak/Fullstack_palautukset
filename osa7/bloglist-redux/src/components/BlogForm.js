import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import styled from 'styled-components'

const Button = styled.button`
background: cornflowerBlue;
color: white;
padding: 0.25em 1em;
border: 2px solid cornflowerBlue;
border-radius: 3px;
margin: 2px;
`
const Input = styled.input`
margin: 0.25em
`
const BlogForm = () => {
    const dispatch = useDispatch()

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

    const handleBlog = (event) => {
        event.preventDefault()

        const blogObject = {
            title: title,
            author: author,
            url: url
        }
        dispatch(addBlog(blogObject))
        setEmptyValues()
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button id='buttonShow' onClick={toggleVisibility}>create new</Button>
            </div>
            <div style={showWhenVisible}>
                <form onSubmit={handleBlog}>
                    <h2>create new</h2>
                    <div> title: <Input id='title' name="title" type="text" value={title}
                        onChange={({ target }) => setTitle(target.value)} />
                    </div>
                    <div> author: <Input id='author' name="author" type="text" value={author}
                        onChange={({ target }) => setAuthor(target.value)} />
                    </div>
                    <div> url: <Input id='url' name="url" type="text" value={url}
                        onChange={({ target }) => setUrl(target.value)} />
                    </div>
                    <Button id='buttonCreate' type="submit"> create new blog </Button>
                </form>
                <Button id='buttonHide' onClick={toggleVisibility}>cancel</Button>
            </div>
        </div >
    )
}

export default BlogForm