var Level4Scene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize:

    function Level4Scene() { Phaser.Scene.call(this, { key: 'level4scene' }); },

  preload: function () { },

  create: function () {
    this.cameras.main.fadeIn(500, 0, 0, 0)
    cursors = this.input.keyboard.createCursorKeys();
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.level4_music = this.sound.add("level1_theme");
    var musicConfig = {
      mute: 0,
      volume: 0.6,
      seek: 0,
      loop: true,
      delay: 0
    };
    this.level4_music.play(musicConfig);

    this.buttonSound = this.sound.add('button');
    this.expl = this.sound.add('expl');
    this.diverSaved = this.sound.add('coin');

    this.FadeActive = false;
    this.StopCounter = false;

    bgParallax1 = this.add.tileSprite(1920 / 2, 1080 / 2, config.width, config.height - 200, 'bg_level1_1');
    bgParallax2 = this.add.tileSprite(1920 / 2, 1080 / 2, config.width, config.height - 200, 'bg_level1_2');
    bgParallax3 = this.add.tileSprite(1920 / 2, 1080 / 2, config.width, config.height - 200, 'bg_level1_3');
    bgParallax4 = this.add.tileSprite(1920 / 2, 1080 / 2, config.width, config.height - 200, 'bg_level1_4');

    this.add.image(config.width / 2, 50, 'metalTexture');
    this.add.image(config.width / 2, config.height - 50, 'metalTexture');
    this.add.image(155, config.height - 45, 'lifeIcons', 'threeLives').setScale(1.4);
    this.add.image(config.width / 2 - 325, config.height - 45, 'o2Icon').setScale(1.4);
    this.add.image(config.width / 2 + 175, config.height - 50, 'torpedoIcon').setScale(1.4);
    this.add.image(config.width - 250, config.height - 45, 'diverIcons', 'zeroDivers').setScale(1.4);


    this.buttonQuit = this.addButton(1890, 30, 'sprites', this.doBack, this, 'close_hl', 'close', 'close_hl', 'close');

    this.player = this.physics.add.sprite(1920 / 2 + 800, 1080 / 2 - 400, 'player').setCollideWorldBounds(true);;
    this.physics.world.setBounds(0, 100, this.game.config.width, this.game.config.height - 200);
    this.player.play('player_animation', true);

    this.player.flipX = true;
    this.player.setSize(80, 54).setOffset(10, 10);

    this.torpedoCount = 50;
    this.PlayerCooldown = 25;
    this.ScoreCount = 0;
    this.LiveCount = 3;
    this.LostLife = false;
    this.CollisionTimer = 0;
    this.Oxygen = 5000;
    this.DiversSavedCount = 0;

    this.torpedoes = new Torpedoes(this);

    this.enemies = this.add.group();
    this.divers = this.add.group();

    this.time.addEvent({
      delay: 400,
      callback: function () {
        var enemy10 = null;
        var enemy11 = null;
        var diver2 = null;
        var spawnRate = null;
        if (this.Oxygen > 4000 && this.Oxygen <= 5000) {
          spawnRate = 0;
        }
        else if (this.Oxygen > 3000 && this.Oxygen <= 4000) {
          spawnRate = 30;
        }
        else if (this.Oxygen > 2000 && this.Oxygen <= 3000) {
          spawnRate = 60;
        }
        else if (this.Oxygen > 1000 && this.Oxygen <= 2000) {
          spawnRate = 100;
        }
        else {
          spawnRate = 150;
        }

        if (Phaser.Math.Between(0, 1000) >= spawnRate) {
          if (Phaser.Math.Between(0, 1000) >= 500) {
          enemy10 = new Enemy10(
            this,
            Phaser.Math.Between(-600, -400),
            Phaser.Math.Between(180, this.game.config.height - 180)
          );
          } else {
            enemy11 = new Enemy11(
              this,
              Phaser.Math.Between(-600, -400),
              Phaser.Math.Between(230, this.game.config.height - 230)
            );
          }
        }
        else {
          diver2 = new Diver2(
            this,
            -100,
            Phaser.Math.Between(180, this.game.config.height - 180)
          );
        }
        if (enemy10 !== null) this.enemies.add(enemy10);
        if (enemy11 !== null) this.enemies.add(enemy11);
        if (diver2 !== null) this.divers.add(diver2);
      },
      callbackScope: this,
      loop: true
    });

    this.physics.add.overlap(this.torpedoes, this.enemies, this.torpedoHitsEnemy, null, this);
    this.physics.add.overlap(this.player, this.enemies, this.playerHitsEnemy, null, this);
    this.physics.add.overlap(this.player, this.divers, this.playerSavesDiver, null, this);
    this.physics.add.overlap(this.divers, this.enemies, this.diverHitsEnemy, null, this);

    this.add.text(32, 16, 'Level: 4', { fontSize: '72px', fill: '#ffffff', fontFamily: 'pixel_font' })

    this.ScoreText = this.add.text(1420, 16, 'Score: ' + this.ScoreCount, {
      fontSize: '72px',
      fill: '#ffffff',
      fontFamily: 'pixel_font'
    });
    this.ScoreText.setDepth(1);

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
    if (cursors.left.isDown || this.keyA.isDown) this.player.setVelocityX(-600);
    else if (cursors.right.isDown || this.keyD.isDown) this.player.setVelocityX(700);
    else this.player.setVelocityX(0);
    if (cursors.up.isDown || this.keyW.isDown) this.player.setVelocityY(-600);
    else if (cursors.down.isDown || this.keyS.isDown) this.player.setVelocityY(600);
    else this.player.setVelocityY(0);

    bgParallax1.tilePositionX -= 2.5;
    bgParallax2.tilePositionX -= 5;
    bgParallax3.tilePositionX -= 7.5;
    bgParallax4.tilePositionX -= 10;
  },

  torpedoHitsEnemy(enemy, torpedo) {
    this.expl.play()
    enemy.disableBody()
    enemy.explode();
    torpedo.destroy();
    this.ScoreCount += 100;
    this.ScoreText.setText('Score: ' + this.ScoreCount);
  },

  playerHitsEnemy(player, enemy) {
    if (!this.LostLife) {
      enemy.disableBody();
      this.expl.play()
      enemy.explode()
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

  playerSavesDiver(player, diver) {
    this.diverSaved.play()
    diver.destroy();
    this.ScoreCount += 1000;
    this.ScoreText.setText('Score: ' + this.ScoreCount);
    this.DiversSavedCount++;
    if (this.DiversSavedCount === 1) {
      this.add.image(config.width - 250, config.height - 45, 'diverIcons', 'oneDiver').setScale(1.4);
    }
    else if (this.DiversSavedCount === 2) {
      this.add.image(config.width - 250, config.height - 45, 'diverIcons', 'twoDivers').setScale(1.4);
    }
    else if (this.DiversSavedCount === 3) {
      this.add.image(config.width - 250, config.height - 45, 'diverIcons', 'threeDivers').setScale(1.4);
    }
    else if (this.DiversSavedCount === 4) {
      this.add.image(config.width - 250, config.height - 45, 'diverIcons', 'fourDivers').setScale(1.4);
    }
    else {
      this.add.image(config.width - 250, config.height - 45, 'diverIcons', 'fiveDivers').setScale(1.4);
      this.YouWon()
    }
  },

  diverHitsEnemy(diver, enemy) {
    diver.disableBody();
    diver.die();
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
      this.buttonQuit.disableInteractive();
      this.StopCounter = true;
      this.FadeActive = true;
      this.physics.pause();
      this.level4_music.stop();
      this.player.setTint(0xff0000);
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        this.scene.start('gameoverscene', { currentScene: 'level4scene'});
      });
    }
  },

  YouWon() {
    if (!this.FadeActive) {
      this.buttonQuit.disableInteractive();
      this.StopCounter = true;
      this.FadeActive = true;
      this.physics.pause();
      this.level4_music.stop();
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        this.scene.start('victoryscene', { nextScene: 'level5scene'});
      });
    }
  },

  doBack: function () {
    this.buttonQuit.disableInteractive();
    this.level4_music.stop();
    this.buttonSound.play();
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
      this.scene.start('menuscene');
    });
  }
});