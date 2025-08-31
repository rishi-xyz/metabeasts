import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

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
    private backgroundButton: Phaser.GameObjects.Arc;
    private refreshIcon: Phaser.GameObjects.Text;
    private buttonPosition = { x: 50, y: 50 };

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
        this.buttonPosition.x = 1860;
        this.buttonPosition.y = 1010;

        // Create a circular button in bottom left to change backgrounds
        this.backgroundButton = this.add.circle(this.buttonPosition.x, this.buttonPosition.y, 30, 0x4a90e2)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.changeBackground())
            .on('pointerover', () => this.backgroundButton.setFillStyle(0x357abd))
            .on('pointerout', () => this.backgroundButton.setFillStyle(0x4a90e2));

        // Add a refresh icon or text inside the circle
        this.refreshIcon = this.add.text(this.buttonPosition.x, this.buttonPosition.y, '🔄', {
            fontSize: 24,
            color: '#ffffff'
        }).setOrigin(0.5);
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
        // Emit event to show the React LobbySelector component
        EventBus.emit('show-lobby-selector', this);
        
        // When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        // For example, you can define global animations here, so we can use them in other scenes.
    }
}
