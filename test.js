// Tileset by CraftPix.net :- https://craftpix.net/freebies/free-market-cartoon-2d-game-tileset/
// Spritesheet generate using TexturePacker

const app = new PIXI.Application({
  antialias: true,
  autoDensity: true,
  // autoStart: false,
  backgroundColor: 0xffffff,
  // resolution: devicePixelRatio,
});

app.renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(app.view);


app.loader.add('water', 'water.json');
app.loader.add('piknik', 'piknik.json')
app.loader.add('cows', 'cows.json' )  
app.loader.add('boats', 'boats.json')
app.loader.add('bunny', 'bunny.json')
app.loader.add('trees', 'trees.json')

app.loader.load(function onAssetsLoaded(loader, resources) {
  // Extract the base-texture of our tileset!
  const baseTexture = PIXI.BaseTexture.from('tileset.png');
              
  const piknik = PIXI.BaseTexture.from('piknik.png')

  // Screen dimensions will be useful
  const screen = app.renderer.screen;

  // Make the background sprite, and the tilemap

  const tilemap1 = new PIXI.tilemap.Tilemap([
    baseTexture,

  ]);
  
  const tilemap2 = new PIXI.tilemap.Tilemap([
    piknik
    
  ]);


  // Add the tiles!
  
  for(let i =0; i < 100; i ++) {
    for (let y=0; y<100; y++) {
      tilemap1.tile('Water_1.png', 16 * i, 16 * y);
    }
    
  }

  tilemap2.x = app.screen.width /2
  tilemap2.y = app.screen.height /2 
  
  for (let i = 0 ; i < 5; i++) {
    
    tilemap2.tile('piknik.png',0, 32 * i)
    tilemap2.tile('piknik.png',32 * i, 0)
    tilemap2.tile('piknik.png',32 * i, 120)
    tilemap2.tile('piknik.png',120, 32 * i)
  }

  let texture = loader.resources.cows.spritesheet

  const cow = new PIXI.AnimatedSprite(texture.animations.cow)

  let texture2 = loader.resources.boats.spritesheet

  const boat = new PIXI.AnimatedSprite(texture2.animations.Sprite)
  boat.width = 100
  boat.height = 100

  slowSpeed = 0.1

  boat.animationSpeed = slowSpeed
  boat.play()

  boat.onComplete = () => {
    console.log('done')
  }
  boat.onLoop = () => {
    console.log('loop')
  }


  let texture3 = loader.resources.bunny.spritesheet

  const bunny = new PIXI.AnimatedSprite(texture3.animations.Bunny)
  bunny.animationSpeed = slowSpeed
  bunny.width = 50
  bunny.height = 50
  bunny.x = app.screen.width / 2
bunny.y = app.screen.height / 2.5 
  bunny.play()

  cow.width = 50 
  cow.height = 50 
  cow.x = app.screen.width / 3 
  cow.y = app.screen.height/ 3 
  
  cow.animationSpeed = slowSpeed
  cow.play()

  const island = new PIXI.Sprite.from('./images/island1.png')
  island.x = app.screen.width /2
  
  tilemap2.width = 100 
  tilemap2.height = 100

 
  app.stage.addChild(tilemap1);
  app.stage.addChild(tilemap2);
  app.stage.addChild(island)
  app.stage.addChild(cow)
  app.stage.addChild(boat)
  app.stage.addChild(bunny) 
  
  // app.stage.addChild(tilemap3)

  app.render();
  
  app.stage.interactive = true;


  let keys = {};
  
  window.addEventListener('keydown', keysDown);
  window.addEventListener('keyup', keysUp);
  
  app.ticker.add(gameLoop);
  // keysDiv = document.querySelector('#keys');
  
  function keysDown(e) {
    keys[e.keyCode] = true;
    console.log(keys);
  }
  function keysUp(e) {
    keys[e.keyCode] = false;
  }
  function gameLoop() {
    document.innerHTML = JSON.stringify(keys);
    if (keys['37']) {
      bunny.x -= 5;
    }
    if (keys['38']) {
      bunny.y -= 5;
    }
    if (keys['39']) {
      bunny.x += 5;
    }
    if (keys['40']) {
      bunny.y += 5;
    }
  }
})

let character = {
  x:0, y:0,
  vx:0, vy:0
}


app.ticker.add(()=>{
  if(character.vy > 0){
    for (let i=0; i< character.vy; i++){

    }
   }
})


// checkCollision( bunny, boat)