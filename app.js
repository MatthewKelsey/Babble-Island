const app = new PIXI.Application({ background: '#1099bb' });
document.body.appendChild(app.view);

const container = new PIXI.Container();

app.stage.addChild(container);
app.renderer.resize(window.innerWidth, window.innerHeight);

// Create a new texture
const bunny = PIXI.Sprite.from(
  '/Sprout Lands - Sprites - premium pack/objects/Piknik blanket.png'
);

// Create a 5x5 grid of bunnies

bunny.anchor.set(0.5);
container.addChild(bunny);

const tree = PIXI.Sprite.from('Sprout Lands - Sprites - premium pack/tree.png');

tree.anchor.set(0.5);
container.addChild(tree);

tree.width = 200;
tree.height = 200;

tree.x = app.screen.width / 2;
tree.y = app.screen.height / 2;

// const texture = PIXI.Texture.from(
//   'Sprout Lands - Sprites - premium pack/tilesets/water frames/Water_1.png'
// );

// for (let i = 0; i < 100; i++) {
//   const grass = new PIXI.Sprite(texture);
//   grass.anchor.set(0.5);
//   grass.x = i;
//   grass.y = Math.floor(i / 5) * 40;
//   container.addChild(grass);
// }

const texture = PIXI.Texture.from('Sprout Lands - Sprites - premium pack/tilesets/water frames/Water_1.png');

// Create a 5x5 grid of bunnies
for (let i = 0; i < 25; i++) {
    const bunny = new PIXI.Sprite(texture);
    bunny.anchor.set(0.5);
    bunny.x = (i % 10) * 40;
    bunny.y = Math.floor(i / 5) * 40;
    container.addChild(bunny);
}









// Move container to the center
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

// // Center bunny sprite in local container coordinates
// container.pivot.x = container.width / 2;
// container.pivot.y = container.height / 2;

// MOUSE!!!

app.stage.interactive = true;
app.stage.on('pointermove', moveBunny);

// function moveBunny(e) {
//   let pos = e.data.global;
//   tree.anchor.set(0.5);
//   tree.x = pos.x;
//   tree.y = pos.y;
// }

// KEYBOARD EVENTS
let keys = {};
let keysDiv;

window.addEventListener('keydown', keysDown);
window.addEventListener('keyup', keysUp);

app.ticker.add(gameLoop);
keysDiv = document.querySelector('#keys');

function keysDown(e) {
  keys[e.keyCode] = true;
  console.log(keys);
}

function keysUp(e) {
  keys[e.keyCode] = false;
}

function gameLoop() {
  keysDiv.innerHTML = JSON.stringify(keys);
  // LEFT
  if (keys['37']) {
    bunny.x -= 5;
  }
  // UP
  if (keys['38']) {
    bunny.y -= 5;
  }
  // RIGHT
  if (keys['39']) {
    bunny.x += 5;
  }
  // DOWN
  if (keys['40']) {
    bunny.y += 5;
  }
}
