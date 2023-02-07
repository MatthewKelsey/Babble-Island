// @ts-nocheck

import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
  constructor() {

    super('preloader');

  }


  preload() {

    // Load all audio files

    this.load.audio('mini_game_1_audio', '/assets/audio/mini_game1.mp3');
    this.load.audio('pears', '/assets/audio/peras.mp3');
    this.load.audio('apples', '/assets/audio/manzanas.mp3');
    this.load.audio('oranges', '/assets/audio/naranjas.mp3');
    this.load.audio('strawberries', '/assets/audio/fresas.mp3');
    this.load.audio('grapes', '/assets/audio/uvas.mp3');
    this.load.spritesheet('bunny', '/assets/mini_game1/bunnyFinal.png', {
      frameWidth: 16,
      frameHeight: 19,
    });

    // Load all image /assets

    // First id is what you want to call it, second is the file!

    // MAP


    this.load.image('water', 'assets/map/Water.png');
    this.load.image('grass', 'assets/map/Darker_Tall_Grass.png');
    this.load.image('trees', 'assets/map/Trees.png');
    this.load.image('objects', 'assets/map/Mushrooms.png');
    this.load.image('houses', 'assets/map/Wooden_House.png');
    this.load.image('doors', 'assets/map/door_animation.png');
    this.load.image('bridges', 'assets/map/WoodBridge.png');
    this.load.image('water', 'assets/map/Water_4.png');
    this.load.tilemapTiledJSON('map', 'assets/map/babble_island.json');
    this.load.scenePlugin('AnimatedTiles', 'https://raw.githubusercontent.com/nkholski/phaser-animated-tiles/master/dist/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');

    this.load.spritesheet('dude', 'assets/dude.png', {

      frameWidth: 32,
      frameHeight: 48,
    });

    //new character
    this.load.atlas('bunny_digging', 'assets/map/bunny_digging.png', 'assets/map/bunny_digging_atlas.json');
    this.load.animation('bunny_digging_anim', 'assets/map/bunny_digging_anim.json');

    // MINI GAME 1
    this.load.image('mini_game_1', '/assets/mini_game1/Wooden_House.png');
    this.load.image('pear', '/assets/mini_game1/pear.png');
    this.load.image('apple', '/assets/mini_game1/apple.png');
    this.load.image('orange', '/assets/mini_game1/orange.png');
    this.load.image('grape', '/assets/mini_game1/grapes.png');
    this.load.image('strawberry', '/assets/mini_game1/strawberry.png');
    this.load.image('doors', '/assets/mini_game1/door_animation.png');
    this.load.tilemapTiledJSON('tilemap', '/assets/mini_game1/house.json');

    this.load.spritesheet('doorsAnim', 'assets/mini_game1/doorsOpen.png', {
      frameWidth: 48,
      frameHeight: 16,
    });
     this.load.spritesheet('chest', 'assets/mini_game1/chestTest2.png', {
      frameWidth: 16,
      frameHeight: 32,
    });


    // MINI GAME 2

    this.load.spritesheet('bunny', '/assets//mini_game2/bunnyFinal.png', {
      frameWidth: 16,
      frameHeight: 19,
    });
    this.load.spritesheet('fruit', '/assets//mini_game2/fruit.png', {
      frameWidth: 16,
    });
    this.load.spritesheet('boxes', '/assets//mini_game2/boxes.png', {
      frameWidth: 16,
    });
    this.load.spritesheet('bomb', '/assets/mini_game2/bomb.png', { frameWidth: 16 });
  }


  create() {
    this.anims.create({
      key: 'idle',
      frames: [{ key: 'bunny', frame: 0 }],
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('bunny', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('bunny', { start: 8, end: 15 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('bunny', { start: 16, end: 23 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('bunny', { start: 24, end: 31 }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.start('Map');

  }
}
