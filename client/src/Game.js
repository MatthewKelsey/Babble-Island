import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import Register from "./components/Register";
import { useEffect, useState } from 'react';
import phaserGame from './gameConfig';
import DialogueBox from './DialogueBox';
import { startDialogue, updateStars } from './components/ApiClient';
import Frame from './components/ReactComponents/Frame';

function Game({ user, setUser, characterList }) {
  const [position, setPosition] = useState();
  const [dialogue, setDialogue] = useState();
  const [message, setMessage] = useState();
  const [stars, setStars] = useState();
  const [isCharacterActiveOrNot, setisCharacterActiveOrNot] = useState();

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
      console.log(stars);
    } catch (error) {
      console.log(error);
    }
  };

  // function handleClick() {
  //   const scene = phaserGame.scene.keys.Map;
  //   scene.createEmitter();
  // }

  // LISTEN OUT FOR CHARACTER DIALOG

  const reactCharacterListener = ({ detail }) => {
    const character = detail.character.data.list.character;
    const isActive = detail.character.active;

    if (character === 'character1' ) {
      setMessage(characterList[0]);
    } if (character === 'character2' ) {
      setMessage(characterList[1]);
    } if (character === 'character3' ) {
      setMessage(characterList[2]);
    } 
  };
  window.addEventListener('react', reactCharacterListener);

  useEffect(() => {
    const isCharacterActiveListener = ({ detail }) => {
      if (!detail.characterActiveOrNot) setMessage('');
      setisCharacterActiveOrNot(detail.characterActiveOrNot);
    };
    window.addEventListener('isActiveOrNot', isCharacterActiveListener);
  }, [isCharacterActiveOrNot]);

  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (event.key === ' ') {
  //       console.log('I AM THE ACTIVATED CHARACTER INDICATOR', isCharacterActiveOrNot);
  //     }
  //   };
  //   document.addEventListener('keydown', handleKeyDown);
  // }, []);

  // LISTEN OUT FOR STARS COLLECTED

  const reactCollectStarsListener = ({ detail }) => {
    const stars = detail.stars.data.list.stars;
    console.log(user.stars, 'before ');
    let userUpdate = user;
    userUpdate.stars++;
    console.log(userUpdate.stars, 'after');
    setUser(userUpdate);
    addOneStar(user._id);
    // setStars(stars);
  };
  window.addEventListener('starCollected', reactCollectStarsListener);

  return (
    <>
      {message && (
        <DialogueBox
          message={message}
          setMessage={setMessage}
        />
      )}

      <Frame user={user} setUser={setUser} stars={stars} setStars={setStars} />
    </>
  );
}

export default Game;
