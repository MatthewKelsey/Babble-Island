
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

  
  
  const getCharacterDialogue = async (character) => {
    console.log(character)
    try {
      const talk = await startDialogue(character);
     
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
    console.log(character)

    getCharacterDialogue(character)

    setMessage('LETS FUCKING GO!!!!')
    setPosition(detail.reactCollision.x)
    
  
  }
  window.addEventListener('react', reactListener)

  useEffect(()=> {
  
  }, [])



  return (
    <>
    <div id="phaser-game"></div>
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
