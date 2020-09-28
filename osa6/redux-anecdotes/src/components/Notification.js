import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearMessage } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const message = useSelector(({ notification }) => notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const clear = () => {
    setTimeout(() => { dispatch(clearMessage()) }, 5000)
  }

  if (message) {
    return (
      <div style={style} >
        {message} {clear()}
      </div >)
  } else {
    return (null)
  }
}

export default Notification