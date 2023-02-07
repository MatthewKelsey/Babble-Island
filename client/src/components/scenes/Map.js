// @ts-nocheck
import Phaser from 'phaser';
import Player from './Player.js';

class Map extends Phaser.Scene {
  /** @type {Phaser.Physics.Arcade.Sprite} */
  activeCharacter;

  constructor() {
    super({
      key: 'Map',
    });
    console.log('in map');
  }


  create() { 

    
    this.music = this.sound.add('gentle');
    this.walk = this.sound.add('walk')


    const walkConfig = {
      loop:false
    }
    // MUSIC CONFIG
    
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
    
    // FADE IN SCENE
    
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    
    // game.world.setBounds(0,0,2000,2000)
    const map = this.make.tilemap({ key: 'map' });
    // map.setScrollFactor(0)
    
    const tileset = map.addTilesetImage('Water', 'water', 16, 16, 0, 0);
    
    const tileset2 = map.addTilesetImage(
      'Darker_Tall_Grass',
      'grass',
      16,
      16,
      0,
      0
      );
    const tileset3 = map.addTilesetImage('Trees', 'trees', 16, 16, 0, 0);
    const tileset4 = map.addTilesetImage('Mushrooms', 'objects', 16, 16, 0, 0);
    const tileset5 = map.addTilesetImage(
      'Wooden_House',
      'houses',
      16,
      16,
      0,
      0
      );
      const tileset6 = map.addTilesetImage(
        'door_animation',
        'doors',
        16,
        16,
        0,
        0
        );
        const tileset7 = map.addTilesetImage('WoodBridge', 'bridges', 16, 16, 0, 0);
        const tileset8 = map.addTilesetImage('Water_4', 'water', 16, 16, 0, 0);
        
        const layer0 = map.createLayer('sea', tileset);
        const layer = map.createLayer('water', tileset8);

        const land = map.createLayer('land', tileset2);
        const trees = map.createLayer('trees', tileset3);
        const objects = map.createLayer('objects', tileset4);
        const houses = map.createLayer('houses', tileset5);
        const door1 = map.createLayer('door1', tileset6);
        
        const door2 = map.createLayer('door2', tileset6);
        const door3 = map.createLayer('door3', tileset6);
        const door4 = map.createLayer('door4', tileset6);
        const roof = map.createLayer('roof', tileset5);
        const bridges = map.createLayer('bridges', tileset7);
        
        // land.setCollisionByProperty({collisions:true});
        layer.setCollisionByProperty({ collisions: true });
        trees.setCollisionByProperty({ collisions: true });
        objects.setCollisionByProperty({ collisions: true });
        houses.setCollisionByProperty({ collisions: true });
        door1.setCollisionByProperty({ collisions: true });
        door2.setCollisionByProperty({ collisions: true });
        door3.setCollisionByProperty({ collisions: true });
        door4.setCollisionByProperty({ collisions: true });
        
        // roof.setCollisionByProperty({ collisions: true });
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        
        // layer.renderDebug(debugGraphics, {
          //     tileColor: null, // Color of non-colliding tiles
          //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
          //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
          //     });
          
          this.player = new Player(this, 500, 500, 'bunny')
          .setSize(10, 10)
          .setScale(1.5)

          //test atlas
          this.bunny2 = this.add.sprite(440, 360, 'bunny_digging', 'bunny_digging1');
          
          this.anims.create({
            key: 'dig',
      frames: this.anims.generateFrameNames('bunny_digging', {prefix: 'bunny_digging', start: 1, end: 32}),
      frameRate: 10,
      repeat: -1
    });
    this.bunny2.anims.play('dig');
    
    this.boat = this.add.sprite(255, 1400, 'boat_anchored', 'boat_anchored1');

      this.anims.create({
        key: 'boat',
        frames: this.anims.generateFrameNames('boat_anchored', {prefix: 'boat_anchored', start: 1, end: 2}),
        frameRate: 2,
        repeat: -1
    });
    this.boat.anims.play('boat');


    // CHARACTER 1

    this.character1 = this.physics.add
      .sprite(500, 600, 'bunny')
      .setSize(15, 15)
      .setData('character', 'character1')
      .setActive(false)
      .setScale(1.5);
    this.character1.body.immovable = true;

    // CHARACTER 2

    this.character2 = this.physics.add
      .sprite(900, 1590, 'bunny')
      .setSize(12, 12)
      .setData('character', 'character2')
      .setScale(1.5)
      .setActive(false);
    this.character2.body.immovable = true;

    // CHARACTER 3

    this.character3 = this.physics.add
      .sprite(1680, 720, 'bunny')
      .setSize(15, 15)
      .setData('character', 'character3')
      .setScale(1.5)
      .setActive(false);
    this.character3.body.immovable = true;

    // DISPATCHING CUSTOM EVENT!!!

    let isCharacterActive = false;

    // CHARACTER 1


    this.physics.add.collider(
      this.player,
      this.character1,
      (reactCollision, character) => {
        this.activeCharacter = character;
        this.activeCharacter.setActive(true);
        this.input.keyboard.on('keyup-SPACE', () => {
          const collisionTest = new CustomEvent('react', {
            detail: {
              reactCollision,
              character,
            },
          });
          if (this.character1.active) {
            window.dispatchEvent(collisionTest);
          }
        });
      }
    );

    // CHARACTER 2

    this.physics.add.collider(
      this.player,
      this.character2,
      (reactCollision, character) => {
        this.activeCharacter = character;
        this.character2.setActive(true);
        this.input.keyboard.on('keyup-SPACE', () => {
          const collisionTest = new CustomEvent('react', {
            detail: {
              reactCollision,
              character,
            },
          });
          if (this.character2.active) {
            window.dispatchEvent(collisionTest);
          }
        });
      }
    );

    // CHARACTER 3

    this.physics.add.collider(
      this.player,
      this.character3,
      (reactCollision, character) => {
        this.activeCharacter = character;
        this.character3.setActive(true);
        this.input.keyboard.on('keyup-SPACE', () => {
          const collisionTest = new CustomEvent('react', {
            detail: {
              reactCollision,
              character,
            },
          });
          if (this.character3.active) {
            window.dispatchEvent(collisionTest);
          }
        });
      }
    );

    this.physics.add.collider(this.player, layer);
    this.physics.add.collider(this.player, trees);
    this.physics.add.collider(this.player, objects);
    this.physics.add.collider(this.player, houses);

    // FADE OUT OF MAP


    // MINI GAME 1
    this.physics.add.collider(this.player, door1, () => {
      this.music.stop()
      this.cameras.main.fadeOut(1000, 0, 0, 0);
    });
    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      (cam, effect) => {
        this.scene.start('MiniGame1');
      }
    );


