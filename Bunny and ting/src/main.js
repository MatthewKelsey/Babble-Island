import Phaser from 'phaser'
import Preloader from './preloader';
import Game from './game'
import  Scene  from './Scene';
import OpeningScreen from './OpeningScreen';

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			debug:true,
			gravity: { y: 0},
		},
	},
	scene: [Preloader,OpeningScreen, Game, Scene ],
}

export default new Phaser.Game(config)
