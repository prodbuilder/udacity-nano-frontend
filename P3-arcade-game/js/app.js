var step_width = 101,
    step_height = 83,
    max_width = 505,
    max_height = 606;

// interface for items that can be shown
// to be inherited by enemy, player, gems
var Itemable = function(x, y, sprite, width, visibleWidth) {
    this.x = x;
    this.y = y;
    this.initX = x;
    this.initY = y;
    this.sprite = sprite;
    this.width = width;
    this.visibleWidth = visibleWidth;
}
Itemable.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Itemable.prototype.leftX = function() {
    return this.x + this.width/2 - this.visibleWidth/2;
}
Itemable.prototype.rightX = function() {
    return this.x + this.width/2 + this.visibleWidth/2;
}
Itemable.prototype.overlap = function(that) {
    return (that instanceof Itemable) &&
        ( Math.abs(this.y - that.y) < 20 ) &&
        ( (this.leftX() <= that.leftX() && that.leftX() <= this.rightX())
            ||
          (this.leftX() <= that.rightX() && that.rightX() <= this.rightX()) );
}


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
    this.x += this.speed * dt;
    if (this.x > max_width) {
        this.x = -step_width;
    }
};


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


// Diaglog ('interface')
var Dialog = function() {
    this.init();
};

Dialog.prototype.init = function(x, y, width, height) {
    this.width = width || max_width;
    this.height = height || max_height;
    this.x = x || 0;
    this.y = y || 0;
    this.visible = true;
    this.msg = 'New Game';
};

Dialog.prototype.render = function() {
    if (this.visible) {
        this.draw();
    }
};

Dialog.prototype.draw = function(x, y, width, height) {
    var stroke = true;
    var radius = 5;

    ctx.fillStyle = "#f5f5f5";
    ctx.globalAlpha = 0.6;

    // draw rectangular dialog box
    ctx.rect(max_width * .1, max_height * .5, max_width * .8, max_height * .4);
    // ctx.stroke();
    ctx.fill();

    // show msg
    this.msg = typeof this.msg === 'undefined' ? '' : this.msg;
    ctx.font = '48px sans-serif';
    ctx.fillStyle = "#626262";
    ctx.textAlign="center";

    var horizontal_center = max_width * .5;
    ctx.fillText(this.msg, horizontal_center, max_height * .65);

    // prompt interaction
    ctx.font = '24px sans-serif';
    ctx.fillText('Press SPACE key to start...', horizontal_center, max_height * .75);
    ctx.font = '16px sans-serif';
    ctx.fillStyle = "blue";
    ctx.fillText('Use arrow keys to move your player', horizontal_center, max_height * .85)

    // set transparency back to normal
    ctx.globalAlpha = 1.0;
};

Dialog.prototype.handleInput = function(userInput) {
    console.log('diaglog handling output: ' + userInput)
    if (userInput === 'space') {
            init_entities();
            dialog.visible = false;
            player.active = true;
        }
};


Game = function() {
    status: false;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
function init_entities() {
    // placed in global scope
    allEnemies = [];
    allEnemies.push(new Enemy(100, 0, 1));
    allEnemies.push(new Enemy(200, 1, 2));
    allEnemies.push(new Enemy(150, 2.5, 3));

    player = new Player();

    dialog = new Dialog();
}
// this is moved to engine.js
// init_entities();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    }
    var controlKeys = {
        32: 'space',
        27: 'esc',
    };
    var helpKeys = {
        72: 'help',
    }
    console.log('key pressed: ' + e.keyCode);
    if (allowedKeys.hasOwnProperty(e.keyCode)) {
        player.handleInput(allowedKeys[e.keyCode]);
    } else if (controlKeys.hasOwnProperty(e.keyCode)) {
        dialog.handleInput(controlKeys[e.keyCode]);
    } else if (helpKeys.hasOwnProperty(e.keyCode)) {
        helper();
    } else {
        console.log('user input: is somthing else ' + e.keyCode + ' it is' + allowedKeys.hasOwnProperty(e.keyCode));
    }
});


function helper() {
    console.log('============== Current status ================');
        console.log('dialog status: ', dialog);
        console.log('player status: ', player);
        console.log('left = ', player.leftX(), 'right = ', player.rightX() );
        allEnemies.forEach(function(enemy) {
            console.log('enemy status:', enemy);
            console.log('left = ', enemy.leftX(), 'right = ', enemy.rightX() );
            if (enemy.overlap(player)) {
                console.log('this enemy overlaps player!');
            }
        });
}
