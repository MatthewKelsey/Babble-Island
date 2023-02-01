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
      'Darker Tall Grass hill tiles v.2',
      'grass',
      16,
      16,
      0,
      0
    );
    const tileset3 = map.addTilesetImage(
      'Trees, stumps and bushes',
      'trees',
      16,
      16,
      0,
      0
    );
    const tileset4 = map.addTilesetImage(
      'Mushrooms, Flowers, Stones',
      'objects',
      16,
      16,
      0,
      0
    );
    const tileset5 = map.addTilesetImage(
      'Wooden House',
      'houses',
      16,
      16,
      0,
      0
    );
    const tileset6 = map.addTilesetImage(
      'door animation sprites',
      'doors',
      16,
      16,
      0,
      0
    );
    const tileset7 = map.addTilesetImage(
      'Wood Bridge v.2 ',
      'bridges',
      16,
      16,
      0,
      0
    );
    const tileset8 = map.addTilesetImage('Water_4', 'water', 16, 16, 0, 0);

    const layer0 = map.createLayer('sea', tileset);
    const layer = map.createLayer('water', tileset8);
    const layer2 = map.createLayer('land', tileset2);
    const layer1 = map.createLayer('trees', tileset3);
    const layer4 = map.createLayer('objects', tileset4);
    const layer5 = map.createLayer('houses', tileset5);
    const layer6 = map.createLayer('doors', tileset6);
    const layer7 = map.createLayer('roof', tileset5);
    const layer8 = map.createLayer('bridges', tileset7);

    layer1.setCollisionByProperty({ collisions: true });
    // layer2.setCollisionByProperty({collisions:true});
    layer.setCollisionByProperty({ collisions: true });

    layer4.setCollisionByProperty({ collisions: true });
    layer5.setCollisionByProperty({ collisions: true });
    layer6.setCollisionByProperty({ collisions: true });
    layer7.setCollisionByProperty({ collisions: true });
    // layer8.setCollisionByProperty({collisions:true});

    const debugGraphics = this.add.graphics().setAlpha(0.75);

    // layer2.renderDebug(debugGraphics, {
    //     tileColor: null, // Color of non-colliding tiles
    //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    //     });

    // layer1.renderDebug(debugGraphics, {
    // tileColor: null, // Color of non-colliding tiles
    // collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    // faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    // });

    // layer.renderDebug(debugGraphics, {
    //     tileColor: null, // Color of non-colliding tiles
    //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    //     });

    this.player = this.physics.add
      .sprite(500, 500, 'bunny')
      .setSize(10, 10)
      .setScale(1.5)


    this.physics.add.collider(this.player, layer1);
    // this.physics.add.collider(player, layer2)

    this.physics.add.collider(this.player, layer);
    this.physics.add.collider(this.player, layer4);
    this.physics.add.collider(this.player, layer5);
    this.physics.add.collider(this.player, layer6);
    this.physics.add.collider(this.player, layer7);
    // this.physics.add.collider(player, layer8)

    // this.player.setCollideWorldBounds(true);

    // player.setScale(1);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.door = this.physics.add.sprite(1200, 450, 'bomb')

    this.physics.add.collider(this.player, this.door, ()=>{
      this.scene.start('MiniGame1', this.player)
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

    this.cameras.main.setBounds(0, 0);
    this.cameras.main.startFollow(this.player);
  }
}

export default Map;
