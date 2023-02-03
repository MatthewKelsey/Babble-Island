// @ts-nocheck

import Phaser from "phaser";


export default class OpeningScreen extends Phaser.Scene {
constructor(){
    super('OpeningScreen')
}

preload(){
    
}
create(){
    
    const { width: gameWidth, height: gameHeight } = this.cameras.main;

    const scale = Math.max(Math.ceil(gameWidth / 480), Math.ceil(gameHeight / 216));

    this.add.image(-10, -50, 'background')
        .setScale(.8)
        .setDepth(0)
        .setOrigin(0, 0);

    this.add.text(100,20, 'Babble Island', {fontSize:80})

    const customEvent = new CustomEvent('menu-items', {
        detail: {
            menuItems: ['start', 'exit'],
            menuPosition: 'center',
        },
    });

    window.dispatchEvent(customEvent);
    const gameMenuSelectedEventListener = ({ detail }) => {
        switch (detail.selectedItem) {
            case 'start': {
                this.scene.start('GameScene');
                break;
            }

            case 'exit': {
                window.location.reload();
                break;
            }

            case 'settings': {
                break;
            }

            default: {
                break;
            }
        }

        window.removeEventListener(
            'menu-item-selected',
            gameMenuSelectedEventListener
        );
    };

    window.addEventListener(
        'menu-item-selected',
        gameMenuSelectedEventListener
    );
}

}
