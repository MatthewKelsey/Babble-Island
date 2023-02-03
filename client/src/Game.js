import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Register from "./components/Register";
import { useEffect, useState } from 'react';
import Phaser from 'phaser';
import phaserGame from './gameConfig'
import Preloader from './components/scenes/preloader';
import Map from './components/scenes/Map';
import MiniGame1 from './components/scenes/MiniGame1';
import MiniGame2 from './components/scenes/MiniGame2';
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
    console.log('WORKING!!!')
    setMessage('LETS FUCKING GO!!!!')
    setPosition(detail.reactCollision.x)
    console.log(detail.reactCollision.x)
    console.log(detail)
    // console.log(detail.reactCollision)
  }
  window.addEventListener('react', reactListener)

  useEffect(()=> {
    console.log(position)
  }, [])



  return (
    <>
    
        <button onClick = {handleClick}></button>
        {message && <DialogueBox message = {message} setMessage={setMessage}/>}
      
    </>
  );
}

export default Game;
