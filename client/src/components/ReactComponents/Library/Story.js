import React from 'react';
import Words from './Words.js';
import './library.css';
import { useState, useEffect } from 'react';

function Story({ currentBook, soundUrl}) {
  const [text, setText] = useState('');
  const [currentText, setCurrentText] = useState('');
  const [index, setIndex] = useState(0);
  const story = currentBook.story;

  useEffect(() => {
    setIndex(0);
    setText(story);
    console.log(currentText);
  }, [story]);

  const storyArray = objectify(currentText);
  function objectify(story) {
    if (story) {
      let arrayOne = story.split(' ');
      let objectArray = [];
      arrayOne.forEach((element) => {
        objectArray.push({ word: element });
      });
      return objectArray;
    }
  }

  useEffect(() => {
    setIndex(0);
    setCurrentText('');
    console.log(text);
  }, [text]);


  useEffect(() => {
    if (story && index < text.length) {
      setTimeout(() => {
        setCurrentText(currentText + text[index]);
        setIndex(index + 1);
      }, 50);
    }
  }, [index, text, currentText]);

  return (
    <>
      <div className='story-box'>
        {currentText &&
          storyArray.map((word) => {
            return <Words word={word} />;
          })}
      </div>
      <div className='right'>
        <img className='cover-book' src={currentBook.cover} />
      {soundUrl && (
        <audio
        autoPlay
          controls
          name="media"
          src={`http://localhost:4000/${soundUrl}`}
          type="audio/mpeg"
        ></audio>
      )}
      </div>
    </>
  );
}

export default Story;
