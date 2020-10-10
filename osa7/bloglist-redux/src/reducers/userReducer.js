import blogService from '../services/blogs'
import loginService from '../services/login'

import { setMessage } from './messageReducer'

const userReducer = (state = null, action) => {
    switch (action.type) {
    case 'LOGIN': {
        const user = action.data
        return user
    }
    case 'LOGOUT':
        return null
    case 'SET_USER': {
        const user = action.data
        return user
    }
    default:
        return state
    }
}

export const login = (username, password) => {
    return async dispatch => {
        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            blogService.setToken(user.token)
            dispatch({
                type: 'LOGIN',
                data: user
            })
        } catch (exception) {
            dispatch(setMessage({ message: 'wrong username or password', type: 'error' }))
        }
    }
}

export const logout = () => {
    return async dispatch => {
        try {
            dispatch({
                type: 'LOGOUT'
            })
            window.localStorage.removeItem('loggedUser')
        } catch (exception) {
            dispatch(setMessage({ message: 'something went wrong', type: 'error' }))
        }
    }
}

export const setUser = (user) => {
    return async dispatch => {
        try {
            blogService.setToken(user.token)
            dispatch({
                type: 'SET_USER',
                data: user
            })
        } catch (exception) {
            dispatch(setMessage({ message: 'something went wrong', type: 'error' }))
        }
    }
}

export default userReducer