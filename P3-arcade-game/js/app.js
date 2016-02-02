var Game = function() {
    this.active = false;
};

Game.prototype.handleInput = function(userInput) {
    console.log('Game handling output: ' + userInput);
    if (userInput === 'space') {
        console.log('space  means start game')
        game.reset();
        game.resume();
        if (scorer.life === 0) {
            // start of new game
            scorer.reset();
        }
    }
    if (userInput === 'esc') {
        if (this.active) {
            dialog.showMsg('Game Paused...', 'gray');
            this.pause();
        } else {
            console.log('resume game')
            this.resume();
        }
    }
};

Game.prototype.pause = function() {
    console.log('Game pause or end')
    allEnemies.forEach(function(enemy) {
        enemy.active = false;
    })
    player.active = false;
    timer.active = false;
    this.active = false;

}
Game.prototype.resume = function() {
    console.log('Game resume or start')
    dialog.visible = false;
    allEnemies.forEach(function(enemy) {
        enemy.active = true;
    })
    player.active = true;
    timer.active = true;
    timer.visible = true;
    scorer.visible = true;
    this.active = true;
    helper();
}
Game.prototype.checkCollisions = function() {
    var collision = false;
    allEnemies.forEach(function(enemy) {
        if (enemy.overlap(player)) {
            collision = true;
        }
    });
    return collision;
};

Game.prototype.checkWin = function() {
    return (player.y === -10);
};

Game.prototype.checkTimeOut = function() {
    return timer.timeElapsed > MAX_DURATION;
};
Game.prototype.checkLifeZero = function() {
    return scorer.life <= 0;
}
Game.prototype.update = function() {
    if (this.checkWin()) {
        dialog.showMsg('Game Won!', 'green');
        if (this.active) {
            scorer.score += 1;
        }
        this.active = false;
    } else if (this.checkCollisions()) {
        dialog.showMsg('Game Lost!', 'red');
        if (this.active && scorer.life > 0) {
            scorer.life -= 1;
        }
        this.active = false;
    } else if (this.checkTimeOut()) {
        dialog.showMsg('Game Timed Out!', 'red');
        this.active = false;
    }
    if (this.checkLifeZero()) {
        dialog.showMsg('No life left! You Lost!', 'red');
        this.active = false;
    }

    if (!this.active) {
        this.pause();
    }
};

Game.prototype.reset = function() {
    allEnemies.forEach(function(enemy) {
        enemy.reset();
    });
    player.reset();
    timer.reset();
}
Game.prototype.renderEntities = function() {
    allEnemies.forEach(function(enemy) {
        enemy.render();
    });
    player.render();
    dialog.render();
    timer.render();
    scorer.render();
}
Game.prototype.renderBackground = function() {
    var rowImages = [
            'images/water-block.png', // Top row is water
            'images/stone-block.png', // Row 1 of 3 of stone
            'images/stone-block.png', // Row 2 of 3 of stone
            'images/stone-block.png', // Row 3 of 3 of stone
            'images/grass-block.png', // Row 1 of 2 of grass
            'images/grass-block.png' // Row 2 of 2 of grass
        ],
        numRows = 6,
        numCols = 5,
        row, col;

    /* Loop through the number of rows and columns we've defined above
     * and, using the rowImages array, draw the correct image for that
     * portion of the "grid"
     */
    for (row = 0; row < numRows; row++) {
        for (col = 0; col < numCols; col++) {
            /* The drawImage function of the canvas' context element
             * requires 3 parameters: the image to draw, the x coordinate
             * to start drawing and the y coordinate to start drawing.
             * We're using our Resources helpers to refer to our images
             * so that we get the benefits of caching these images, since
             * we're using them over and over.
             */
            ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
        }
    }
}

Game.prototype.render = function() {
    this.renderBackground();
    this.renderEntities();
}




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
function init_entities() {
    // placed in global scope
    console.log('~~~~~~~~ Init entities ~~~~~~~~~~~')
    allEnemies = [];
    allEnemies.push(new Enemy(100, 0, 1));
    allEnemies.push(new Enemy(200, 1, 2));
    allEnemies.push(new Enemy(150, 2.5, 3));

    player = new Player();
    dialog = new Dialog();
    timer = new Timer();
    game = new Game();
    scorer = new Scorer();
    helper();
}










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
        // TODO: refactor using case

    console.log('-------||| key pressed: ' + e.keyCode);
    if (allowedKeys.hasOwnProperty(e.keyCode)) {
        player.handleInput(allowedKeys[e.keyCode]);
    } else if (controlKeys.hasOwnProperty(e.keyCode)) {
        game.handleInput(controlKeys[e.keyCode]);
    } else if (helpKeys.hasOwnProperty(e.keyCode)) {
        helper();
    } else {
        console.log('user input: is somthing else ' + e.keyCode + ' it is' + allowedKeys.hasOwnProperty(e.keyCode));
    }
});


function helper() {
    console.log('============== Current status ================');
    console.log(dialog);
    console.log(player);
    allEnemies.forEach(function(enemy) {
        console.log(enemy);
        if (enemy.overlap(player)) {
            console.log('this enemy overlaps player!');
        }
    });
    console.log(timer);
    console.log(game);
    console.log(scorer);
}
