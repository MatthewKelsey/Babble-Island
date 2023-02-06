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

  console.log(user)

  // useEffect(() => {
  //   setStars(user.stars)
  // }, [user.stars])

  
  const addOneStar = async (id) => {
    try {
      const star = await updateStars(id);
    } catch (error) {
      console.log(error);
    }
  };

  // LISTEN OUT FOR CHARACTER DIALOG

  const reactCharacterListener = ({ detail }) => {
    const character = detail.character.data.list.character;

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
  
  // LISTEN OUT FOR STARS COLLECTED

  const reactCollectStarsListener = ({ detail }) => {
    console.log(detail)
    const stars = detail.stars.data.list.stars;

    setStars(user.stars++)
    console.log('hello')
    addOneStar(user._id);

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
