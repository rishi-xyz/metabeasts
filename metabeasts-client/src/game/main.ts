import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game';
import { MainMenu } from './scenes/MainMenu';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader';

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    parent: 'game-container',
    backgroundColor: '#000000',
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.ScaleModes.RESIZE,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: false,
        },
    },
    autoFocus: true,
    scene: [
        Boot,
        Preloader,
    ],
};

const StartGame = (parent: string) => {
    // Optionally, set the parent container to take full screen
    const parentElement = document.getElementById(parent);
    if (parentElement) {
        parentElement.style.width = '100vw';
        parentElement.style.height = '100vh';
        parentElement.style.margin = '0';
        parentElement.style.padding = '0';
        parentElement.style.overflow = 'hidden';
    }
    return new Game({ ...config, parent });
}

export default StartGame;
