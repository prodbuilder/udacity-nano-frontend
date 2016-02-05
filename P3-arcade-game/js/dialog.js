// Diaglog
var Dialog = function(x, y, width, height) {
    this.width = width || MAX_WIDTH;
    this.height = height || MAX_HEIGHT;
    this.x = x || 0;
    this.y = y || 0;
    this.visible = false;
    this.msg = 'New Game';
    this.color = COLOR_GRAY;
};

Dialog.prototype = Object.create(Renderable.prototype);
Dialog.prototype.constructor = Dialog;

Dialog.prototype.showMsg = function(msg, color) {
    this.visible = true;
    this.msg = msg;
    this.color = color;
};

Dialog.prototype.draw = function(x, y, width, height) {
    // draw rectangular dialog box
    ctx.fillStyle = COLOR_OFFWHITE;
    ctx.globalAlpha = 0.7;
    ctx.fillRect(MAX_WIDTH * 0.1, MAX_HEIGHT * 0.33 ,
        MAX_WIDTH * 0.8, MAX_HEIGHT * 0.4);
    // set transparency back to normal
    ctx.globalAlpha = 1.0;

    // show msg
    this.msg = typeof this.msg === 'undefined' ? '' : this.msg;
    ctx.font = '48px sans-serif';
    ctx.fillStyle = this.color;
    ctx.textAlign = 'center';

    var horizontal_center = MAX_WIDTH * 0.5;
    ctx.fillText(this.msg, horizontal_center, MAX_HEIGHT * 0.45);

    // prompt interaction
    ctx.font = '24px sans-serif';
    ctx.fillStyle = COLOR_GRAY;
    ctx.fillText('Press SPACE key to start game', horizontal_center, MAX_HEIGHT * 0.55);

    // game instructions
    ctx.font = '16px sans-serif';
    ctx.fillStyle = COLOR_BLUE;
    ctx.fillText('Arrow keys to move player', horizontal_center, MAX_HEIGHT * 0.64);
    ctx.fillStyle = COLOR_GREEN;
    ctx.fillText('ESC key to Pause | Resume', horizontal_center, MAX_HEIGHT * 0.68);
};

