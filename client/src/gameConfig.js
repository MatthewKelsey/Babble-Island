import Phaser from "phaser";
import Preloader from "./components/scenes/preloader";
import MiniGame1 from "./components/scenes/MiniGame1";
import MiniGame2 from "./components/scenes/MiniGame2";
import Map from "./components/scenes/Map";

const config = {
  type: Phaser.AUTO,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 0 },
    },
  },
  scene: [Preloader, MiniGame1, MiniGame2, Map],
  scale: {
    zoom: 1.5,
    parent: 'phaser-game',
    width: window.innerWidth,
    height: window.innerHeight,
  },
};

export default new Phaser.Game(config)
