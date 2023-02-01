// @ts-nocheck


import Phaser from "phaser";

export default class Preloader extends Phaser.Scene
{

    constructor()
    {
super('preloader')
    }
    preload(){
        this.load.audio('mini_game_1_audio', 'assets/audio/mini_game1.mp3');
    this.load.audio('pears', 'assets/audio/peras.mp3');
    this.load.audio('apples', 'assets/audio/manzanas.mp3');
    this.load.audio('oranges', 'assets/audio/naranjas.mp3');
    this.load.audio('strawberries', 'assets/audio/fresas.mp3');
    this.load.audio('grapes', 'assets/audio/uvas.mp3');
    this.load.spritesheet('bunny', '../assets/mini_game1/bunnyFinal.png', {
      frameWidth: 16,
      frameHeight: 19,
    });
  
    // load all image assets
  
    // first id is what you want to call it, second is the file
    this.load.image('mini_game_1', 'assets/mini_game1/Wooden House.png');
    this.load.image('pear', 'assets/mini_game1/pear.png');
    this.load.image('apple', 'assets/mini_game1/apple.png');
    this.load.image('orange', 'assets/mini_game1/orange.png');
    this.load.image('grape', 'assets/mini_game1/grapes.png');
    this.load.image('strawberry', 'assets/mini_game1/strawberry.png');
    this.load.image('doors', 'assets/mini_game1/door animation sprites.png');
    this.load.tilemapTiledJSON('tilemap', 'assets/mini_game1/house.json');





        this.load.spritesheet('bunny', '../assets/bunnyFinal.png',{
            frameWidth:16, frameHeight:19
        })
        this.load.spritesheet('fruit' , '../assets/fruit.png',{
            frameWidth :16
        })
        this.load.spritesheet('boxes', '../assets/boxes.png',{
            frameWidth:16
        })
        this.load.spritesheet('bomb', '../assets/bomb.png', {frameWidth:16})
    }
    create(){
        this.anims.create({
            key:'idle',
            frames:[{key: 'bunny', frame:0}]
        })
        this.anims.create({
            key:'down',
            frames: this.anims.generateFrameNumbers('bunny',{start: 0, end : 7} ),
            frameRate: 10,
            repeat : -1
        })
        this.anims.create({
            key:'up',
            frames: this.anims.generateFrameNumbers('bunny',{start: 8, end : 15} ),
            frameRate: 10,
            repeat : -1
        })
        this.anims.create({
            key:'right',
            frames: this.anims.generateFrameNumbers('bunny',{start: 16, end : 23} ),
            frameRate: 10,
            repeat : -1
        })
         this.anims.create({
            key:'left',
            frames: this.anims.generateFrameNumbers('bunny',{start: 24, end : 31} ),
            frameRate: 10,
            repeat : -1
        })
        this.scene.start('scene2')
    }
}
