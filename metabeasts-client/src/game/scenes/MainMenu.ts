import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

interface LobbyData {
    lobbyType: 'public' | 'private';
    playerName: string;
}

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    logoTween: Phaser.Tweens.Tween | null;
    lobbyInfo: GameObjects.Text;

    constructor ()
    {
        super('MainMenu');
    }

    create (data?: LobbyData)
    {
        // Make background take the whole screen
        this.background = this.add.image(0, 0, 'background')
            .setOrigin(0, 0)
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.logo = this.add.image(512, 300, 'logo').setDepth(100);

        this.title = this.add.text(512, 460, 'Metabeasts', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        // Display lobby information if available
        if (data && data.lobbyType && data.playerName) {
            const lobbyTypeText = data.lobbyType === 'public' ? '🌍 Public Lobby' : '🔒 Private Lobby';
            this.lobbyInfo = this.add.text(512, 520, `${lobbyTypeText} - Player: ${data.playerName}`, {
                fontFamily: 'Arial', fontSize: 20, color: '#4a90e2',
                stroke: '#000000', strokeThickness: 3,
                align: 'center'
            }).setOrigin(0.5).setDepth(100);
        }

        EventBus.emit('current-scene-ready', this);
    }
    
    changeScene ()
    {
        if (this.logoTween)
        {
            this.logoTween.stop();
            this.logoTween = null;
        }

        this.scene.start('Game');
    }

    moveLogo (vueCallback: ({ x, y }: { x: number, y: number }) => void)
    {
        if (this.logoTween)
        {
            if (this.logoTween.isPlaying())
            {
                this.logoTween.pause();
            }
            else
            {
                this.logoTween.play();
            }
        } 
        else
        {
            this.logoTween = this.tweens.add({
                targets: this.logo,
                x: { value: 750, duration: 3000, ease: 'Back.easeInOut' },
                y: { value: 80, duration: 1500, ease: 'Sine.easeOut' },
                yoyo: true,
                repeat: -1,
                onUpdate: () => {
                    if (vueCallback)
                    {
                        vueCallback({
                            x: Math.floor(this.logo.x),
                            y: Math.floor(this.logo.y)
                        });
                    }
                }
            });
        }
    }
}
