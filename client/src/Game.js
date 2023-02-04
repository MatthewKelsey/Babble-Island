

// import Register from "./components/Register";
import { useEffect, useState } from 'react';

import phaserGame from './gameConfig'

import DialogueBox from './DialogueBox';



function Game() {


  useEffect(() => {
    // phaserGame
  }, []);

  const [message, setMessage] = useState()
  const [position, setPosition] = useState()

  
  function handleClick() {
    const scene = phaserGame.scene.keys.Map
    scene.createEmitter()
    
  }

  const reactListener = ({detail}) => {
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
      
    </>
  );
}

export default Game;
