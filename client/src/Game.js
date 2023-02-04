import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import Register from "./components/Register";
import { useEffect, useState } from 'react';

import phaserGame from './gameConfig';
import DialogueBox from './DialogueBox';

import { startDialogue } from './components/ApiClient';

function Game() {
  useEffect(() => {
    // phaserGame
  }, []);

  const [position, setPosition] = useState();
  const [dialogue, setDialogue] = useState({});
  const [message, setMessage] = useState();
  
  console.log(dialogue.initial);

  const getCharacterDialogue = async (character) => {
    console.log(character);
    try {
      const dialogue = await startDialogue(character);
      setDialogue(dialogue);
    } catch (e) {
      console.log(e);
    }
  };

  function handleClick() {
    const scene = phaserGame.scene.keys.Map;
    scene.createEmitter();
  }


  const reactListener = ({ detail }) => {
    console.log('WORKING!!!');
    console.log(detail.character);
    const character = detail.character.data.list.character;

    getCharacterDialogue(character);

    setMessage(dialogue.initial);
    console.log(detail.reactCollision.x)
    setPosition(detail.reactCollision.x);
  };
  window.addEventListener('react', reactListener);

  useEffect(() => {
    console.log(position);
  }, []);

  return (
    <>

      {/* <button onClick={handleClick}></button> */}
      {message && <DialogueBox message={message} setMessage={setMessage} />}

    </>
  );
}

export default Game;