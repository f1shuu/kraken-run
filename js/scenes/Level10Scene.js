var Level10Scene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize:

    function Level8Scene() { Phaser.Scene.call(this, { key: 'level10scene' }); },

  preload: function () { },

  create: function () {
    this.cameras.main.fadeIn(500, 0, 0, 0)
    cursors = this.input.keyboard.createCursorKeys();
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    this.level10_music = this.sound.add("level4_theme");
      var musicConfig = {
        mute: 0,
        volume: 0.4,
        seek: 0,
        loop: true,
        delay: 0
      };
      this.level10_music.play(musicConfig);

    this.buttonSound = this.sound.add('button');
    this.expl = this.sound.add('expl');
    this.diverSaved = this.sound.add('coin');

    this.FadeActive = false;
    this.StopCounter = false;

    bgParallax1 = this.add.tileSprite(1920 / 2, 1080 / 2, config.width, config.heigh - 200, 'bg_level4_1');
    bgParallax2 = this.add.tileSprite(1920 / 2, 1080 / 2, config.width, config.height - 200, 'bg_level4_2');
    bgParallax3 = this.add.tileSprite(1920 / 2, 1080 / 2, config.width, config.height - 200, 'bg_level4_3');
    bgParallax4 = this.add.tileSprite(1920 / 2, 1080 / 2, config.width, config.height - 200, 'bg_level4_4');

    this.add.image(config.width / 2, 50, 'metalTexture');
    this.add.image(config.width / 2, config.height - 50, 'metalTexture');
    this.add.image(155, config.height - 45, 'lifeIcons', 'threeLives').setScale(1.4);
    this.add.image(config.width / 2 - 325, config.height - 45, 'o2Icon').setScale(1.4);
    this.add.image(config.width / 2 + 175, config.height - 50, 'torpedoIcon').setScale(1.4);


    this.buttonQuit = this.addButton(1890, 30, 'sprites', this.doBack, this, 'close_hl', 'close', 'close_hl', 'close');

    this.player = this.physics.add.sprite(1920 / 2 + 800, 1080 / 2 - 400, 'player').setCollideWorldBounds(true);;
    this.physics.world.setBounds(0, 100, this.game.config.width, this.game.config.height - 200);
    this.player.play('player_animation', true);

    this.player.flipX = true;
    this.player.setSize(80, 54).setOffset(10, 10);

    this.torpedoCount = 100;
    this.PlayerCooldown = 25;
    this.LiveCount = 3;
    this.LostLife = false;
    this.CollisionTimer = 0;
    this.Oxygen = 6000;
    this.KrakenHealth = 50;

    this.torpedoes = new Torpedoes(this);

    this.enemies = this.add.group();

        var enemy20 = null;
    
            enemy20 = new Enemy20(
              this,
              Phaser.Math.Between(-600, -400),
              Phaser.Math.Between(580, this.game.config.height - 580)
            );
            
        if (enemy20 !== null) this.enemies.add(enemy20);
  
 

    this.physics.add.overlap(this.torpedoes, this.enemies, this.torpedoHitsEnemy, null, this);
    this.physics.add.overlap(this.player, this.enemies, this.playerHitsEnemy, null, this);

    this.add.text(32, 16, 'Level: 10', { fontSize: '72px', fill: '#ffffff', fontFamily: 'pixel_font' })

    this.TorpedoCountText = this.add.text(config.width / 2 + 190, config.height - 85, this.torpedoCount, {
      fontSize: '72px',
      fill: '#ffffff',
      fontFamily: 'pixel_font'
    });
    this.TorpedoCountText.setDepth(1);

    this.OxygenText = this.add.text(config.width / 2 - 360, config.height - 85, this.Oxygen, {
      fontSize: '72px',
      fill: '#ffffff',
      fontFamily: 'pixel_font'
    });
    this.TorpedoCountText.setDepth(1);
  },


  update: function () {
    this.checkOxygen();
    this.checkCollisionProtection();
    if (this.PlayerCooldown < 25) this.PlayerCooldown++;

    if (this.PlayerCooldown == 25 && cursors.space.isDown && this.torpedoCount > 0) {
      this.torpedoes.fireTorpedo(this.player.x - 100, this.player.y);
      this.PlayerCooldown = 0;
      this.torpedoCount--;
      if (this.torpedoCount === 0) this.TorpedoCountText.setTint(0xff0000);
      this.TorpedoCountText.setText(this.torpedoCount);
    }
    if (cursors.left.isDown || this.keyA.isDown) this.player.setVelocityX(-1000);
    else if (cursors.right.isDown || this.keyD.isDown) this.player.setVelocityX(1100);
    else this.player.setVelocityX(0);
    if (cursors.up.isDown || this.keyW.isDown) this.player.setVelocityY(-1000);
    else if (cursors.down.isDown || this.keyS.isDown) this.player.setVelocityY(1000);
    else this.player.setVelocityY(0);

    bgParallax1.tilePositionX -= 2.5;
    bgParallax2.tilePositionX -= 5;
    bgParallax3.tilePositionX -= 7.5;
    bgParallax4.tilePositionX -= 10;
  },

  torpedoHitsEnemy(enemy, torpedo) {
    this.expl.play()
    torpedo.destroy();
    this.KrakenHealth --;
    console.log(this.KrakenHealth)
    if(this.KrakenHealth === 0){
    enemy.disableBody()
    enemy.explode();
    this.YouWon();
    }
  },

  playerHitsEnemy(player, enemy) {
    if (!this.LostLife) {
      this.expl.play()
    }
    if (this.CollisionTimer === 0) {
      this.LiveCount--;
      if (this.LiveCount === 2) {
        this.add.image(155, config.height - 45, 'lifeIcons', 'twoLives').setScale(1.4);
      }
      else if (this.LiveCount === 1) {
        this.add.image(155, config.height - 45, 'lifeIcons', 'oneLife').setScale(1.4);
      }
      else {
        this.add.image(155, config.height - 45, 'lifeIcons', 'zeroLives').setScale(1.4);
      }

      this.LostLife = true;
      if (this.LiveCount === 0) this.YouLost();
      else this.player.setPosition(1920 / 2 + 800, 1080 / 2 - 400);
    }
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
  checkCollisionProtection() {
    if (this.CollisionTimer <= 100 && this.LostLife) {
      this.CollisionTimer++;
      this.player.setTint(0xff0000);
      if (this.CollisionTimer === 100) {
        this.LostLife = false;
        this.CollisionTimer = 0;
        this.player.clearTint()
      }
    }
  },


  YouLost() {
    if (!this.FadeActive) {
      this.StopCounter = true;
      this.FadeActive = true;
      this.physics.pause();
      this.level10_music.stop();
      this.player.setTint(0xff0000);
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        this.scene.start('gameoverscene', { currentScene: 'level10scene' });
      });
    }
  },

  YouWon() {
    if (!this.FadeActive) {
      this.StopCounter = true;
      this.FadeActive = true;
      this.physics.pause();
      this.level10_music.stop();
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        this.scene.start('victoryscene', { nextScene: 'level1scene' });
      });
    }
  },


  doBack: function () {
    this.buttonQuit.disableInteractive();
    this.level10_music.stop();
    this.buttonSound.play();
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
      this.scene.start('menuscene');
    });
  }
});