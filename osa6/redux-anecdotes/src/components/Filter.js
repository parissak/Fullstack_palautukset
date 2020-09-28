import React from 'react'
import { useDispatch } from 'react-redux'
import { addFilter } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const style = {
        marginBottom: 10
    }

    const handleChange = (event) => {
        dispatch(addFilter(event.target.value))
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter