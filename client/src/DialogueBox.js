import React, { useState, useEffect } from 'react';

export default function DialogueBox({message, setMessage }) {

  console.log(message)

  function boxClose() {
    console.log('hello, boxClose called')
    setMessage('');
  }
  
  const [text, setText] = useState(message.initial);
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);
  console.log(text)


  useEffect(() => {
    setIndex(0);
    setCurrentText("");
  }, [text]);

  useEffect(() => {
    if (index < text.length) {
      setTimeout(() => {
        setCurrentText(currentText + text[index]);
        setIndex(index + 1);
      }, 50);
    }
    // if(!activeCharacter) setCurrentText(currentText)
  }, [index, text, currentText]);


  return <div className='message-box'>
    <div className='close-message-box' onClick={boxClose}>
      {' '}
      X{' '}
    </div>

    <h4>{currentText}</h4>
    <div className='multiple-choice'>
      <div className='option-1' onClick={()=>setText(message.good[0])}>
        <p> {message.responseGood}</p>
      </div>
      <div className='option-2' onClick={() =>setText(message.bad[0])}>
        <p> {message.responseBad}</p>
      </div>
    </div>
  </div>
}
