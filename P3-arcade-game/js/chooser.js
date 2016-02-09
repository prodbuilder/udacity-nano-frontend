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
    this.show();
    this.index = 0;
    this.avatar = this.sprites[this.index];
};
Chooser.prototype = Object.create(Renderable.prototype);
Chooser.prototype.constructor = Chooser;

Chooser.prototype.draw = function() {
    // dialog background
    ctx.fillStyle = COLOR_ORANGE;
    ctx.globalAlpha = 0.7;
    ctx.fillRect(MAX_WIDTH * 0.01, MAX_HEIGHT * 0.225,
        MAX_WIDTH * 0.98, MAX_HEIGHT * 0.5);
    ctx.globalAlpha = 1;
    // show hint msg
    ctx.font = '28px sans-serif';
    ctx.fillStyle = COLOR_OFFWHITE;
    ctx.textAlign = 'center';
    ctx.fillText('Choose your player', MAX_WIDTH * 0.5, MAX_HEIGHT * 0.3);
    ctx.fillText('Hit Space to confirm', MAX_WIDTH * 0.5, MAX_HEIGHT * 0.7);

    ctx.font = '36px sans-serif';
    ctx.textAlign = 'center';

    // render avatar choices
    var row = 2,
        numCols = this.sprites.length;
    ctx.drawImage(Resources.get(SPRITE_SELECTOR), this.index * STEP_WIDTH, 50 + row * STEP_HEIGHT);
    for (var col = 0; col < numCols; col++) {
        // show index 1-5
        if (col != this.index) {
            ctx.fillText(col + 1, (col + 0.5) * STEP_WIDTH, MAX_HEIGHT * 0.585);
        }
        ctx.drawImage(Resources.get(this.sprites[col]), col * STEP_WIDTH, row * STEP_HEIGHT);
    }
};
Chooser.prototype.setAvatar = function() {
    this.avatar = this.sprites[this.index];
};
Chooser.prototype.goLeft = function() {
    if (this.index > 0) {
        this.index--;
    }
};
Chooser.prototype.goRight = function() {
    if (this.index < this.sprites.length - 1) {
        this.index++;
    }
};
