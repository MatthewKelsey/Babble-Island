import React from "react";

function Story(props) {
  function objectify(story) {
    let arrayOne = storyTing.split(" ");
    let objectArray = [];
    arrayOne.forEach((element) => {
      objectArray.push({ word: element });
    });
    return objectArray;
  }

  return <div></div>;
}

export default Story;
