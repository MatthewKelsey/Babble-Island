

// import Register from "./components/Register";
import {useEffect} from 'react'
import Phaser from 'phaser'
import Preloader from './components/scenes/preloader'
import Map from './components/scenes/Map'
import MiniGame1 from './components/scenes/MiniGame1'
import MiniGame2 from './components/scenes/MiniGame2'
import MessageBox from './components/ReactComponents/MessageBox'
function Game() {

useEffect(()=>{
  const config = {
    type: Phaser.AUTO,
    physics: {
      default: 'arcade',
      arcade: {
        debug:true,
        gravity: { y: 0},
      },
  
    },
    scene: [Preloader ,MiniGame1, MiniGame2,  Map],
    scale: {
      zoom: 1.5,
      parent: 'phaser-game',
      width: window.innerWidth,
      height: window.innerHeight,
    },
  }
  const game = new Phaser.Game(config)
console.log(game)
},[])
 
  return (

 <div>
    

   
    <MessageBox />
    </div>
  );
}

export default Game;