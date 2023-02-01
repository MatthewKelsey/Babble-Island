// @ts-nocheck


import Phaser from 'phaser'
import Preloader from './preloader';
import Game from './MiniGame2'
import  Scene  from './Scene';
import MiniGame1 from './MiniGame1';
import MiniGame2 from './MiniGame2';

const config = {
	type: Phaser.AUTO,
	physics: {
		default: 'arcade',
		arcade: {
			debug:false,
			gravity: { y: 0},
		},
		
	},
	scene: [Preloader, MiniGame1, MiniGame2, Scene],
	scale: {
    zoom: 1.5,
    parent: 'app',
    width: window.innerWidth,
    height: window.innerHeight,
  },
}

export default new Phaser.Game(config)
