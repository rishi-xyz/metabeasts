import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        // Load the main background and additional backgrounds for the Preloader
        this.load.image('background', 'assets/Graphics/Titles/credits1.png');
        this.load.image('background0', 'assets/Graphics/Titles/credits1.png');
        this.load.image('background1', 'assets/Graphics/Titles/credits2.png');
        this.load.image('background2', 'assets/Graphics/Titles/credits3.png');
        this.load.image('background3', 'assets/Graphics/Titles/credits4.png');
    }

    create ()
    {
        // Add background image and scale it to fill the entire scene        
        this.scene.start('Preloader');
    }
}
