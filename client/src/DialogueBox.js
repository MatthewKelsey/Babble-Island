import React from 'react'


export default function DialogueBox({message , setMessage}) {
  function boxClose() {
    setMessage('')
  }
  return (
    <div className='message-box'>
<div onClick={boxClose}> X </div>

      <p>{message}</p>
    </div>
  )
}
