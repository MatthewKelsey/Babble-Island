import React from "react";
import Words from './Words.js'
import './library.css';

function Story({ currentBook }) {

  const story = currentBook.story
  console.log(currentBook)

// const story = "Hola, me llamo Marci"
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
console.log(storyArray)



  return (
  <div className="story-box">
    {currentBook.story && storyArray.map((word) =>  { return <Words word ={word} />})}

  </div>

  );
}

export default Story;
