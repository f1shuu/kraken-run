var ClickScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

        function ClickScene() { Phaser.Scene.call(this, { key: 'clickscene' }); },

    preload: function () { },

    create: function () {
        let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'click_screen');
        let scaleX = this.cameras.main.width / image.width;
        let scaleY = this.cameras.main.height / image.height;
        let scale = Math.max(scaleX, scaleY);
        image.setScale(scale).setScrollFactor(0);

        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.buttonStart = this.addButton(1920 / 2, 1080 / 2, 'sprites', this.doStart, this, 'play_hl', 'play', 'play_hl', 'play');
        this.buttonStart.setScale(2, 2);
    },

    doStart: function () {
        this.buttonStart.disableInteractive();
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('menuscene');
        });
    }
});