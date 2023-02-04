import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import Register from "./components/Register";
import { useEffect, useState } from 'react';

import phaserGame from './gameConfig';
import DialogueBox from './DialogueBox';

import { startDialogue, updateStars } from './components/ApiClient';

function Game({user}) {
  useEffect(() => {
    // phaserGame
  }, []);

  const [position, setPosition] = useState();
  const [dialogue, setDialogue] = useState({});
  const [message, setMessage] = useState();
  const [stars, setStars] = useState();

  const getCharacterDialogue = async (character) => {
    console.log(character);
    try {
      const dialogue = await startDialogue(character);
      setDialogue(dialogue);
    } catch (e) {
      console.log(e);
    }
  };

  const addOneStar = async (id) => {
    try {
      const star = await updateStars(id);
      setStars(star);
    } catch (error) {
      console.log(error);
    }
  };

  function handleClick() {
    const scene = phaserGame.scene.keys.Map;
    scene.createEmitter();
  }

  // LISTEN OUT FOR CHARACTER DIALOG

  const reactCharacterListener = ({ detail }) => {
    console.log('WORKING!!!');
    console.log(detail.character);
    const character = detail.character.data.list.character;

    getCharacterDialogue(character);

    setMessage(dialogue.initial);
    console.log(detail.reactCollision.x);
    setPosition(detail.reactCollision.x);
  };
  window.addEventListener('react', reactCharacterListener);

  // LISTEN OUT FOR STARS COLLECTED

  const reactCollectStarsListener = ({ detail }) => {
    const stars = detail.stars.data.list.stars;
    console.log(user._id)
    addOneStar(user._id)
    // setStars(stars);
  };
  window.addEventListener('starCollected', reactCollectStarsListener);

  console.log(stars);

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
