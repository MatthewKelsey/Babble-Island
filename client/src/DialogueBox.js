import React from 'react'


export default function DialogueBox({message , setMessage}) {
  function boxClose() {
    setMessage('')
  }

  console.log(message)
  return (
    <div className='message-box'>
<div onClick={boxClose}> X </div>

      {/* <p>{message}</p> */}
      <img></img>
        <p>{message}</p>
      </div>

  )
}
