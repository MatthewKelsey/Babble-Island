import Phaser from "phaser";

export default class MiniGame3 extends Phaser.Scene {
  constructor() {
    super("MiniGame3");
  }

  // create(){

  //   const map2 = this.make.tilemap({key: 'map2'});

  //   const tileset = map2.addTilesetImage('tile details', 'tiles', 16,16,0,0);
  //   const tileset2 = map2.addTilesetImage('Wooden House', 'tiles2', 16,16,0,0);

  //   const layer3 = map2.createLayer('green', tileset,0,0);
  //   const layer2 = map2.createLayer('ground', tileset,0,0);
  //   const layer1 = map2.createLayer('wall', tileset2,0,0);

  //   layer1.setCollisionByProperty({collide:true});

  //   this.player = this.physics.add
  //     .sprite(250, 250, 'bunny')
  //     .setSize(10, 10)
  //     .setScale(1.5)

  //   this.physics.add.collider(this.player, layer1);

  //   this.cursors = this.input.keyboard.createCursorKeys();
  //   this.door = this.physics.add.sprite(1200, 450, 'bomb')

  //   this.physics.add.collider(this.player, this.door, ()=>{
  //     this.scene.start('Map', this.player)
  //   })

  //   this.anims.create({
  //     key: 'left',

  //     frames: this.anims.generateFrameNumbers('bunny', {
  //       start: 24,
  //       end: 31,
  //     }),
  //     frameRate: 10,
  //     repeat: -1,
  //   });

  //   this.anims.create({
  //     key: 'up',

  //     frames: this.anims.generateFrameNumbers('bunny', {
  //       start: 8,
  //       end: 15,
  //     }),
  //     frameRate: 10,
  //     repeat: -1,
  //   });

  //   this.anims.create({
  //     key: 'turn',
  //     frames: [{ key: 'bunny', frame: 4 }],
  //     frameRate: 20,
  //   });

  //   this.anims.create({
  //     key: 'right',

  //     frames: this.anims.generateFrameNumbers('bunny', {
  //       start: 17,
  //       end: 23,
  //     }),
  //     frameRate: 10,
  //     repeat: -1,
  //   });

  //   this.anims.create({
  //     key: 'down',

  //     frames: this.anims.generateFrameNumbers('bunny', {
  //       start: 0,
  //       end: 7,
  //     }),
  //     frameRate: 10,
  //     repeat: -1,
  //   });
  // }

  // update() {
  //   const cursors = this.input.keyboard.createCursorKeys();

  //   if (cursors.left.isDown) {
  //     this.player.setVelocity(-160, 0);

  //     this.player.anims.play('left', true);
  //   } else if (cursors.right.isDown) {
  //     this.player.setVelocity(160, 0);

  //     this.player.anims.play('right', true);
  //   } else if (cursors.up.isDown) {
  //     this.player.setVelocity(0, -160);

  //     this.player.anims.play('up', true);
  //   } else if (cursors.down.isDown) {
  //     this.player.setVelocity(0, 160);

  //     this.player.anims.play('down', true);
  //   } else {
  //     this.player.setVelocity(0);
  //     this.player.anims.play('turn');
  //   }

  //   if (cursors.up.isDown && this.player.body.touching.down) {
  //     this.player.setVelocityY(-330);
  //   }
  // }
}
