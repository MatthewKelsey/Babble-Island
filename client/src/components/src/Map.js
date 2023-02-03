// @ts-nocheck
import Phaser from 'phaser';

class Map extends Phaser.Scene {
  constructor() {
    super({
      key: 'Map',
    });
  }

  create() {

    // game.world.setBounds(0,0,2000,2000)
    const map = this.make.tilemap({ key: 'map' });

    const tileset = map.addTilesetImage('Water', 'water', 16, 16, 0, 0);
    const tileset2 = map.addTilesetImage(
      'Darker_Tall_Grass',
      'grass',
      16,
      16,
      0,
      0
    );
    const tileset3 = map.addTilesetImage(
      'Trees',
      'trees',
      16,
      16,
      0,
      0
    );
    const tileset4 = map.addTilesetImage(
      'Mushrooms',
      'objects',
      16,
      16,
      0,
      0
    );
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
    const tileset7 = map.addTilesetImage(
      'WoodBridge',
      'bridges',
      16,
      16,
      0,
      0
    );
    const tileset8 = map.addTilesetImage(
      'Water_4',
      'water',
      16,
      16,
      0,
      0
    );

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
    roof.setCollisionByProperty({ collisions: true });



    const debugGraphics = this.add.graphics().setAlpha(0.75);

    // layer.renderDebug(debugGraphics, {
    //     tileColor: null, // Color of non-colliding tiles
    //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    //     });

    this.player = this.physics.add
      .sprite(500, 500, 'bunny')
      .setSize(10, 10)
      .setScale(1.5)


    this.physics.add.collider(this.player, layer);
    this.physics.add.collider(this.player, trees);
    this.physics.add.collider(this.player, objects);
    this.physics.add.collider(this.player, houses);
    this.physics.add.collider(this.player, door1);
    this.physics.add.collider(this.player, door2);
    this.physics.add.collider(this.player, door3);
    this.physics.add.collider(this.player, door4);
    this.physics.add.collider(this.player, roof);



    // this.player.setCollideWorldBounds(true);

    // player.setScale(1);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.door = this.physics.add.sprite(600, 550, 'bomb')
    this.door2 = this.physics.add.sprite(600,500,'bomb')

    this.physics.add.collider(this.player, this.door, ()=>{
      this.scene.start('MiniGame1', this.player)
    })
    this.physics.add.collider(this.player, this.door2, ()=>{
      this.scene.start('MiniGame2', this.player)
    })



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
  }


  update() {
    const cursors = this.input.keyboard.createCursorKeys();

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
    this.game.scale.setZoom(1)
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0);
  }
}

export default Map;