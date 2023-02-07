import React, { useEffect } from "react";
import Words from './Words.js'
import './library.css';
import {textToSpeech} from '../../../ApiClient.js'
function Story({ currentBook }) {

  const story = currentBook.story
 

useEffect(()=>{
textToSpeech(story)
})

  function objectify(story) {
    if (story) {
      let arrayOne = story.split(" ");
      let objectArray = [];
      arrayOne.forEach((element) => {
        objectArray.push({ word: element });
      });
      return objectArray;
    }
  }
const storyArray = objectify(story)




  return (
  <div className="story-box">
    {currentBook.story && storyArray.map((word) =>  { return <Words word ={word} />})}

  </div>

  );
}

export default Story;