    // MINI GAME 2
    this.physics.add.collider(this.player, door4, () => {
      this.music.stop()
      this.cameras.main.fadeOut(1000, 0, 0, 0);
      this.scene.start('MiniGame2');
    });

    this.physics.add.collider(this.player, door2, ()=>{
      console.log('door 2 collision')
      
      // const libraryEntrance = new CustomEvent('library', {detail: {
        //   libraryDoor
        // }})
        // window.dispatchEvent(libraryEntrance);
      });
      
      
      
      this.physics.add.collider(this.player, door3 , (libraryDoor)=>{
        
        const libraryEntrance = new CustomEvent('library', {detail: {
          libraryDoor
        }})
        window.dispatchEvent(libraryEntrance);
      }
      );
      // this.physics.add.collider(this.player, door4, () => {
        //   this.scene.start('MiniGame2', this.player);
        // });
        // this.physics.add.collider(this.player, roof);

     
      }
      
      updateActiveCharacter() {
        if (!this.activeCharacter) {
          return;
    }
    const distance = Phaser.Math.Distance.Between(
      this.player.x,
      this.player.y,
      this.activeCharacter.x,
      this.activeCharacter.y
      );
      
      const characterActiveOrNot = this.activeCharacter.active;
      
      const collisionTest = new CustomEvent('isActiveOrNot', {
        detail: {
          characterActiveOrNot,
        },
      });
      window.dispatchEvent(collisionTest);
      
      if (distance < 80) {
        this.activeCharacter.setActive(true);
        return;
      } else {
        this.activeCharacter.setActive(false);
        return;
      }
      // this.activeCharacter = undefined;

    }
    
    update() {

    this.player.updatePlayer();
    this.updateActiveCharacter();

    const spacePressed = Phaser.Input.Keyboard.JustUp(
      this.player.cursors.space
    );

    if (spacePressed) {
      console.log('SPACE PRESSED');
    }

    this.game.scale.setZoom(1);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.zoomTo(2, 2);
    this.cameras.main.setBounds(0, 0, 2000, 2000, true);

  }
}

export default Map;
