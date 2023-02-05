Phaser.Scene.prototype.addButton = function (x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame) {
	var button = this.add.sprite(x, y, key, outFrame).setInteractive();
	button.on('pointerover', function (ptr, x, y) { this.setFrame(overFrame) });
	button.on('pointerout', function (ptr) { this.setFrame(outFrame) });
	button.on('pointerup', callback.bind(callbackContext));

	return button;
};