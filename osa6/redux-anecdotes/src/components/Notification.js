import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(({ notification }) => notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (message) {
    return (
      <div style={style} >
        {message}
      </div >)
  } else {
    return (null)
  }
}

export default Notification