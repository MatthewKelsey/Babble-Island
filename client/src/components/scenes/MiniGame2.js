// @ts-nocheck

import Phaser from "phaser";
const words = [1, 2, 3, 4, 5, 6, 7, 8];

function addToBox(arr) {
  let newBox = [[], []];
  const shuffledArray = arr.sort((a, b) => 0.5 - Math.random());
  for (let i = 0; i < arr.length; i++) {
    if (newBox[0].length < 4) {
      newBox[0].push(shuffledArray[i]);
    } else {
      newBox[1].push(shuffledArray[i]);
    }
  }
  return newBox;
}
function addToSpanishBox(arr) {
  let newBox = [[], []];
  const shuffledArray = arr.sort((a, b) => 0.5 - Math.random());
  for (let i = 0; i < arr.length; i++) {
    if (newBox[0].length < 4) {
      newBox[0].push(shuffledArray[i] + 8);
    } else {
      newBox[1].push(shuffledArray[i] + 8);
    }
  }
  return newBox;
}

const englishBoxContent = addToBox(words);
const spanishBoxContent = addToSpanishBox(words);

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
  /** @type {{box: Phaser.Physics.Arcade.Sprite, item: Phaser.GameObjects.Sprite}[]} */
  selectedBoxes = [];
  /** @type {Phaser.Physics.Arcade} */

  matchesCount = 0;

  constructor() {
    super("MiniGame2");
  }
 

  init() {
    this.game.scale.setZoom(1);
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0)
    const { width, height } = this.scale;
    this.door = this.physics.add.sprite(width / 2, 100, "bomb");
    this.player = this.physics.add
      .sprite(width * 0.5, height * 0.5, "bunny")
      .setScale(3)
      .setSize(12, 8)
      .setOffset(2, 10);
    this.player.setCollideWorldBounds(true);

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
    this.physics.add.collider(this.player, this.door, () => {
      this.scene.start("MiniGame1", this.player);
    });
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
    const height = this.scale.height;
    let x = 0.2;
    let y = 0.2;

    for (let row = 0; row < spanishBoxContent.length; row++) {
      for (let col = 0; col < spanishBoxContent[row].length; col++) {
        const box = this.boxGroup
          .get(width * x, height * y, "boxes")
          .setScale(3)
          .setSize(46, 32)
          .setOffset(-14, 0)
          .setData("item", spanishBoxContent[row][col])
          .setData("language", "spanish");
        x += 0.2;
      }
      x = 0.2;
      y += 0.2;
    }
  }

  createEnglishBoxes() {
    const width = this.scale.width;
    const height = this.scale.height;
    let x = 0.2;
    let y = 0.6;

    for (let row = 0; row < englishBoxContent.length; row++) {
      for (let col = 0; col < englishBoxContent[row].length; col++) {
        const box = this.boxGroup
          .get(width * x, height * y, "boxes")
          .setScale(3)
          .setSize(46, 32)
          .setOffset(-14, 0)
          .setData("item", englishBoxContent[row][col])
          .setData("language", "english");
        x += 0.2;
      }
      x = 0.2;
      y += 0.2;
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
    if (box.getData("opened")) {
      return;
    }
    const item = box.getData("item");
    const language = box.getData("language");
    /**@type {Phaser.GameObjects.Sprite} */
    let itemPic;
    console.log(itemPic);
    switch (item) {
      case 1:
        itemPic = this.itemsGroup.get(box.x, box.y);
        itemPic.setTexture("red");
        break;
      case 2:
        itemPic = this.itemsGroup.get(box.x, box.y);
        itemPic.setTexture("green");
        break;
      case 3:
        itemPic = this.itemsGroup.get(box.x, box.y);
        itemPic.setTexture("blue");
        break;
      case 4:
        itemPic = this.itemsGroup.get(box.x, box.y);
        itemPic.setTexture("pink");
        break;
      case 5:
        itemPic = this.itemsGroup.get(box.x, box.y);
        itemPic.setTexture("white");
        break;
      case 6:
        itemPic = this.itemsGroup.get(box.x, box.y);
        itemPic.setTexture("black");
        break;
      case 7:
        itemPic = this.itemsGroup.get(box.x, box.y);
        itemPic.setTexture("yellow");
        break;
      case 8:
        itemPic = this.itemsGroup.get(box.x, box.y).setScale(0.1);
        itemPic.setTexture("orange_colour");
        break;
      case 9:
        itemPic = this.itemsGroup.get(box.x, box.y).setScale(0.1);
        itemPic.setTexture("rojo");
break
      case 10:
        itemPic = this.itemsGroup.get(box.x, box.y);
        itemPic.setTexture("verde");

        break;
      case 11:
        itemPic = this.itemsGroup.get(box.x, box.y);
        itemPic.setTexture("azul");

        break;
      case 12:
        itemPic = this.itemsGroup.get(box.x, box.y).setScale(0.1);
        itemPic.setTexture("rosa");

        break;
      case 13:
        itemPic = this.itemsGroup.get(box.x, box.y).setScale(0.1);
        itemPic.setTexture("blanco").setSize(0.1);

        break;
      case 14:
        itemPic = this.itemsGroup.get(box.x, box.y).setScale(0.1);
        itemPic.setTexture("negro");

        break;
      case 15:
        itemPic = this.itemsGroup.get(box.x, box.y).setScale(0.1);
        itemPic.setTexture("amarillo");

        break;
      case 16:
        itemPic = this.itemsGroup.get(box.x, box.y).setScale(0.1);
        itemPic.setTexture("naranja");
        break;
  
    }

    box.setData("opened", true);
    itemPic.setData("sorted", true);
    itemPic.setDepth(3000);

    itemPic.scale = 0;
    itemPic.alpha = 0;

    this.selectedBoxes.push({ box, itemPic });
    this.tweens.add({
      targets: itemPic,
      y: "-= 50",
      alpha: 1,
      scale: 0.1,
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
    if (
      first.box.getData("item") !== second.box.getData("item") - 8 &&
      first.box.getData("item") - 8 !== second.box.getData("item")
    ) {
      this.tweens.add({
        targets: [first.itemPic, second.itemPic],
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
      return;
    }
    this.matchesCount++;
    console.log(this.matchesCount);
    if (this.matchesCount === 8) {
      
      this.add.text(this.scale.width / 2, this.scale.height / 2, "Well Done");
      // this.generateChest(this.scale.width/2, this.scale.height/2)
    }
  }
  updateActiveBox() {
    // if(box.getData('opened')){
    // return}

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


  generateChest = (x, y) => {
    this.chestSprite = this.physics.add
      .sprite(x, y, 'chest')
      .setSize(16, 32)
      .setData('stars', starCounter);
    this.chestSprite.body.immovable = true;
    this.physics.add.overlap(
      this.player,
      this.chestSprite,
      openChest,
      null,
      this
    );
    this.physics.add.collider(
      this.player,
      this.chestSprite,
      (reactCollision, stars) => {
        this.input.keyboard.on('keyup-SPACE', (e) => {
          e.preventDefault()
          const collectStar = new CustomEvent('starCollected', {
            detail: {
              reactCollision,
              stars,
            },
          });
          if (!chestOpened) {
            window.dispatchEvent(collectStar);
          }
          chestOpened = true;
        });
      }
    );
    return this.chestSprite;
  };

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

export default MiniGame2;
