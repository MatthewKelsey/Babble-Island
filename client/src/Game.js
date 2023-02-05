import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import Register from "./components/Register";
import { useEffect, useState } from 'react';
import phaserGame from './gameConfig';
import DialogueBox from './DialogueBox';
import { startDialogue, updateStars } from './components/ApiClient';
import Frame from './components/ReactComponents/Frame';


function Game({user, setUser, characterList}) {

  const [position, setPosition] = useState();
  const [dialogue, setDialogue] = useState({});
  const [message, setMessage] = useState();
  const [stars, setStars] = useState();

  console.log(characterList)

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
      console.log(stars)
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
    console.log('WORKING!!!');
    console.log(detail.character);
    const character = detail.character.data.list.character;
    console.log(detail.character)
    
    // switch(character) {
      //   case 'character1': setMessage
    // }
    if(character === 'character1') setMessage(characterList[0]);
    console.log(message)
    if (character === 'character2') setMessage(characterList[1])
    if (character === 'character3') setMessage(characterList[2])


    // setMessage(characterList[0].initial);
    setPosition(detail.reactCollision.x);
  };
  window.addEventListener('react', reactCharacterListener);

  // LISTEN OUT FOR STARS COLLECTED

  const reactCollectStarsListener = ({ detail }) => {
    const stars = detail.stars.data.list.stars;
    console.log(user.stars, 'before ')
    let userUpdate = user
    userUpdate.stars++ 
    console.log(userUpdate.stars,'after')
    setUser(userUpdate)
    addOneStar(user._id)
    // setStars(stars);
  };
  window.addEventListener('starCollected', reactCollectStarsListener);

  return (
    <>
      {/* <button onClick={handleClick}></button> */}
      {message && <DialogueBox message={message} setMessage={setMessage} />}
      
      {/* <DialogueBox message={message} setMessage={setMessage} /> */}
      <Frame user={user} setUser={setUser} stars={stars} setStars={setStars} />
    </>
  );
}

export default Game;
