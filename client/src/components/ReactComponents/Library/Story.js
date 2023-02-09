import React from 'react';
import Words from './Words.js';
import './library.css';
import { useState, useEffect } from 'react';
import ChatGPT from './ChatGPT.js';

function Story({currentBook, chatGptResponse, user, setUser}) {
  const [text, setText] = useState('');
  const [currentText, setCurrentText] = useState('');
  const [index, setIndex] = useState(0);
  const story = currentBook.story;

  console.log(user.stars)

  useEffect(()=> {
    setUser(user)
  }, [])
  
  if(chatGptResponse) {
    console.log(chatGptResponse)
  }

  useEffect(() => {
    setIndex(0);
    if(user.stars) {
      setText(chatGptResponse);
    } else {
      setText(story)
    }

    console.log(currentText);
  }, [story, chatGptResponse]);

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
    if ((chatGptResponse || story ) && index < text.length) {
      setTimeout(() => {
        setCurrentText(currentText + text[index]);
        setIndex(index + 1);
      }, 50);
    }
  }, [index, text, currentText]);

  return (
    <div className='current'>
      <div className='story-box'>
        {currentText &&
          storyArray.map((word, index) => {
            return <Words word={word} key={index}/>;
          })}
      </div>
      <img className='cover-book' src={currentBook.cover} />
    </div>
  );
}

export default Story;
