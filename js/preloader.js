function loadFont(name, url) {
	var newFont = new FontFace(name, `url(${url})`);
	newFont.load().then(function (loaded) {
		document.fonts.add(loaded);
	}).catch(function (error) {
		return error;
	});
}
var Preloader = new Phaser.Class({
	Extends: Phaser.Scene,

	initialize:

		function Preloader() {
			Phaser.Scene.call(this, {
				key: 'preloader',
				pack: {
					files: [
						{ type: 'image', key: 'loading_screen', url: 'assets/img/loading_screen.png' },
						{ type: 'image', key: 'loadingbar_bg', url: 'assets/img/loadingbar_bg.png' },
						{ type: 'image', key: 'loadingbar_fill', url: 'assets/img/loadingbar_fill.png' }
					]
				}
			});
		},

	setPreloadSprite: function (sprite) {
		this.input.setDefaultCursor('url(assets/img/cursor.cur), pointer');
		this.preloadSprite = { sprite: sprite, width: sprite.width, height: sprite.height };
		sprite.visible = true;

		this.load.on('progress', this.onProgress, this);
		this.load.on('fileprogress', this.onFileProgress, this);
	},

	onProgress: function (value) {
		if (this.preloadSprite) {
			var w = Math.floor(this.preloadSprite.width * value);

			this.preloadSprite.sprite.frame.width = (w <= 0 ? 1 : w);
			this.preloadSprite.sprite.frame.cutWidth = w;

			this.preloadSprite.sprite.frame.updateUVs();
		}
	},

	onFileProgress: function (file) { },

	preload: function () {
		loadFont('pixel_font', 'assets/fnt/pixel_font.ttf');
		let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'loading_screen');
		let scaleX = this.cameras.main.width / image.width;
		let scaleY = this.cameras.main.height / image.height;
		let scale = Math.max(scaleX, scaleY);
		image.setScale(scale).setScrollFactor(0);

		this.loadingbar_bg = this.add.sprite(1920 / 2, 1080 / 2, 'loadingbar_bg').setScale(2);
		this.loadingbar_fill = this.add.sprite(1920 / 2, 1080 / 2, 'loadingbar_fill').setScale(2);
		this.setPreloadSprite(this.loadingbar_fill);

		// backgrounds
		//menu
		this.load.image('bg_menu1', 'assets/bg/bg_menu1.png');
		this.load.image('bg_menu2', 'assets/bg/bg_menu2.png');
		// level 1
		this.load.image('bg_level1_1', 'assets/bg/bg_level1_1.png');
		this.load.image('bg_level1_2', 'assets/bg/bg_level1_2.png');


		this.load.image('bg_level1_3', 'assets/bg/bg_level1_3.png');
		this.load.image('bg_level1_4', 'assets/bg/bg_level1_4.png');
		// level 2
		// static version of level 1
		
		// level 3 & 6
		this.load.image('bg_mine1', 'assets/bg/bg_mine1.png');
		this.load.image('bg_mine2', 'assets/bg/bg_mine2.png');
	
		// level 4
		this.load.image('bg_level4_1', 'assets/bg/bg_level4_1.png');
		this.load.image('bg_level4_2', 'assets/bg/bg_level4_2.png');
		this.load.image('bg_level4_3', 'assets/bg/bg_level4_3.png');
		this.load.image('bg_level4_4', 'assets/bg/bg_level4_4.png');
		// level 5
		// wip

		// images
		this.load.image('logo', 'assets/img/logo.png');
		this.load.image('credits_bg', 'assets/img/credits_bg.png');
		this.load.image('gameOver', 'assets/img/game_over.png');
		this.load.image('victory', 'assets/img/victory.png')
		this.load.image('torpedo', 'assets/img/torpedo.png');
		this.load.image('bomb', 'assets/img/bomb.png');
		this.load.image('mine', 'assets/img/mine-big.png');
		this.load.image('click_screen', 'assets/img/click_screen.png');
		this.load.image('metalTexture', 'assets/img/metalTexture.png');
		this.load.image('tutorial_screen', 'assets/img/tutorial_screen.png');

		// icons
		this.load.image('torpedoIcon', 'assets/icn/torpedoIcon.png')
		this.load.image('o2Icon', 'assets/icn/o2Icon.png');
		this.load.image('skullIcon', 'assets/icn/skullIcon.png');
		this.load.image('timeIcon', 'assets/icn/timeIcon.png');
		this.load.image('bombIcon', 'assets/icn/bombIcon.png')

		// atlases and spritesheets (for animations)
		this.load.atlas('sprites', 'assets/sprt/spritearray.png', 'assets/sprt/spritearray.json');
		this.load.atlas('buttons', 'assets/sprt/buttons.png', 'assets/sprt/buttons.json');
		this.load.atlas('lifeIcons', 'assets/sprt/lifeIcons.png', 'assets/sprt/lifeIcons.json');
		this.load.atlas('diverIcons', 'assets/sprt/diverIcons.png', 'assets/sprt/diverIcons.json');

		this.load.spritesheet('player', 'assets/sprt/yellow_submarine.png', { frameWidth: 200, frameHeight: 70 });
		this.load.spritesheet('monster1', 'assets/sprt/monster1.png', { frameWidth: 256, frameHeight: 148 });
		this.load.spritesheet('monster2', 'assets/sprt/monster2.png', { frameWidth: 256, frameHeight: 148 });
		this.load.spritesheet('monster3', 'assets/sprt/monster3.png', { frameWidth: 54, frameHeight: 49 });
		this.load.spritesheet('monster4', 'assets/sprt/monster4.png', { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet('monster5', 'assets/sprt/monster5.png', { frameWidth: 39, frameHeight: 20 });
		this.load.spritesheet('monster6', 'assets/sprt/monster6.png', { frameWidth: 54, frameHeight: 22 });
		this.load.spritesheet('monster7', 'assets/sprt/monster7.png', { frameWidth: 28, frameHeight: 24 });
		this.load.spritesheet('monster8', 'assets/sprt/monster8.png', { frameWidth: 32, frameHeight: 20 });
		this.load.spritesheet('monster9', 'assets/sprt/monster9.png', { frameWidth: 32, frameHeight: 23 });
		this.load.spritesheet('monster10', 'assets/sprt/monster10.png', { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet('monster11', 'assets/sprt/monster11.png', { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet('monster12', 'assets/sprt/monster12.png', { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet('monster13', 'assets/sprt/monster13.png', { frameWidth: 30, frameHeight: 12 });
		this.load.spritesheet('monster14', 'assets/sprt/monster14.png', { frameWidth: 84, frameHeight: 56 });

		this.load.spritesheet('diver', 'assets/sprt/diver.png', { frameWidth: 80, frameHeight: 80 });
		this.load.spritesheet('diver-death', 'assets/sprt/diver-death.png', { frameWidth: 52, frameHeight: 53 });
		this.load.spritesheet('explosion-big', 'assets/sprt/explosion-big.png', { frameWidth: 78, frameHeight: 87 });

		// music and sound effects
		this.load.audio('coin', ['assets/snd/coin.mp3', 'assets/snd/coin.ogg']);
		this.load.audio('expl', ['assets/snd/expl.mp3', 'assets/snd/expl.ogg']);
		this.load.audio('button', ['assets/snd/button.mp3', 'assets/snd/button.ogg']);
		this.load.audio('lose', 'assets/snd/lose.mp3');
		this.load.audio('win', 'assets/snd/win.mp3');
		this.load.audio('menu_theme', 'assets/snd/menu_theme.mp3');
		this.load.audio('level1_theme', 'assets/snd/level1_theme.mp3');
		this.load.audio('level4_theme', 'assets/snd/level4_theme.mp3');
		this.load.audio('level5_theme', ['assets/snd/level5_theme.mp3','assets/snd/level5_theme.ogg']);
		this.load.audio('utilities_theme', 'assets/snd/utilities_theme.mp3');
	},

	create: function () {
		this.anims.create({
			key: 'player_animation',
			frames: this.anims.generateFrameNumbers('player'),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'monster1',
			frames: this.anims.generateFrameNumbers('monster1'),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'monster2',
			frames: this.anims.generateFrameNumbers('monster2'),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'monster3',
			frames: this.anims.generateFrameNumbers('monster3'),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'monster4',
			frames: this.anims.generateFrameNumbers('monster4'),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'monster5',
			frames: this.anims.generateFrameNumbers('monster5'),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'monster6',
			frames: this.anims.generateFrameNumbers('monster6'),
			frameRate: 2,
			repeat: -1
		});
		this.anims.create({
			key: 'monster7',
			frames: this.anims.generateFrameNumbers('monster7'),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'monster8',
			frames: this.anims.generateFrameNumbers('monster8'),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'monster9',
			frames: this.anims.generateFrameNumbers('monster9'),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'monster10',
			frames: this.anims.generateFrameNumbers('monster10'),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'monster11',
			frames: this.anims.generateFrameNumbers('monster11'),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'monster12',
			frames: this.anims.generateFrameNumbers('monster12'),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'monster13',
			frames: this.anims.generateFrameNumbers('monster13'),
			frameRate: 2,
			repeat: -1
		});
		this.anims.create({
			key: 'monster14',
			frames: this.anims.generateFrameNumbers('monster14'),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'diver',
			frames: this.anims.generateFrameNumbers('diver'),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'explosion-big',
			frames: this.anims.generateFrameNumbers('explosion-big'),
			frameRate: 20,
			repeat: 0,
			hideOnComplete: true
		});
		this.anims.create({
			key: 'diver-death',
			frames: this.anims.generateFrameNumbers('diver-death'),
			frameRate: 10,
			repeat: 0,
			hideOnComplete: true
		});

		this.loadingbar_bg.destroy();
		this.loadingbar_fill.destroy();
		this.preloadSprite = null;

		this.scene.start('clickscene');
	}
});