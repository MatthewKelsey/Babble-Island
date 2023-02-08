
import Phaser from "phaser";
import { useEffect, useState } from "react";
import DialogueBox from "./components/ReactComponents/DialogueBox";
import Frame from "./components/ReactComponents/Frame";
import Preloader from "./components/scenes/preloader";
import MiniGame1 from "./components/scenes/MiniGame1";
import MiniGame1Content from "./components/ReactComponents/MiniGame1Content"
import MiniGame2 from "./components/scenes/MiniGame2";
import Map from "./components/scenes/Map";
import { useNavigate } from "react-router-dom";
import { refreshUser,updateStars  } from "./ApiClient";

function Game({ user, setUser, characterList }) {
  const [message, setMessage] = useState();
  const [stars, setStars] = useState();
  const [isCharacterActiveOrNot, setisCharacterActiveOrNot] = useState();
  const navigate = useNavigate();

  console.log(characterList)

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
  }, []);

  console.log(user)
  const addOneStar = async (id) => {
    try {
      const star = await updateStars(id);
      // setStars(user.stars++)
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
        case "sign1":
        setMessage(characterList[5]);
        break;
        case "sign2":
        setMessage(characterList[6]);
        break;
        case "sign3":
        setMessage(characterList[7]);
        break;
        case "sign4":
        setMessage(characterList[8]);
        break;
    }

   console.log(character)
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
useEffect(() => {
  const reactCollectStarsListener = () => {
    console.log('I AM IN THE LISTENER')
    setStars(user.stars++)
    addOneStar(user._id);
  };
  window.addEventListener("starCollected", reactCollectStarsListener);

}, [user.stars])

  const navigateToLibrary = () => {
    navigate("/library");
  };
  window.addEventListener("library", navigateToLibrary);

  const navigateToMiniGame1 = () => {
    navigate('/miniGame1')
  }
  window.addEventListener("miniGame1", navigateToMiniGame1);

  return (
    <>
      {message && <DialogueBox message={message} setMessage={setMessage} />}
      <div id="phaser-game"></div>
      <Frame user={user} setUser={setUser} stars={stars} setStars={setStars} />
    </>
  );
}

export default Game;
