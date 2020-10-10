import usersService from '../services/users'
import { setMessage } from './messageReducer'

const userListReducer = (state = [], action) => {
    switch (action.type) {
    case 'INIT_USERS':
        return action.data
    default:
        return state
    }
}

export const initializeUsers = () => {
    return async dispatch => {
        try {
            const returnedUsers = await usersService.getAll()
            dispatch ({
                type: 'INIT_USERS',
                data: returnedUsers
            })
        } catch (exception) {
            dispatch(setMessage({ message: 'Something went wrong', type: 'error' }))
        }
    }
}

export default userListReducer