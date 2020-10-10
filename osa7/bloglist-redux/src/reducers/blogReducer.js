import blogService from '../services/blogs'
import { setMessage } from './messageReducer'

const blogReducer = (state = [], action) => {
    switch (action.type) {
    case 'INIT_BLOGS': {
        return action.data
    }
    case 'ADD_BLOG': {
        return [...state, action.data]
    }
    case 'LIKE_BLOG': {
        const votedBlog = action.data
        return state.map(b => b.id === votedBlog.id ? votedBlog : b)
    }
    case 'COMMENT_BLOG': {
        const commentedBlog = action.data
        return state.map(b => b.id === commentedBlog.id ? commentedBlog : b)
    }
    case 'REMOVE_BLOG': {
        const removedBlog = action.data
        return state.filter(b => b !== removedBlog)
    }
    default:
        return state
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        try {
            const returnedBlogs = await blogService.getAll()
            dispatch ({
                type: 'INIT_BLOGS',
                data: returnedBlogs
            })
        } catch (exception) {
            dispatch(setMessage({ message: 'Something went wrong', type: 'error' }))
        }
    }
}

export const addBlog = (blog) => {
    return async dispatch => {
        try {
            const returnedBlog = await blogService.post(blog)
            dispatch ({
                type: 'ADD_BLOG',
                data: returnedBlog
            })
        } catch (exception) {
            dispatch(setMessage({ message: 'required information missing', type: 'error' }))
        }
    }
}

export const removeBlog = (blog) => {
    return async dispatch => {
        try {
            await blogService.remove(blog.id)
            dispatch ({
                type: 'REMOVE_BLOG',
                data: blog
            })
        } catch (exception) {
            if (exception.message.includes('403')) {
                dispatch(setMessage({ message: 'You are not authorized to remove this blog', type: 'error' }))
            } else {
                dispatch(setMessage({ message: 'something went wrong when removing blog',  type: 'error' }))
            }
        }
    }
}

export const voteBlog = (blog) => {
    return async dispatch => {
        try {
            const votedBlog = { ...blog, likes: blog.likes + 1 }
            await blogService.put(votedBlog)
            dispatch ({
                type: 'LIKE_BLOG',
                data: votedBlog
            })
        } catch (exception) {
            dispatch(setMessage({ message: 'something went wrong when removing blog',  type: 'error' }))
        }
    }
}

export const commentBlog = (blog, comment) => {
    return async dispatch => {
        try {
            const commentedBlog = await blogService.comment(blog.id, comment)
            dispatch ({
                type: 'COMMENT_BLOG',
                data: commentedBlog
            })
        } catch (exception) {
            console.log(exception)
            dispatch(setMessage({ message: 'something went wrong when commenting blog',  type: 'error' }))
        }
    }
}

export default blogReducer