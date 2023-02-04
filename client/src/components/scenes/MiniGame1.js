// @ts-nocheck

import { getConfig } from '@testing-library/react';
import Phaser from 'phaser';

class MiniGame1 extends Phaser.Scene {
  constructor() {
    super({
      key: 'MiniGame1',
    });
  }

  init() {
    this.game.scale.setZoom(1.2);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  

  create() {
    // create music config and load audio files
    this.music = this.sound.add('mini_game_1_audio');
    this.pear = this.sound.add('pears');
    this.orange = this.sound.add('oranges');
    this.apple = this.sound.add('apples');
    this.grape = this.sound.add('grapes');
    this.strawberry = this.sound.add('strawberries');

    const musicConfig = {
      mute: false,
      volume: 0.6,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    };

    this.music.play(musicConfig);

    // use key to refer to tilemap

    const map = this.make.tilemap({ key: 'tilemap' });

    // first id is the name on the JSON, second id refers the id used for the image

    const tileset = map.addTilesetImage('Wooden_House', 'mini_game_1');
    const tileset2 = map.addTilesetImage('doors', 'doors');

    // create layers ie ground or walls
    const ground = map.createLayer('ground', tileset);
    const walls = map.createLayer('walls', tileset);
    // const doors = map.createLayer('doors', tileset2);
    const fruitsLayer = map.getObjectLayer('all_fruits')['objects'];

    // set collisions
    walls.setCollisionByProperty({ collides: true });

    // create doors Sprite 

    this.doorSprite = this.physics.add.sprite(440,472, 'doorsAnim').setFrame(4)
    this.doorSprite.body.immovable = true;

    // create fruits on map according to name and position

    const fruits = this.physics.add.staticGroup();

    fruitsLayer.forEach((fruit) => {
      switch (fruit.name) {
        case 'oranges':
          fruits.create(fruit.x, fruit.y, 'orange');
          break;
        case 'apples':
          fruits.create(fruit.x, fruit.y, 'apple');
          break;
        case 'pears':
          fruits.create(fruit.x, fruit.y, 'pear');
          break;
        case 'strawberry':
          fruits.create(fruit.x, fruit.y, 'strawberry');
          break;
        case 'grapes':
          fruits.create(fruit.x, fruit.y, 'grape');
      }
    });

    console.log(this.chest);

    // add main character

    this.player = this.physics.add.sprite(30, 30, 'bunny');
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, walls);
    this.physics.add.collider(this.player, this.doorSprite, ()=>{
      this.music.stop(musicConfig)
      this.scene.start('Map', this.player)
    })
    
    this.physics.add.overlap(this.player, fruits, collectFruits, null, this);

    // SETTINGS

    // text content and score counters
    this.settings = this.physics.add.image(700, 300, 'settings');

    let content = [
      'Frutas:',
      '',
      'manzanas:',
      '',
      'peras:',
      '',
      'naranjas:',
      '',
      'uvas:',
      '',
      'fresas:',
    ];

    let text = this.add.text(500, 70, content, {
      fontSize: '30px',
      fill: '#ffffff',
    });
    text.setScrollFactor(0);

    // fruit positions on map

    let fruitsX = 640;
    let strawberryX = 640;
    let grapeX = 600;
    let orangeX = 670;
    let pearX = 620;
    let appleX = 670;

    let strawberryY = 390;
    let grapeY = strawberryY - 60;
    let orangeY = grapeY - 60;
    let pearY = orangeY - 60;
    let appleY = pearY - 60;
    let fruitsY = appleY - 65;

    // actions on collect fruits callback

    let fruitScore = 0;

    // CREATE CHEST

    const generateChest = (x, y) => {
      this.chestSprite = this.physics.add.sprite(x, y, 'chest').setSize(16, 32).setData('stars','star');
      this.chestSprite.body.immovable = true;
      this.physics.add.overlap(
        this.player,
        this.chestSprite,
        openChest,
        null,
        this
      );
      this.physics.add.collider(this.player, this.chestSprite, (reactCollision, stars) => {

        this.input.keyboard.on('keydown-SPACE', () => {
          const collectStar = new CustomEvent('starCollected', {
            detail: {
              reactCollision, stars
            }, 
          })
          window.dispatchEvent(collectStar)
        });
      })
      return this.chestSprite;
    };

    // OPEN CHEST

    function openChest() {
      this.input.keyboard.on('keydown-SPACE', () => {
        // this.physics.add.collider(this.player, this.chestSprite);
        this.chestSprite.anims.play('openChest', true);
      });
    }

    // function openChest() {

    // }


    this.physics.add.collider(this.player, this.chestSprite, (reactCollision, stars) => {

      this.input.keyboard.on('keydown-SPACE', () => {
        const collisionTest= new CustomEvent('react', {
          detail: {
            reactCollision, stars
          }, 
        })
        window.dispatchEvent(collisionTest)
      });
    })

    function collectFruits(player, fruit) {
      fruit.destroy(fruit.x, fruit.y);
      switch (fruit.texture.key) {
        case 'apple':
          this.apple.play();
          this.appleImage = this.physics.add.image(appleX, appleY, 'apple');
          this.appleImage = this.physics.add.image(fruitsX, fruitsY, 'apple');
          appleX += 20;
          fruitsX += 20;
          break;
        case 'pear':
          this.pear.play();
          this.pearImage = this.physics.add.image(pearX, pearY, 'pear');
          this.pearImage = this.physics.add.image(fruitsX, fruitsY, 'pear');
          pearX += 20;
          fruitsX += 20;
          break;
        case 'strawberry':
          this.strawberry.play();
          this.strawberryImage = this.physics.add.image(
            strawberryX,
            strawberryY,
            'strawberry'
          );
          this.strawberryImage = this.physics.add.image(
            fruitsX,
            fruitsY,
            'strawberry'
          );
          strawberryX += 20;
          fruitsX += 20;
          break;
        case 'grape':
          this.grape.play();
          this.grapeImage = this.physics.add.image(grapeX, grapeY, 'grape');
          this.grapeImage = this.physics.add.image(fruitsX, fruitsY, 'grape');
          grapeX += 20;
          fruitsX += 20;
          break;
        default:
          this.orange.play();
          this.orangeImage = this.physics.add.image(orangeX, orangeY, 'orange');
          this.orangeImage = this.physics.add.image(fruitsX, fruitsY, 'orange');
          orangeX += 20;
          fruitsX += 20;
      }

      fruitScore++;

      const fruitsRemaining = fruitsLayer.slice(fruitScore);

      if (fruitsRemaining.length) {
        generateChest(350, 180);
        this.doorSprite.anims.play('openDoors')
      }
      console.log(fruitsRemaining);
    }

    // character animations

    this.anims.create({
      key: 'left',

      frames: this.anims.generateFrameNumbers('bunny', {
        start: 24,
        end: 31,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'up',

      frames: this.anims.generateFrameNumbers('bunny', {
        start: 8,
        end: 15,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'bunny', frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',

      frames: this.anims.generateFrameNumbers('bunny', {
        start: 17,
        end: 23,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'down',

      frames: this.anims.generateFrameNumbers('bunny', {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // OPEN CHEST

    // this.physics.add.collider(this.player, chestSprite, () => {
    this.anims.create({
      key: 'openChest',
      frames: this.anims.generateFrameNumbers('chest', {
        start: 0,
        end: 4,
      }),
      frameRate: 10,
      repeat: 0,
    });
    // });

    // CLOSE CHEST

    this.anims.create({
      key: 'closeChest',
      frames: this.anims.generateFrameNumbers('chest', {
        start: 8,
        end: 0,
      }),
      frameRate: 50,
      repeat: 0,
    });

    // OPEN DOORS 

    this.anims.create({
      key: 'openDoors',
      frames: this.anims.generateFrameNumbers('doorsAnim', {
        start: 4,
        end: 0,
      }),
      frameRate: 5,
      repeat: 0,
    });

    // GO BACK TO MAP 

    this.physics.add.collider(this.player, this.doorSprite, ()=>{


        const message =  this.createEmitter()
        this.scene.start('Map')
        return message
    })

    this.physics.add.collider(this.player, this.doorSprite) 
    

  }
  
  createEmitter() {
     console.log('IM IN MINI MAP 2 LADS!')
   }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();

    // const spacePressed = Phaser.Input.Keyboard.JustUp(this.cursors.space);
    // if (spacePressed) {
    //   this.chestSprite.play('animationKey');
    //  console.log('hello')
    // }

    if (cursors.left.isDown) {
      this.player.setVelocity(-160, 0);

      this.player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      this.player.setVelocity(160, 0);

      this.player.anims.play('right', true);
    } else if (cursors.up.isDown) {
      this.player.setVelocity(0, -160);

      this.player.anims.play('up', true);
    } else if (cursors.down.isDown) {
      this.player.setVelocity(0, 160);

      this.player.anims.play('down', true);
    } else {
      this.player.setVelocity(0);
      this.player.anims.play('turn');
    }

    if (cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }

}

export default MiniGame1;
