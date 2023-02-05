var LevelPickerScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

        function LevelPickerScene() { Phaser.Scene.call(this, { key: 'levelpickerscene' }); },

    preload: function () { },

    create: function () {
        this.cameras.main.fadeIn(500, 0, 0, 0);
        bg_menu1 = this.add.tileSprite(1920 / 2, 1080 / 2, config.width, config.height, 'bg_menu1');
        bg_menu2 = this.add.tileSprite(1920 / 2, 1080 / 2, config.width, config.height, 'bg_menu2');

        this.levelsMusic = this.sound.add("utilities_theme");
        var musicConfig = {
            mute: 0,
            volume: 0.6,
            seek: 0,
            loop: true,
            delay: 0
        };
        this.levelsMusic.play(musicConfig);

        this.level_1Button = this.addButton(1920 / 2 - 200, 1080 / 2 - 160, 'buttons', this.doLevel1, this, 'level_1_hl', 'level_1', 'level_1_hl', 'level_1');
        this.level_2Button = this.addButton(1920 / 2 - 200, 1080 / 2 - 80, 'buttons', this.doLevel2, this, 'level_2_hl', 'level_2', 'level_2_hl', 'level_2');
        this.level_3Button = this.addButton(1920 / 2 - 200, 1080 / 2, 'buttons', this.doLevel3, this, 'level_3_hl', 'level_3', 'level_3_hl', 'level_3');
        this.level_4Button = this.addButton(1920 / 2 - 200, 1080 / 2 + 80, 'buttons', this.doLevel4, this, 'level_4_hl', 'level_4', 'level_4_hl', 'level_4');
        this.level_5Button = this.addButton(1920 / 2 - 200, 1080 / 2 + 160, 'buttons', this.doLevel5, this, 'level_5_hl', 'level_5', 'level_5_hl', 'level_5');
        this.level_6Button = this.addButton(1920 / 2 + 200, 1080 / 2 - 160, 'buttons', this.doLevel6, this, 'level_6_hl', 'level_6', 'level_6_hl', 'level_6');
        this.level_7Button = this.addButton(1920 / 2 + 200, 1080 / 2 - 80, 'buttons', this.doLevel7, this, 'level_7_hl', 'level_7', 'level_7_hl', 'level_7');
        this.level_8Button = this.addButton(1920 / 2 + 200, 1080 / 2, 'buttons', this.doLevel8, this, 'level_8_hl', 'level_8', 'level_8_hl', 'level_8');
        this.level_9Button = this.addButton(1920 / 2 + 200, 1080 / 2 + 80, 'buttons', this.doLevel9, this, 'level_9_hl', 'level_9', 'level_9_hl', 'level_9');
        this.level_10Button = this.addButton(1920 / 2 + 200, 1080 / 2 + 160, 'buttons', this.doLevel10, this, 'level_10_hl', 'level_10', 'level_10_hl', 'level_10');

        this.buttonBack = this.addButton(400, 1080 / 2, 'sprites', this.doBack, this, 'back_hl', 'back', 'back_hl', 'back');

        this.buttonSound = this.sound.add('button');
    },

    update: function () {
        bg_menu1.tilePositionX -= 2;
        bg_menu2.tilePositionX -= 2;
    },

    doLevel1: function () {
        this.level_1Button.disableInteractive();
        this.level_2Button.disableInteractive();
        this.level_3Button.disableInteractive();
        this.level_4Button.disableInteractive();
        this.level_5Button.disableInteractive();
        this.level_6Button.disableInteractive();
        this.level_7Button.disableInteractive();
        this.level_8Button.disableInteractive();
        this.level_9Button.disableInteractive();
        this.level_10Button.disableInteractive();
        this.levelsMusic.stop();
        this.buttonSound.play();
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('level1scene');
        });
    },

    doLevel2: function () {
        this.level_1Button.disableInteractive();
        this.level_2Button.disableInteractive();
        this.level_3Button.disableInteractive();
        this.level_4Button.disableInteractive();
        this.level_5Button.disableInteractive();
        this.level_6Button.disableInteractive();
        this.level_7Button.disableInteractive();
        this.level_8Button.disableInteractive();
        this.level_9Button.disableInteractive();
        this.level_10Button.disableInteractive();
        this.levelsMusic.stop();
        this.buttonSound.play();
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('level2scene');
        });
    },

    doLevel3: function () {
        this.level_1Button.disableInteractive();
        this.level_2Button.disableInteractive();
        this.level_3Button.disableInteractive();
        this.level_3Button.disableInteractive();
        this.level_4Button.disableInteractive();
        this.level_6Button.disableInteractive();
        this.level_7Button.disableInteractive();
        this.level_8Button.disableInteractive();
        this.level_9Button.disableInteractive();
        this.level_10Button.disableInteractive();
        this.levelsMusic.stop();
        this.buttonSound.play();
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
             this.scene.start('level3scene');
         });
    },

    doLevel4: function () {
        this.level_1Button.disableInteractive();
        this.level_2Button.disableInteractive();
        this.level_3Button.disableInteractive();
        this.level_4Button.disableInteractive();
        this.level_5Button.disableInteractive();
        this.level_6Button.disableInteractive();
        this.level_7Button.disableInteractive();
        this.level_8Button.disableInteractive();
        this.level_9Button.disableInteractive();
        this.level_10Button.disableInteractive();
        this.levelsMusic.stop();
        this.buttonSound.play();
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
             this.scene.start('level4scene');
         });
    },

    doLevel5: function () {
        this.level_1Button.disableInteractive();
        this.level_2Button.disableInteractive();
        this.level_3Button.disableInteractive();
        this.level_4Button.disableInteractive();
        this.level_5Button.disableInteractive();
        this.level_6Button.disableInteractive();
        this.level_7Button.disableInteractive();
        this.level_8Button.disableInteractive();
        this.level_9Button.disableInteractive();
        this.level_10Button.disableInteractive();
        this.levelsMusic.stop();
        this.buttonSound.play();
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
             this.scene.start('level5scene');
         });
    },

    doLevel6: function () {
        this.level_1Button.disableInteractive();
        this.level_2Button.disableInteractive();
        this.level_3Button.disableInteractive();
        this.level_4Button.disableInteractive();
        this.level_5Button.disableInteractive();
        this.level_6Button.disableInteractive();
        this.level_7Button.disableInteractive();
        this.level_8Button.disableInteractive();
        this.level_9Button.disableInteractive();
        this.level_10Button.disableInteractive();
        this.levelsMusic.stop();
        this.buttonSound.play();
        this.cameras.main.fadeOut(500, 0, 0, 0);
         this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
             this.scene.start('level6scene');
         });
    },

    doLevel7: function () {
        this.level_1Button.disableInteractive();
        this.level_2Button.disableInteractive();
        this.level_3Button.disableInteractive();
        this.level_4Button.disableInteractive();
        this.level_5Button.disableInteractive();
        this.level_6Button.disableInteractive();
        this.level_7Button.disableInteractive();
        this.level_8Button.disableInteractive();
        this.level_9Button.disableInteractive();
        this.level_10Button.disableInteractive();
        this.levelsMusic.stop();
        this.buttonSound.play();
        this.cameras.main.fadeOut(500, 0, 0, 0);
         this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
             this.scene.start('level7scene');
         });
    },

    doLevel8: function () {
        this.level_1Button.disableInteractive();
        this.level_2Button.disableInteractive();
        this.level_3Button.disableInteractive();
        this.level_4Button.disableInteractive();
        this.level_5Button.disableInteractive();
        this.level_6Button.disableInteractive();
        this.level_7Button.disableInteractive();
        this.level_8Button.disableInteractive();
        this.level_9Button.disableInteractive();
        this.level_10Button.disableInteractive();
        this.levelsMusic.stop();
        this.buttonSound.play();
        this.cameras.main.fadeOut(500, 0, 0, 0);
         this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
             this.scene.start('level8scene');
         });
    },

    doLevel9: function () {
        this.level_1Button.disableInteractive();
        this.level_2Button.disableInteractive();
        this.level_3Button.disableInteractive();
        this.level_4Button.disableInteractive();
        this.level_5Button.disableInteractive();
        this.level_6Button.disableInteractive();
        this.level_7Button.disableInteractive();
        this.level_8Button.disableInteractive();
        this.level_9Button.disableInteractive();
        this.level_10Button.disableInteractive();
        this.levelsMusic.stop();
        this.buttonSound.play();
        this.cameras.main.fadeOut(500, 0, 0, 0);
         this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
             this.scene.start('level9scene');
         });
    },

    doLevel10: function () {
        this.level_1Button.disableInteractive();
        this.level_2Button.disableInteractive();
        this.level_3Button.disableInteractive();
        this.level_4Button.disableInteractive();
        this.level_5Button.disableInteractive();
        this.level_6Button.disableInteractive();
        this.level_7Button.disableInteractive();
        this.level_8Button.disableInteractive();
        this.level_9Button.disableInteractive();
        this.level_10Button.disableInteractive();
        this.levelsMusic.stop();
        this.buttonSound.play();
        this.cameras.main.fadeOut(500, 0, 0, 0);
         this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
             this.scene.start('level10scene');
         });
    },

    doBack: function () {
        this.buttonBack.disableInteractive();
        this.levelsMusic.stop();
        this.buttonSound.play();
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('menuscene');
        });
    }
});