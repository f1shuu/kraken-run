nextScene = 'level3scene';
var Level2Scene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize:

    function Level2Scene() { Phaser.Scene.call(this, { key: 'level2scene' }); },

  preload: function () { },

  create: function () {
    this.cameras.main.fadeIn(500, 0, 0, 0)
    cursors = this.input.keyboard.createCursorKeys();
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.level2_music = this.sound.add("level1_theme");
    var musicConfig = {
      mute: 0,
      volume: 0.6,
      seek: 0,
      loop: true,
      delay: 0
    };
    this.level2_music.play(musicConfig);

    this.buttonSound = this.sound.add('button');
    this.expl = this.sound.add('expl');

    this.FadeActive = false;
    this.StopCounter = false;

    bgParallax1 = this.add.tileSprite(1920 / 2, 1080 / 2, config.width, config.height - 200, 'bg_level1_1');
    bgParallax2 = this.add.tileSprite(1920 / 2, 1080 / 2, config.width, config.height - 200, 'bg_level1_2');
    bgParallax3 = this.add.tileSprite(1920 / 2, 1080 / 2, config.width, config.height - 200, 'bg_level1_3');
    bgParallax4 = this.add.tileSprite(1920 / 2, 1080 / 2, config.width, config.height - 200, 'bg_level1_4');

    this.add.image(config.width / 2, 50, 'metalTexture');
    this.add.image(config.width / 2, config.height - 50, 'metalTexture');
    this.add.image(155, config.height - 45, 'o2Icon').setScale(1.4);
    this.add.image(config.width / 2, config.height - 45, 'skullIcon').setScale(1.4);
    this.add.image(config.width - 85, config.height - 45, 'bombIcon').setScale(2.25);

    this.buttonQuit = this.addButton(1890, 30, 'sprites', this.doBack, this, 'close_hl', 'close', 'close_hl', 'close');

    this.player = this.physics.add.sprite(1920 / 2 + 800, 1080 / 2 - 400, 'player').setCollideWorldBounds(true);
    this.player.play('player_animation', true);

    this.player.flipX = true;
    this.player.setSize(80, 54).setOffset(10, 10);

    this.bombCount = 15;
    this.EnemiesToKillCount = 10;
    this.PlayerCooldown = 25;
    this.ScoreCount = 0;
    this.Oxygen = 3000;

    this.bombs = new Bombs(this);
    this.enemies = this.add.group();

    this.time.addEvent({
      delay: 800,
      callback: function () {
        var enemy2 = null;
        var enemy3 = null;

        if (Phaser.Math.Between(0, 1000) >= 500) {
          enemy2 = new Enemy2(
            this,
            -500,
            Phaser.Math.Between(700, this.game.config.height - 180)
          );
        }
        else {
          enemy3 = new Enemy3(
            this,
            this.game.config.width + 500,
            Phaser.Math.Between(700, this.game.config.height - 180)
          );

        }
        if (enemy2 !== null) this.enemies.add(enemy2);
        if (enemy3 !== null) this.enemies.add(enemy3);
      },
      callbackScope: this,
      loop: true
    });

    this.physics.add.overlap(this.bombs, this.enemies, this.bombHitsEnemy, null, this);

    this.add.text(32, 16, 'Level: 2', { fontSize: '72px', fill: '#ffffff', fontFamily: 'pixel_font' })

    this.ScoreText = this.add.text(1420, 16, 'Score: ' + this.ScoreCount, {
      fontSize: '72px',
      fill: '#ffffff',
      fontFamily: 'pixel_font'
    });
    this.ScoreText.setDepth(1);

    this.OxygenText = this.add.text(120, config.height - 85, this.Oxygen, {
      fontSize: '72px',
      fill: '#ffffff',
      fontFamily: 'pixel_font'
    });
    this.OxygenText.setDepth(1);

    this.BombCountText = this.add.text(config.width - 115, config.height - 85, this.bombCount, {
      fontSize: '72px',
      fill: '#ffffff',
      fontFamily: 'pixel_font'
    });
    this.BombCountText.setDepth(1);

    this.EnemiesToKillText = this.add.text(config.width / 2 - 10, config.height - 85, this.EnemiesToKillCount, {
      fontSize: '72px',
      fill: '#ffffff',
      fontFamily: 'pixel_font'
    });
    this.EnemiesToKillText.setDepth(1);
  },

  update: function () {
    this.checkOxygen();
    if (this.PlayerCooldown < 25) this.PlayerCooldown++;
    if (this.PlayerCooldown == 25 && cursors.space.isDown && this.bombCount > 0) {
      this.bombs.dropBomb(this.player.x - 50, this.player.y + 50);
      this.PlayerCooldown = 0;
      this.bombCount--;
      
      if (!this.StopCounter) {
        if (this.bombCount <= this.EnemiesToKillCount + 5) this.BombCountText.setTint(0xff0000);
        this.BombCountText.setText(this.bombCount);
        if (this.bombCount < this.EnemiesToKillCount) {
          this.time.delayedCall(1500, this.checkBombCount, null, this);
        }
      }
    }
    if (cursors.left.isDown || this.keyA.isDown) this.player.setVelocityX(-700);
    else if (cursors.right.isDown || this.keyD.isDown) this.player.setVelocityX(800);
    else this.player.setVelocityX(0);
  },

  bombHitsEnemy(enemy, bomb) {
    this.expl.play()
    enemy.disableBody()
    enemy.explode();
    bomb.destroy();
    this.ScoreCount += 100;
    this.ScoreText.setText('Score: ' + this.ScoreCount);
    this.EnemiesToKillCount--;
    this.EnemiesToKillText.setText(this.EnemiesToKillCount);
    if (this.EnemiesToKillCount === 0) this.YouWon();
  },

  checkOxygen() {
    if (!this.StopCounter) {
      if (this.Oxygen !== 0) {
        if (this.Oxygen < 1000) this.OxygenText.setTint(0xff0000);
        this.Oxygen--;
        this.OxygenText.setText(this.Oxygen);
      }
      else {
        this.events.once('NoOxygen', this.YouLost, this);
        this.events.emit('NoOxygen');
      }
    }
  },
  checkBombCount(){
    if(this.bombCount < this.EnemiesToKillCount)
    this.YouLost();
  },

  YouLost() {
    if (!this.FadeActive) {
      this.buttonQuit.disableInteractive();
      this.StopCounter = true;
      this.FadeActive = true;
      this.physics.pause();
      this.level2_music.stop();
      this.player.setTint(0xff0000);
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        this.scene.start('gameoverscene', { currentScene: 'level2scene' });
      });
    }
  },

  YouWon() {
    if (!this.FadeActive) {
      this.buttonQuit.disableInteractive();
      this.StopCounter = true;
      this.FadeActive = true;
      this.physics.pause();
      this.level2_music.stop();
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        this.scene.start('victoryscene', { nextScene: 'level3scene' });
      });
    }
  },

  doBack: function () {
    this.buttonQuit.disableInteractive();
    this.level2_music.stop();
    this.buttonSound.play();
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
      this.scene.start('menuscene');
    });
  }
});