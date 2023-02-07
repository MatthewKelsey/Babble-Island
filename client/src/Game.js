import { BrowserRouter, Routes, Route } from "react-router-dom";
import Phaser from "phaser";
// import Register from "./components/Register";
import { useEffect, useState } from "react";
import phaserGame from "./gameConfig";
import DialogueBox from "./DialogueBox";
import { startDialogue, updateStars } from "./components/ApiClient";
import Frame from "./components/ReactComponents/Frame";
import Preloader from "./components/scenes/preloader";
import MiniGame1 from "./components/scenes/MiniGame1";
import MiniGame2 from "./components/scenes/MiniGame2";
import Map from "./components/scenes/Map";
import { useNavigate } from "react-router-dom";
import { refreshUser } from "./ApiClient";
function Game({ user, setUser, characterList }) {
  const [message, setMessage] = useState();
  const [stars, setStars] = useState();
  const [isCharacterActiveOrNot, setisCharacterActiveOrNot] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("in the useEffect");
    new Phaser.Game({
      type: Phaser.AUTO,
      physics: {
        default: "arcade",
        arcade: {
          debug: true,
          gravity: { y: 0 },
        },
      },
      scene: [Preloader, MiniGame1, MiniGame2, Map],
      scale: {
        zoom: 1.5,
        parent: "phaser-game",
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });

   refreshUser().then((data) => {
      if (data) {
        setUser(data);
      }
    });
    ;
    // new Phaser.Game(config)
  }, []);
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

    switch (character) {
      case "character1":
        setMessage(characterList[0]);
        break;
      case "character2":
        setMessage(characterList[1]);
        break;
      case "character3":
        setMessage(characterList[2]);
        break;
    }

    // if (character === 'character1' ) {
    //   setMessage(characterList[0]);
    // } if (character === 'character2' ) {
    //   setMessage(characterList[1]);
    // } if (character === 'character3' ) {
    //   setMessage(characterList[2]);
    // }
  };
  window.addEventListener("react", reactCharacterListener);

  useEffect(() => {
    const isCharacterActiveListener = ({ detail }) => {
      if (!detail.characterActiveOrNot) setMessage("");
      setisCharacterActiveOrNot(detail.characterActiveOrNot);
    };
    window.addEventListener("isActiveOrNot", isCharacterActiveListener);
  }, [isCharacterActiveOrNot]);

  // LISTEN OUT FOR STARS COLLECTED

  const reactCollectStarsListener = () => {
    setStars(user.stars++);
    addOneStar(user._id);
  };
  window.addEventListener("starCollected", reactCollectStarsListener);

  const navigateToLibrary = () => {
    navigate("/library");
  };
  window.addEventListener("library", navigateToLibrary);

  return (
    <>
      {message && <DialogueBox message={message} setMessage={setMessage} />}
      <div id="phaser-game"></div>
      <Frame user={user} setUser={setUser} stars={stars} setStars={setStars} />
    </>
  );
}

export default Game;
