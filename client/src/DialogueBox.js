import React, { useState, useEffect } from 'react';

export default function DialogueBox({ message, setMessage }) {

  function boxClose() {
    console.log('hello, boxClose called');
    setMessage('');
  }

  const [text, setText] = useState(message.initial);
  const [currentText, setCurrentText] = useState('');
  const [index, setIndex] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setIndex(0);
    setCurrentText('');
  }, [text]);

  useEffect(() => {
    if (index < text.length) {
      setTimeout(() => {
        setCurrentText(currentText + text[index]);
        setIndex(index + 1);
      }, 40);
    }
  }, [index, text, currentText]);

  const handleClickGood = () => {
    setText(message.good[0]);
    setIsClicked(!isClicked);
  };
  const handleClickBad = () => {
    setText(message.bad[0]);
    setIsClicked(!isClicked);
  };

 

  return (
    <div className='message-box'>
      <div className='close-message-box' onClick={boxClose}>
        {' '}
        X{' '}
      </div>

      <h4>{currentText}</h4>

      {!isClicked ? (
        <div className='multiple-choice'>
          <div className='option-1' onClick={handleClickGood}>
            <p> {message.responseGood}</p>
          </div>
          <div className='option-2' onClick={handleClickBad}>
            <p> {message.responseBad}</p>
          </div>
        </div>
      ) : (
       ''
      )}
    </div>
  );
}
