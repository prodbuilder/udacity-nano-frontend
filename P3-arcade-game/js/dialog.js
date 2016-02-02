// Diaglog
var Dialog = function(x, y, width, height) {
    this.width = width || max_width;
    this.height = height || max_height;
    this.x = x || 0;
    this.y = y || 0;
    this.visible = true;
    this.msg = 'New Game';
    this.color = '#626262';
};

Dialog.prototype.render = function() {
    if (this.visible) {
        this.draw();
    }
};
Dialog.prototype.showMsg = function(msg, color) {
    this.visible = true;
    this.msg = msg;
    this.color = color;
};

Dialog.prototype.draw = function(x, y, width, height) {
    // draw rectangular dialog box
    ctx.fillStyle = '#f5f5f5';
    ctx.globalAlpha = 0.6;
    ctx.rect(max_width * 0.1, max_height * 0.5,
        max_width * 0.8, max_height * 0.45);
    ctx.fill();

    // show msg
    this.msg = typeof this.msg === 'undefined' ? '' : this.msg;
    ctx.font = '48px sans-serif';
    ctx.fillStyle = this.color;
    ctx.textAlign = 'center';

    var horizontal_center = max_width * 0.5;
    ctx.fillText(this.msg, horizontal_center, max_height * 0.65);

    // prompt interaction
    ctx.font = '24px sans-serif';
    ctx.fillStyle = '#626262';
    ctx.fillText('Press SPACE key to start...', horizontal_center, max_height * 0.75);

    // game instructions
    ctx.font = '16px sans-serif';
    ctx.fillStyle = 'blue';
    ctx.fillText('Use arrow keys to move your player', horizontal_center, max_height * 0.85);

    // TODO: tell about time out
    // use Esc key to pause/resume game

    // set transparency back to normal
    ctx.globalAlpha = 1.0;
};
