import { Scene } from 'phaser';

export class Preloader extends Scene
{
    private backgrounds: string[] = [
        'assets/Graphics/Titles/credits1.png',
        'assets/Graphics/Titles/credits2.png',
        'assets/Graphics/Titles/credits3.png',
        'assets/Graphics/Titles/credits4.png'
    ];
    private currentBackgroundIndex: number = 0;
    private backgroundImage: Phaser.GameObjects.Image;
    private backgroundButton: Phaser.GameObjects.Text;

    constructor ()
    {
        super('Preloader');
    }

    preload ()
    {
        // Load multiple background images
        this.backgrounds.forEach((bgPath, index) => {
            this.load.image(`background${index}`, bgPath);
        });
    }

    init ()
    {
        // Create the background image
        this.backgroundImage = this.add.image(0, 0, 'background0');
        this.backgroundImage.setOrigin(0, 0);
        this.backgroundImage.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        // Create a button to change backgrounds
        this.backgroundButton = this.add.text(512, 600, 'Change Background', {
            fontFamily: 'Arial Black',
            fontSize: 24,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4,
            backgroundColor: '#4a90e2',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.changeBackground())
        .on('pointerover', () => this.backgroundButton.setStyle({ backgroundColor: '#357abd' }))
        .on('pointerout', () => this.backgroundButton.setStyle({ backgroundColor: '#4a90e2' }));

        // Add a progress bar
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(5, 0x000000);
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        // Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {
            // Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);
        });
    }

    private changeBackground()
    {
        // Cycle to next background
        this.currentBackgroundIndex = (this.currentBackgroundIndex + 1) % this.backgrounds.length;
        
        // Update the background image
        this.backgroundImage.setTexture(`background${this.currentBackgroundIndex}`);
        
        // Add a subtle transition effect
        this.tweens.add({
            targets: this.backgroundImage,
            alpha: 0,
            duration: 200,
            yoyo: true,
            onComplete: () => {
                this.backgroundImage.setAlpha(1);
            }
        });
    }

    create ()
    {
        // Add a continue button to move to MainMenu
        const continueButton = this.add.text(512, 700, 'Continue to` Game', {
            fontFamily: 'Arial Black',
            fontSize: 28,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4,
            backgroundColor: '#28a745',
            padding: { x: 25, y: 15 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.scene.start('MainMenu'))
        .on('pointerover', () => continueButton.setStyle({ backgroundColor: '#218838' }))
        .on('pointerout', () => continueButton.setStyle({ backgroundColor: '#28a745' }));

        // When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        // For example, you can define global animations here, so we can use them in other scenes.
    }
}
