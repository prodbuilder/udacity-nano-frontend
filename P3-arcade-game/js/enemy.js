// Enemies our player must avoid
var Enemy = function(speed, x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    var sprite = 'images/enemy-bug.png';
    var width = 101;
    var visibleWidth = 101;
    // a car has original location and speed

    var x = (typeof x === 'undefined' ? (-1) : x) * step_width;
    var y = y * step_height - 20;

    Itemable.call(this, x, y, sprite, width, visibleWidth);
    this.speed = speed;
    this.active = true;
    console.log('enemy setup, x= ' + this.x + ', y=' + this.y);
};

Enemy.prototype = Object.create(Itemable.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.active) {
        this.x += this.speed * dt;
        if (this.x > max_width) {
            this.x = -step_width;
        }
    }
};
