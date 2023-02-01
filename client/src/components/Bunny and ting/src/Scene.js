import Phaser from "phaser";


export default class Scene extends Phaser.Scene {
  /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
  cursors;
 
  /**  @type {Phaser.Physics.Arcade.Sprite}*/
  player;



  constructor() {
    super("badmanTing");
  }
  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  create() {
    const { width, height } = this.scale;
    this.door = this.physics.add.sprite(width/2, 100, 'bomb')
    this.player = this.physics.add
      .sprite(width * 0.5, height * 0.5, "bunny")
      .setScale(2)
      .setSize(14, 12)
      .setOffset(1, 6);
    this.player.setCollideWorldBounds(true);

    this.boxGroup = this.physics.add.staticGroup();

    console.log('I love London')


    this.physics.add.collider(this.player, this.door, ()=>{
      this.scene.start('game', this.player)
    })
  
  }




  updatePlayer() {
    const speed = 200;
    if (this.cursors.left.isDown) {
      this.player.setVelocity(-speed, 0);
      this.player.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocity(speed, 0);
      this.player.play("right", true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocity(0, -speed);
      this.player.play("up", true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocity(0, speed);
      this.player.play("down", true);
    } else {
      this.player.setVelocity(0, 0);
      this.player.play("idle", true);
    }

   
  }
 
  update() {
    this.children.each((c) => {
      /**@type {Phaser.Physics.Arcade.Sprite} */
      //@ts-ignore
      const child = c;
      if (child.getData("sorted")) {
        return;
      }
      child.setDepth(child.y);
    });
    // this.checkForComplete();
    
    this.updatePlayer();
    // this.createWordBox();
  }
}
