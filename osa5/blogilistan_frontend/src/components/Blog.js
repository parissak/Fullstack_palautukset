import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlogLike, removeBlog, userId }) => {
    const [visible, setVisible] = useState(false)
    const showWhenVisible = { display: visible ? '' : 'none' }
    const hideWhenVisible = { display: visible ? 'none' : '' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const incrementLike = () => {
        updateBlogLike(blog)
    }

    const remove = () => {
        removeBlog(blog)
    }

    const blogStyle = {
        border: 'solid',
        borderWidth: 'thin',
        padding: 4,
        margin: 4,
    }

    const buttonMargin = {
        margin: 4
    }

    return (
        <div style={blogStyle}>
            <div className='visible'>
                {blog.title} by {blog.author}
                <button style={buttonMargin} onClick={toggleVisibility}>
                    <span style={showWhenVisible}> hide </span>
                    <span style={hideWhenVisible}> show </span>
                </button>
            </div>

            <div style={showWhenVisible} className='nonVisible'>
                <div>
                    {blog.url}
                </div>
                <div>
                    likes: {blog.likes}
                    <button style={buttonMargin} onClick={incrementLike}> like </button>
                </div>
                <div>
                    added by: {blog.user.username}
                </div>
                {userId === blog.user.id && <button onClick={remove}> remove </button>}
            </div>
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