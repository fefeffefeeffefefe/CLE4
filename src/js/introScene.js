import { Actor, Scene, Vector, Color, Label, Font, Keys, Timer, EasingFunctions } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Background } from "./background.js";

export class IntroScene extends Scene {
    onInitialize(engine) {
        this.background = new Background(Resources.BridgeHome.toSprite(), 750, 370, 0.8, 0.5);
        this.add(this.background);

        this.scrollSpeed = 50; // Pixels per second (Put back to 30)
        this.labels = [];
        this.scrollingComplete = false;

        const storyText = [
            "*Under a bridge in Hefpark...*",
            "",
            "You wake up in your cardboard box",
            "from someone poking you.",
            "You open your eyes and see it's professor Baobab.",
            "",
            "Professor Baobab is a known Critter researcher,",
            "but he isn't that great in combat, so his",
            "research is limited.",
            "",
            "The professor asks you to work for him",
            "as you don't have money and live in a cardboard box.",
            "You think about it and decide to take him up on his offer",
            "as you want to better your life.",
            "The professor tells you to take your stuff and to",
            "come with him to his lab as he has a surprise for you",
            "for working for him.",
            "",
            "You follow him to his lab...",
            ""
        ];

        storyText.forEach((text, index) => {
            const label = new Label({
                text: text,
                pos: new Vector(400, 720 + index * 50), // Text starts below the screen.
                font: new Font({
                    family: 'Arial',
                    size: 24,
                    color: Color.White
                })
            });

            this.labels.push(label);
            this.add(label);
        });

        this.continueLabel = new Label({
            text: "Press ENTER to continue",
            pos: new Vector(400, 360), // Text in the middle of the screen.
            font: new Font({
                family: 'Arial',
                size: 24,
                color: Color.White
            }),
            visible: false
        });

        // Timer to show the "Press ENTER to continue" label after the text scrolling is done.
        const totalScrollTime = (720 + storyText.length * 50) / this.scrollSpeed;
        this.timer = new Timer({
            fcn: () => {
                console.log('SKKKRT Showing "Press ENTER to continue".');
                this.continueLabel.visible = true;
            },
            interval: totalScrollTime * 1000, // Convert seconds to milliseconds
            repeats: false
        });

        this.add(this.timer);
        this.timer.start();

        this.add(this.continueLabel);

        // Create the fade-out actor
        this.fadeOutActor = new Actor({
            pos: new Vector(640, 360),
            width: 1280,
            height: 720,
            color: Color.Black,
            opacity: 0
        });
        this.add(this.fadeOutActor);
    }

    update(engine, delta) {
        super.update(engine, delta);

        if (!this.scrollingComplete) {
            // Creates scrolling effect.
            this.labels.forEach(label => {
                label.pos.y -= this.scrollSpeed * (delta / 1000); // Uses delta in seconds
            });

            // Checks if the scrolling is complete.
            if (this.labels[this.labels.length - 1].pos.y <= 80) {
                this.scrollingComplete = true;
                console.log('SKKKRT Scrolling complete.');
            }
        } else if (!this.continueLabel.visible) {
            this.continueLabel.visible = true; // Ensures visibility is set
            console.log('SKKKRT Showing "Press ENTER to continue" visibility is set.');
        }

        if (/*this.continueLabel.visible &&*/ engine.input.keyboard.wasPressed(Keys.Enter)) {
            this.fadeOutActor.actions.fade(1, 1000, EasingFunctions.EaseInOutCubic).callMethod(() => {
                engine.goToScene('selectScene');
            });
        }
    }
}
