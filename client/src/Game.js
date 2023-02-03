// import React from 'react';
// import { useEffect } from "react";
// import Phaser from 'phaser'
// import Map from '../src/components/src/Map'
// import { IonPhaser } from '@ion-phaser/react'
// import Preloader from '../src/components/src/preloader'
// import MiniGame1 from '../src/components/src/MiniGame1'
// import MiniGame2 from '../src/components/src/MiniGame2'
// import MiniGame3 from '../src/components/src/MiniGame3'


// function Game(props) {
  
//     const gameRef = useRef<Phaser.Game>(null);
    
//     useEffect(() => {
//         if (!gameRef.current) {
//             const config = {
//                 type: Phaser.AUTO,
//                 physics: {
//                     default: 'arcade',
//                     arcade: {
//                         debug:false,
//                         gravity: { y: 0},
//                     },
            
//                 },
//                 scene: [Preloader, OpeningScreen, MiniGame1, MiniGame2, Scene, Map],
//                 scale: {
//                 zoom: 1.5,
//                 parent: 'app',
//                 width: window.innerWidth,
//                 height: window.innerHeight,
//               },
//             }
            
//           gameRef.current = new Phaser.Game(config);
//         }
//         return () => {
//           gameRef.current?.destroy(true);
//           gameRef.current = null;
//         };
//       }, []);
    
//       return <div id="game-container" />;
//     };
    

// export default Game;