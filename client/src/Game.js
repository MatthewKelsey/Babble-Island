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
    phaserGame
  }, []);

  const [message, setMessage] = useState()

  
  function handleClick() {
    const scene = phaserGame.scene.keys.Map
    scene.createEmitter()
    
  }

  const reactListener = ({detail}) => {
    console.log('WORKING!!!')
    setMessage('hello')
    console.log(detail.reactCollision)
  }
  window.addEventListener('react', reactListener)

  return (
    <>
      <div >
        <button onClick = {handleClick}></button>
        {message && <DialogueBox message = {message}/>}
        </div>;
    </>
  );
}

export default Game;
