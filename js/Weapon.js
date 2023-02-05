class Torpedo extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) { super(scene, x, y, 'torpedo'); }

    fire(x, y) {
        this.body.reset(x, y);
        this.setScale(1.4)
        this.setSize(80, 26);
        this.setActive(true);
        this.setVisible(true);
        this.enableBody();
        this.setVelocityX(-1400);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if (this.x < - 200) this.destroy();
    }
}

class Torpedoes extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);
        this.createMultiple({
            frameQuantity: 1,
            setXY:
            {
                x: -1000,
                y: 1000
            },
            key: 'torpedo',
            active: false,
            visible: false,
            classType: Torpedo
        });
    }
    fireTorpedo(x, y) {
        let torpedo = this.getFirstDead(true);
        if (torpedo) torpedo.fire(x, y);
    }
}

class Bomb extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) { super(scene, x, y, 'bomb'); }

    drop(x, y) {
        this.body.reset(x, y);
        this.setScale(0.12);
        this.setSize(360, 560).setOffset(65, -130);
        this.setActive(true);
        this.setVisible(true);
        this.enableBody();
        this.setVelocityY(1000);
        this.setAngle(270);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if (this.y > config.height + 200) this.destroy();
    }
}

class Bombs extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);
        this.createMultiple({
            frameQuantity: 1,
            setXY:
            {
                x: -1000,
                y: 1000
            },
            key: 'bomb',
            active: false,
            visible: false,
            classType: Bomb
        });
    }
    dropBomb(x, y) {
        let bomb = this.getFirstDead(true);
        if (bomb) bomb.drop(x, y);
    }
}

