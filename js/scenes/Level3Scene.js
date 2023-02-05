var Level3Scene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
  
      function Level3Scene() { Phaser.Scene.call(this, { key: 'level3scene' }); },
  
    preload: function () { },
  
    create: function () {
      this.cameras.main.fadeIn(500, 0, 0, 0)
      cursors = this.input.keyboard.createCursorKeys();
      this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      this.level3_music = this.sound.add("level1_theme");
      var musicConfig = {
        mute: 0,
        volume: 0.6,
        seek: 0,
        loop: true,
        delay: 0
      };
      this.level3_music.play(musicConfig);
  
      this.buttonSound = this.sound.add('button');
      this.expl = this.sound.add('expl');
  
      this.FadeActive = false;
      this.StopCounter = false;
  
      bgParallax1 = this.add.tileSprite(1920 / 2, 1080 / 2 , config.width, config.height - 200, 'bg_mine1');
      bgParallax2 = this.add.tileSprite(1920 / 2, 1080 / 2 , config.width, config.height - 200, 'bg_mine2');



      this.add.image(config.width / 2, 50, 'metalTexture');
      this.add.image(config.width / 2, config.height - 50, 'metalTexture');
      this.add.image(155, config.height - 45, 'lifeIcons', 'threeLives').setScale(1.4);
      this.add.image(config.width - 110, config.height - 47, 'timeIcon').setScale(1.4);
  
      this.buttonQuit = this.addButton(1890, 30, 'sprites', this.doBack, this, 'close_hl', 'close', 'close_hl', 'close');
  
      this.player = this.physics.add.sprite(1920 / 2 - 800, 1080 / 2 - 400, 'player').setCollideWorldBounds(true);;
      this.physics.world.setBounds(0, 100, this.game.config.width, this.game.config.height - 200);
      this.player.play('player_animation', true);
  
      this.player.flipX = false;
      this.player.setSize(80, 54).setOffset(110, 10);
  
      this.LiveCount = 3;
      this.LostLife = false;
      this.CollisionTimer = 0;
      this.TimeToSurvive = 3000;
  
  
      this.mines = this.add.group();

      this.time.addEvent({
        delay: 300,
        callback: function () {
          var mine = null;
          var yPos = Phaser.Math.Between(180, this.game.config.height - 180)
          if (Phaser.Math.Between(0, 1000) >= 100){
            mine = new Mine(
              this,
              this.game.config.width + 500,
              yPos
            );
            }
          
          if (mine !== null) this.mines.add(mine);
          
        },
        callbackScope: this,
        loop: true
      });
  
      this.physics.add.overlap(this.player, this.mines, this.playerHitsMine, null, this);

      this.add.text(10, 10, 'Level: 3', { fontSize: '72px', fill: '#ffffff', fontFamily: 'pixel_font' })
  
      this.TimeToSurviveText = this.add.text(config.width - 115, config.height - 85, ((this.TimeToSurvive / 100 + "").slice(0, 2)), {
        fontSize: '72px',
        fill: '#ffffff',
        fontFamily: 'pixel_font'
      });
      this.TimeToSurviveText.setDepth(1);
    },
  
  
    update: function () {
      this.checkTimeToSurvive();
      this.checkCollisionProtection();
      
      if (cursors.left.isDown || this.keyA.isDown) this.player.setVelocityX(-600);
      else if (cursors.right.isDown || this.keyD.isDown) this.player.setVelocityX(500);
      else this.player.setVelocityX(0);
      if (cursors.up.isDown || this.keyW.isDown) this.player.setVelocityY(-500);
      else if (cursors.down.isDown || this.keyS.isDown) this.player.setVelocityY(500);
      else this.player.setVelocityY(0);
  
      bgParallax1.tilePositionX += 4;
      bgParallax2.tilePositionX += 8;
    },
 
 playerHitsMine(player, mine) {
    if (!this.LostLife) {
      mine.disableBody();
      this.expl.play()
      mine.explode()
    }
    if (this.CollisionTimer === 0) {
      this.LiveCount--;
      this.LostLife = true;
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
      else this.player.setPosition(1920 / 2 - 800, 1080 / 2 - 400);
    }
  },
  
 
    checkTimeToSurvive() {
      if (!this.StopCounter) {
        if (this.TimeToSurvive !== 99) {
          this.TimeToSurvive--;
          if(this.TimeToSurvive >= 1000){
          var time = (this.TimeToSurvive /100 + "").slice(0, 2);
          }
          else{
            var time = (this.TimeToSurvive /100 + "").slice(0, 1);
          }
          this.TimeToSurviveText.setText(time);
        }
        else {
          this.events.once('NoTime', this.YouWon, this);
          this.events.emit('NoTime');
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
        this.level3_music.stop();
        this.player.setTint(0xff0000);
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
          this.scene.start('gameoverscene', { currentScene: 'level3scene'});
        });
      }
    },
  
    YouWon() {
      if (!this.FadeActive) {
        this.buttonQuit.disableInteractive();
        this.StopCounter = true;
        this.FadeActive = true;
        this.physics.pause();
        this.level3_music.stop();
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
          this.scene.start('victoryscene', { nextScene: 'level4scene'});
        });
      }
    },
  
  
    doBack: function () {
      this.buttonQuit.disableInteractive();
      this.level3_music.stop();
      this.buttonSound.play();
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        this.scene.start('menuscene');
      });
    }
  });