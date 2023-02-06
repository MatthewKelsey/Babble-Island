import React from "react";
import Words from './Words.js'

function Story({book}) {

const story = "Hola, me llamo Marci"
  function objectify(story) {
    let arrayOne = story.split(" ");
    let objectArray = [];
    arrayOne.forEach((element) => {
      objectArray.push({ word: element });
    });
    return objectArray;
  }
const storyArray = objectify(story)
console.log(storyArray)



  return (
  <div className="story-box">
    {storyArray.map((word) =>  { return <Words word ={word} />})}

  </div>

  );
}

export default Story;
