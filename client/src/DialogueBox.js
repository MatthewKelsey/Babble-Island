import React, { useState, useEffect } from 'react';

export default function DialogueBox({ message, setMessage }) {


  function boxClose() {
    setMessage('');
  }
  

  // const [currentText, setCurrentText] = useState('');
  //   console.log(text)
  
  
  //   const renderText = (text, i = 0) => {
    //     setTimeout(() => {
      //       setCurrentText(text.slice(0, i + 1));
  //       if (i < text.length) renderText(text, i + 1);
  //     }, 50);
  //   };
  
  //   useEffect(() => {
  //     renderText(text);
  //   }, [text]);
  const [text, setText] = useState(message.initial);
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
    setCurrentText("");
  }, [text]);

  console.log(text)

  useEffect(() => {
    if (index < text.length) {
      setTimeout(() => {
        setCurrentText(currentText + text[index]);
        setIndex(index + 1);
      }, 50);
    }
  }, [index, text, currentText]);

  return (
    <div className='message-box'>
      <div className='close-message-box' onClick={boxClose}>
        {' '}
        X{' '}
      </div>

      <h4>{currentText}</h4>
      <div className='multiple-choice'>
        <div className='option-1' onClick={()=>setText(message.good[0])}>
          <p> Muy Bien</p>
        </div>
        <div className='option-2' onClick={() =>setText(message.bad[0])}>
          <p> Muy Mal</p>
        </div>
      </div>
    </div>
  );
}
