import { Actor, Scene, Vector, Color, Label, Font, Keys, SpriteSheet, EasingFunctions } from "excalibur";
import { Resources } from './resources.js';
import { Background } from "./background.js";
import { Player } from './player.js';

export let selectedPlayer = '';

export class SelectScene extends Scene {
    onInitialize(engine) {
        this.background = new Background(Resources.Podiums.toSprite(), 640, 370, 2.2, 2.1);
        this.add(this.background);

        const player1 = SpriteSheet.fromImageSource({
            image: Resources.Player1,
            grid: {
                rows: 6,
                columns: 8,
                spriteWidth: 187.5,
                spriteHeight: 250
            }
        });

        const player2 = SpriteSheet.fromImageSource({
            image: Resources.Player2,
            grid: {
                rows: 6,
                columns: 8,
                spriteWidth: 187.5,
                spriteHeight: 250
            }
        });

        const player3 = SpriteSheet.fromImageSource({
            image: Resources.Player3,
            grid: {
                rows: 6,
                columns: 8,
                spriteWidth: 187.5,
                spriteHeight: 250
            }
        });

        const scale = new Vector(0.6, 0.6);

        const sprite1 = new Actor({
            pos: new Vector(260, 450),
            scale: scale
        });

        sprite1.graphics.use(player1.getSprite(0, 0));

        const sprite2 = new Actor({
            pos: new Vector(630, 420),
            scale: scale
        });
        sprite2.graphics.use(player2.getSprite(0, 0));

        const sprite3 = new Actor({
            pos: new Vector(1000, 480),
            scale: scale
        });
        sprite3.graphics.use(player3.getSprite(0, 0));

        const label1 = new Label({
            text: "A",
            pos: new Vector(260, 350),
            color: Color.Black,
            font: new Font({
                family: 'Arial',
                size: 24
            })
        });

        const label2 = new Label({
            text: "W",
            pos: new Vector(630, 320),
            color: Color.Black,
            font: new Font({
                family: 'Arial',
                size: 24
            })
        });

        const label3 = new Label({
            text: "D",
            pos: new Vector(1000, 380),
            color: Color.Black,
            font: new Font({
                family: 'Arial',
                size: 24
            })
        });

        const punkcritter = new Actor({
            pos: new Vector(360, 470),
            scale: scale
        });
        punkcritter.graphics.use(Resources.punkcritter.toSprite());

        const crittercamono = new Actor({
            pos: new Vector(730, 440),
            scale: scale
        });
        crittercamono.graphics.use(Resources.crittercamono.toSprite());

        const critterzumbi = new Actor({
            pos: new Vector(1100, 480),
            scale: scale
        });
        critterzumbi.graphics.use(Resources.critterzumbi.toSprite());

        this.add(punkcritter);
        this.add(crittercamono);
        this.add(critterzumbi);
        this.add(sprite1);
        this.add(sprite2);
        this.add(sprite3);
        this.add(label1);
        this.add(label2);
        this.add(label3);

        // Create the fade-out actor
        this.fadeOutActor = new Actor({
            pos: new Vector(640, 360),
            width: 1280,
            height: 720,
            color: Color.Black,
            opacity: 0
        });
        this.add(this.fadeOutActor);

        this.on('preupdate', (evt) => {
            if (engine.input.keyboard.wasPressed(Keys.A) || engine.input.keyboard.wasPressed(Keys.Left)) {
                console.log("Player1 selected");
                this.fadeOutActor.actions.fade(1, 1000, EasingFunctions.EaseInOutCubic).callMethod(() => {
                    engine.selectedPlayer = 'player1';
                    engine.goToScene('villaBaobab');
                });
            } else if (engine.input.keyboard.wasPressed(Keys.W) || engine.input.keyboard.wasPressed(Keys.Up)) {
                console.log("Player2 selected");
                this.fadeOutActor.actions.fade(1, 1000, EasingFunctions.EaseInOutCubic).callMethod(() => {
                    engine.selectedPlayer = 'player2';
                    engine.goToScene('villaBaobab');
                });
            } else if (engine.input.keyboard.wasPressed(Keys.D) || engine.input.keyboard.wasPressed(Keys.Right)) {
                console.log("Player3 selected");
                this.fadeOutActor.actions.fade(1, 1000, EasingFunctions.EaseInOutCubic).callMethod(() => {
                    engine.selectedPlayer = 'player3';
                    engine.goToScene('villaBaobab');
                });
            }
        });
    }
    selectplayerAndGoToLevel(engine, playerKey) {
        engine.selectedPlayer = playerKey;
        engine.goToScene('villaBaobab');
    }
}
