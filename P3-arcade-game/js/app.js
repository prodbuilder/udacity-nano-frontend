var step_width = 101,
    step_height = 83,
    max_width = 505,
    max_height = 606;

// Enemies our player must avoid
var Enemy = function(speed, x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // if game over or paused, this.state = false
    this.state = true;
    // a car has original location and speed
    this.speed = speed;
    this.x = (typeof x === 'undefined' ? (-1) : x) * step_width;
    this.y = y * step_height - 20;
    console.log('enemy setup, x= ' + this.x + ', y=' + this.y);
};

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

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    if (this.state) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = (typeof x === 'undefined' ? 2 : x) * step_width;
    this.y = (typeof y === 'undefined' ? 5 : y) * step_height - 10;
    this.moves = [];
    console.log('player setup: x: ' + this.x + ', y:' + this.y);
};

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
    this.moves.push(move);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
    this.visible = false;
    this.msg = 'new game';
};

Dialog.prototype.render = function() {
    if (this.visible) {
        this.draw();
    }
};

Dialog.prototype.draw = function(x, y, width, height) {
    var stroke = true;
    var radius = 5;

    ctx.fillStyle = "#ff6600";
    ctx.globalAlpha = 0.6;

    ctx.rect(max_width * .1, max_height * .5, max_width * .8, max_height * .4);
    ctx.stroke();
    ctx.fill();
    ctx.globalAlpha = 1.0;

    this.msg = typeof this.msg === 'undefined' ? '' : this.msg;
    ctx.font = '48px sans-serif';
    ctx.fillStyle = "white";
    ctx.fillText(this.msg, max_width * .2, max_height * .7);
    ctx.font = '18px sans-serif';
    ctx.fillText('press Y to start', max_width * .2, max_height * .7);
}

Game = function() {
    status: false;
}

Game.prototype.handleInput = function(userInput) {
    if (userInput == 'y') {
            dialog.visible = false;
            this.status = true;
    }
}



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

    dialog = new Dialog('new game');
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
    };
    var choiceKeys = {
        78: false,
        89: true,
    }
    if (allowedKeys.hasOwnProperty(e.keyCode)) {
        console.log('this is a move');
        player.handleInput(allowedKeys[e.keyCode]);
    } else if (choiceKeys.hasOwnProperty(e.keyCode)) {
        console.log('this is y/n');
        dialog.handleInput(choiceKeys[e.keyCode]);
    } else {
        console.log('this is somthing else ' + e.keyCode + ' it is' + allowedKeys.hasOwnProperty(e.keyCode));
    }
});
