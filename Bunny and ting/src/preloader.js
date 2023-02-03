import Phaser from "phaser";

export default class Preloader extends Phaser.Scene
{

    constructor()
    {
super('preloader')
    }
    preload(){
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
        this.load.image('background', '../assets/main-background.png')
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
        this.scene.start('Map')
    }
}
