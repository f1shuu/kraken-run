var VictoryScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

        function VictoryScene() { Phaser.Scene.call(this, { key: 'victoryscene' }); },

    init: function (data)
    {
        this.nextScene = data.nextScene
        
    },
    preload: function () { },

    create: function () {
        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.victoryMusic = this.sound.add('win');
        this.victoryMusic.play();
        let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'victory');
        let scaleX = this.cameras.main.width / image.width;
        let scaleY = this.cameras.main.height / image.height;
        let scale = Math.max(scaleX, scaleY);
        image.setScale(scale).setScrollFactor(0);
        this.buttonNextLevel = this.addButton(1920 / 2, 1080 / 2 + 60, 'buttons', this.doNextLevel, this, 'next_level_hl', 'next_level', 'next_level_hl', 'next_level');
        this.buttonMainMenu = this.addButton(1920 / 2, 1080 / 2 + 160, 'buttons', this.doMainMenu, this, 'main_menuWIN_hl', 'main_menuWIN', 'main_menuWIN_hl', 'main_menuWIN');

        this.buttonSound = this.sound.add('button');
    },

    doNextLevel: function () {
        this.buttonNextLevel.disableInteractive();
        this.victoryMusic.stop();
        this.buttonSound.play();
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start(this.nextScene)
        });
    },

    doMainMenu: function () {
        this.buttonMainMenu.disableInteractive();
        this.victoryMusic.stop();
        this.buttonSound.play();
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('menuscene');
        });
    }
});

