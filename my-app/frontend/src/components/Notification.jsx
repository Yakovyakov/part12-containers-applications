const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  const style = {
    margin: '10px',
    padding: '10px',
    border: '2px solid',
    borderColor: message.type === 'notification' ? 'green' : 'red',
    borderRadius: '5px',
  }

  return (
    <div style={ style } >
      { message.txt }
    </div>
  )
}

export default Notification
