var TutorialScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

        function TutorialScene() { Phaser.Scene.call(this, { key: 'tutorialscene' }); },

    preload: function () { },

    create: function () {
        this.cameras.main.fadeIn(500, 0, 0, 0);
        let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'tutorial_screen');
        let scaleX = this.cameras.main.width / image.width;
        let scaleY = this.cameras.main.height / image.height;
        let scale = Math.max(scaleX, scaleY);
        image.setScale(scale).setScrollFactor(0);

        this.tutorialMusic = this.sound.add("utilities_theme");
        var musicConfig = {
            mute: 0,
            volume: 0.6,
            seek: 0,
            loop: true,
            delay: 0
        };
        this.tutorialMusic.play(musicConfig);
        this.buttonSound = this.sound.add('button');
        this.buttonBack = this.addButton(400, 1080 / 2, 'sprites', this.doBack, this, 'back_hl', 'back', 'back_hl', 'back');
    },

    doBack: function () {
        this.buttonBack.disableInteractive();
        this.tutorialMusic.stop();
        this.buttonSound.play();
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('menuscene');
        });
    }
});