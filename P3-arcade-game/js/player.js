// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(sprite, x, y) {
    sprite = typeof sprite === 'undefined' ? 'images/char-boy.png' : sprite;
    var width = 101;
    var visibleWidth = 60;

    x = (typeof x === 'undefined' ? 2 : x) * STEP_WIDTH;
    y = (typeof y === 'undefined' ? 5 : y) * STEP_HEIGHT - 10;

    Itemable.call(this, x, y, sprite, width, visibleWidth);
    this.activate();
    this.moves = [];
};
Player.prototype = Object.create(Itemable.prototype);
Player.prototype.constructor = Player;
canActivate.call(Player.prototype);


Player.prototype.update = function() {
    while (this.moves.length > 0) {
        var move = this.moves.pop();
        var newX = this.x,
            newY = this.y;

        if (move === 'left') {
            if (this.x > 0) {
                newX = this.x - STEP_WIDTH;
            }
        }
        if (move == 'right') {
            if (this.x + STEP_WIDTH < MAX_WIDTH) {
                newX = this.x + STEP_WIDTH;
            }
        }
        if (move == 'up') {
            if (this.y > 0) {
                newY = this.y - STEP_HEIGHT;
            }
        }
        if (move == 'down') {
            if (this.y + STEP_HEIGHT < MAX_HEIGHT - 199) {
                newY = this.y + STEP_HEIGHT;
            }
        }
        if (this.legal(newX, newY)) {
            this.x = newX;
            this.y = newY;
        }

    }
};
Player.prototype.legal = function(newX, newY) {
    var futurePosition = new Itemable(newX, newY, this.sprite, this.width, this.visibleWidth);
    return !futurePosition.overlapAny(this.allRocks);
};
Player.prototype.move = function(direction) {
    if (this.active) {
        this.moves.push(direction);
    }
};
Player.prototype.setAvatar = function(sprite) {
    this.sprite = sprite;
};
Player.prototype.setRocks = function(allRocks) {
    this.allRocks = allRocks;
};
Player.prototype.tryPickUp = function(allGems) {
    var _this = this;
    var picked;
    allGems.forEach(function(gem) {
        if (gem.visible && _this.overlap(gem)) {
            gem.hide();
            picked = gem;
        }
    });
    return picked;
};
Player.prototype.reachWater = function(sprite) {
    return this.row() === 0;
};
