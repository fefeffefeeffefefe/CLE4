import { Actor, Vector, CollisionType, Timer } from "excalibur";

export class Enemy extends Actor {
    constructor(sprite, x, y, width, height, identifier) {
        super({
            pos: new Vector(x, y),
            collisionType: CollisionType.Passive, // Set collision type if needed
            width: width,
            height: height
        });
        this.graphics.use(sprite);
        this.identifier = identifier; // Add an identifier property


        this.speed = 50; // Define the speed of the enemy
        this.direction = new Vector(0, 0); // Initialize direction vector

        // Set up a timer to change direction every 1-3 seconds
        this.changeDirectionTimer = new Timer({
            fcn: () => this.changeDirection(),
            interval: 1000 + Math.random() * 2000,
            repeats: true
        });
    }

    onInitialize(engine) {
        engine.add(this.changeDirectionTimer);
        this.changeDirectionTimer.start();
    }

    changeDirection() {
        // Generate a random direction
        const angle = Math.random() * 2 * Math.PI; // Random angle in radians
        this.direction = new Vector(Math.cos(angle), Math.sin(angle)).scale(this.speed);
    }

    onPreUpdate(engine, delta) {
        this.vel = this.direction;
    }
}

export class StaticEnemy extends Actor {
    constructor(sprite, x, y, identifier) {
        super({
            pos: new Vector(x, y),
        });
        this.graphics.use(sprite);
        this.identifier = identifier; // Add an identifier property
        // Set health based on the identifier
        if (identifier === "incinerose") {
            this.health = 200;
        } else if (identifier === "chomperdaisy") {
            this.health = 100;
        }
    }
    
    attack(player) {
        const damage = Math.floor(Math.random() * 20) + 1; // Random damage between 1 and 20
        player.takeDamage(damage);
    }

}