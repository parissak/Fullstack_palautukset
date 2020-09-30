import React from 'react'
import { connect } from 'react-redux'


const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (props.message) {
    return (
      <div style={style} >
        {props.message}
      </div >)
  } else {
    return (null)
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification