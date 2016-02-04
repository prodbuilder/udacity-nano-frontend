

var Chooser = function() {
    // contains dialog with text prompt
    // and shows list of avatars available, with ids
    // handleInput : user input id to choose avator
    this.sprites = [
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
    ];
    this.visible = true;
    this.chosenSprite = this.sprites[0];
};
Chooser.prototype.render = function() {
    // TODO: refactor and remove game.active
    if (!game.active && this.visible) {
        this.draw();
    }
};
Chooser.prototype.draw = function() {
    // dialog background
    ctx.fillStyle = '#E5812B';
    ctx.globalAlpha = 0.7;
    ctx.fillRect(MAX_WIDTH * 0.03, MAX_HEIGHT * 0.2,
        MAX_WIDTH * 0.94, MAX_HEIGHT * 0.4);
    ctx.globalAlpha = 1;
    // show hint msg
    ctx.font = '24px sans-serif';
    ctx.fillStyle = '#f5f5f5';
    ctx.textAlign = 'left';
    ctx.fillText('Choose a player to start your game:', MAX_WIDTH * .05, MAX_HEIGHT * .3);
    // show index 1-5
    ctx.font = '36px sans-serif';
    ctx.textAlign = 'center';

    for (var index = 0; index < this.sprites.length; index++) {
        ctx.fillText(index + 1, (index + 0.5) * STEP_WIDTH, MAX_HEIGHT * 0.57);
    }

    // render avatar choices
    var row = 2,
        numCols = this.sprites.length;
    for (var col = 0; col < numCols; col++) {
        ctx.drawImage(Resources.get(this.sprites[col]), col * STEP_WIDTH, row * STEP_HEIGHT);
    }
};
Chooser.prototype.handleInput = function(index) {
    if (this.visible && index >= 1 && index <= this.sprites.length) {
        console.log('Chose avatar', index, this.sprites[index - 1]);
        this.chosenSprite = this.sprites[index-1];
        player.setAvatar(this.chosenSprite);
        this.hide();
        dialog.show();
    }
};
Chooser.prototype.show = function() {
    this.visible = true;
}

Chooser.prototype.hide = function() {
    this.visible = false;
}


