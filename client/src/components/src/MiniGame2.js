// @ts-nocheck


import Phaser from "phaser";

const boxContent = [
  [
    { spanish: "Green", english: "Verde" },
    { spanish: "Blue", english: "Azul" },
    { spanish: "Pink", english: "Rosada" },
    { spanish: "White", english: "Blanco" },
  ],
  [
    { spanish: "Black", english: "Negro" },
    { spanish: "Red", english: "Rojo" },
    { spanish: "Yellow", english: "Amarillo" },
    { spanish: "Purple", english: "Purpura" },
  ],
];

const wordBox = [
  ["green", "verde"],
  ["blue", "azul"],
  ["white", "blanco"],
  ["black", "negro"],
  ["red", "rojo"],
  ["brown", "moron"],
  ["a", "g"],
  ["j", "u"],
];

class MiniGame2 extends Phaser.Scene {
  /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
  cursors;
  /**@type {{english: Phaser.Types.GameObjects.Text.TextStyle, spanish: Phaser.Types.GameObjects.Text.TextStyle}[]} */
  foundPairs = [];
  /**  @type {Phaser.Physics.Arcade.Sprite}*/
  player;

  /**@type {Phaser.Physics.Arcade.StaticGroup} */
  boxGroup;

  /** @type {Phaser.Physics.Arcade.Sprite} */
  activeBox;

  /**@type {Phaser.GameObjects.Group} */
  itemsGroup;
  /** @type {{box: Phaser.Physics.Arcade.Sprite, item: object}[]} */
  selectedBoxes = [];
  /** @type {Phaser.Physics.Arcade} */

  constructor() {
    super("MiniGame2");
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

    console.log(this.player)

    this.boxGroup = this.physics.add.staticGroup();

    this.createSpanishBoxes();
    this.createEnglishBoxes();
    this.itemsGroup = this.add.group();
    this.physics.add.collider(this.player, this.boxGroup, (player, box) => {
      if (box.getData("opened")) {
        return;
      }
      //@ts-ignore
      this.activeBox = box;

     
    });


    this.physics.add.collider(this.player, this.door, ()=>{
      this.scene.start('MiniGame1', this.player)
    })
  
  }

  createWordBox() {
    const width = this.scale.width;
    let x = 0.4;
    let y = 20;

    for (let row = 0; row < wordBox.length; row++) {
      for (let col = 0; col < wordBox[row].length; col += 2) {
        this.add.text(x * width, y, wordBox[row][0]);
        x += 0.2;
        this.add.text(x * width, y, wordBox[row][1]);
      }
      x = 0.4;
      y += 20;
    }
  }

  
  createSpanishBoxes() {
    const width = this.scale.width;
    let x = 0.2;
    let y = 280;

    for (let row = 0; row < boxContent.length; row++) {
      for (let col = 0; col < boxContent[row].length; col++) {
        const box = this.boxGroup
          .get(width * x, y, "boxes")
          .setScale(2)
          .setSize(30, 15)
          .setOffset(-7, 4)
          .setData("words", boxContent[row][col])
          .setData('language', 'spanish');
        x += 0.2;
      }
      x = 0.2;
      y += 80;
    }
  }

  createEnglishBoxes() {
    const width = this.scale.width;
    let x = 0.2;
    let y = 440;

    for (let row = 0; row < boxContent.length; row++) {
      for (let col = 0; col < boxContent[row].length; col++) {
        const box = this.boxGroup
          .get(width * x, y, "boxes")
          .setScale(2)
          .setSize(30, 15)
          .setOffset(-7, 4)
          .setData("words", boxContent[row][col])
          .setData('language' , 'english');
        x += 0.2;
      }
      x = 0.2;
      y += 80;
    }
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

    const spacePressed = Phaser.Input.Keyboard.JustUp(this.cursors.space);
    if (spacePressed) {
      this.openBox(this.activeBox);
    }
  }
  /** @param {Phaser.Physics.Arcade.Sprite}  box*/

  openBox(box) {
    if (!box) {
      return;
    }
    const word = box.getData("words");
    const language = box.getData('language')
    /**{Phaser.GameObjects.Sprite} */
    let wordy;

    console.log(word)
  
    wordy = this.itemsGroup.get(box.x, box.y);
    wordy.setData('words',word[language])
    if (!wordy) {
      return;
    }
    box.setData("opened", true);
    wordy.setData("sorted", true);
    this.add.text(
      box.x - 15,
      box.y- 35,
      word[language],
      { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }
    )
    wordy.setDepth(3000);

    wordy.scale = 0;
    wordy.alpha = 0;
      const help = 'ya ya ya ya ya'
    this.selectedBoxes.push({ box, wordy });
    this.tweens.add({
      targets: help,
      y: "-= 50",
      alpha: 1,
      scale: 1,
      duration: 500,
      onComplete: () => {
        console.log(this.selectedBoxes);
        if (this.selectedBoxes.length < 2) {
          return;
        }
        this.checkForMatch();
      },
    });
    // this.activeBox.setFrame(10)
    this.activeBox = undefined;
  }

  checkForMatch() {
    const second = this.selectedBoxes.pop();
    const first = this.selectedBoxes.pop();
    console.log(second);
    if (first.box.getData("words") === second.box.getData("words")) {
      console.log('Matt is the best')
      console.log(first)
      this.tweens.add({
        targets: [first.item, second.item],
        y: "+= 50",
        alpha: 0,
        scale: 0,
        duration: 500,
        delay: 1000,
        onComplete: () => {
          first.box.setData("opened", false);
          second.box.setData("opened", false);
        },
      });
    }
  }
  updateActiveBox() {
    if (!this.activeBox) {
      return;
    }
    const distance = Phaser.Math.Distance.Between(
      this.player.x,
      this.player.y,
      this.activeBox.x,
      this.activeBox.y
    );
    if (distance < 64) {
      return;
    }
    this.activeBox = undefined;
  }
  checkForComplete() {
    if (wordBox.length !== 8) {
      return;
    }
    if (wordBox.length === 8) {
      this.add.text(
        this.scale.width / 4,
        400,
        "Well Done! You matched all the pairs!",
        { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }
      );
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
    this.updateActiveBox();
    this.updatePlayer();
    // this.createWordBox();
  }
}

export default MiniGame2 
