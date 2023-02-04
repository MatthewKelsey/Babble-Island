
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Register from "./components/Register";
import { useEffect, useState } from 'react';

import phaserGame from './gameConfig'
import DialogueBox from './DialogueBox';

import { startDialogue } from './components/ApiClient';


function Game() {


  useEffect(() => {
    // phaserGame
  }, []);
  
  const [message, setMessage] = useState()
  const [position, setPosition] = useState()
  const [dialogue, setDialogue] = useState({})
  
  console.log(dialogue.initial)

  
  
  const getCharacterDialogue = async (character) => {
    console.log(character)
    try {
      const dialogue = await startDialogue(character);
      setDialogue(dialogue)
    } catch (e) {
      console.log(e);
    }
  };
  
  function handleClick() {
    const scene = phaserGame.scene.keys.Map
    scene.createEmitter()
    
  }
  
  const reactListener = ({detail}) => { 
    console.log('WORKING!!!')
    console.log(detail.character)
    const character = detail.character.data.list.character
    
    getCharacterDialogue(character)
    console.log(character)
    setMessage(dialogue.initial)
    setPosition(detail.reactCollision.x)

  }
  window.addEventListener('react', reactListener)

  useEffect(()=> {
    console.log(position)
  }, [])



  return (
    <>
    
        <button onClick = {handleClick}></button>
        {message && <DialogueBox message = {message} setMessage={setMessage}/>}
        {/* <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={handleInput} />
        <button type="submit">Submit</button>
      </form> */}
      {/* <p>{response}</p> */}
    </>
  );
}

export default Game;
