// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    var sprite = 'images/char-boy.png';
    var width = 101;
    var visibleWidth = 60;

    var x = (typeof x === 'undefined' ? 2 : x) * step_width;
    var y = (typeof y === 'undefined' ? 5 : y) * step_height - 10;

    Itemable.call(this, x, y, sprite, width, visibleWidth);
    this.active = false;
    this.moves = [];
    console.log('player setup: x: ' + this.x + ', y:' + this.y);
};
Player.prototype = Object.create(Itemable.prototype);
Player.prototype.constructor = Player;


Player.prototype.update = function() {
    while (this.moves.length > 0) {
        var move = this.moves.pop();
        if (move === 'left') {
            if (this.x > 0) {
                this.x -= step_width;
            }
        }
        if (move == 'right') {
            if (this.x + step_width < max_width) {
                this.x += step_width;
            }
        }
        if (move == 'up') {
            if (this.y > 0) {
                this.y -= step_height;
            }
        }
        if (move == 'down') {
            if (this.y + step_height < max_height - 199) {
                this.y += step_height;
            }
        }
        console.log('player update [' + move + '] x: ' + this.x + ', y:' + this.y);
    }
};

Player.prototype.handleInput = function(move) {
    if(this.active) {
        this.moves.push(move);
    }
};
