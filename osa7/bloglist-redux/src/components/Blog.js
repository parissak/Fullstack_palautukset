import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { voteBlog, removeBlog, commentBlog } from '../reducers/blogReducer'
import styled from 'styled-components'

const Button = styled.button`
background: cornflowerBlue;
color: white;
padding: 0.25em;
border: 2px solid cornflowerBlue;
border-radius: 3px;
margin: 2px;
`
const Input = styled.input`
margin: 0.25em
`

const Blog = () => {
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()
    const user = useSelector(({ user }) => user)
    const blogs = useSelector(({ blogs }) => blogs)
    const history = useHistory()

    const id = useParams().id
    const blog = blogs.find(b => b.id === id)

    const incrementLike = () => {
        dispatch(voteBlog(blog))
    }

    const remove = () => {
        const confirm = window.confirm(`remove ${blog.title} by ${blog.author}?`)
        if (confirm) {
            dispatch(removeBlog(blog))
        }
        history.push('/blogs')
    }

    const handleComment = (event) => {
        event.preventDefault()
        const commentObject = { content: comment }
        dispatch(commentBlog(blog, commentObject))
        setComment('')
    }

    if (!blog) {
        return (
            <div>
                <p>Loading...</p>
            </div>)
    }

    return (
        <div className='blog'>
            <h2> {blog.title} by {blog.author} </h2>
            <div>
                link: {blog.url}
            </div>
            <div>
                likes: {blog.likes}
                <Button id='likeBlogButton'  onClick={incrementLike}> like </Button>
            </div>
            <div>
                added by: {blog.user.username}
            </div>
            {user &&
                user.id === blog.user.id && <Button id='removeBlogButton' onClick={remove}> remove </Button>
            }

            <h3>comments</h3>
            <form onSubmit={handleComment}>
                <Input type="text" value={comment}
                    onChange={({ target }) => setComment(target.value)} />
                <Button type="submit"> add comment </Button>
            </form>

            {blog.comments.length > 0 &&
                <ul>
                    {blog.comments.map(comment =>
                        <li key={blog.id}>
                            {comment}
                        </li>
                    )}
                </ul>}
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    updateBlogLike: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired
}

export default Blog