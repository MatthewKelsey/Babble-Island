import React from 'react'


export default function DialogueBox({message , setMessage}) {
  function boxClose() {
    setMessage('')
  }

  console.log(message)
  return (
    <div className='message-box'>
<div className='close-message-box' onClick={boxClose}> X </div>
        <p>{message}</p>
      </div>

  )
}
