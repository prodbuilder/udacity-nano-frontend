var Game = function() {
    this.active = false;
};

Game.prototype.handleInput = function(userInput) {
    console.log('Game handling output: ' + userInput);
    if (!this.active && dialog.visible && userInput === 'space') {
        if (DEBUG) {
            console.log('space means start game')
        }
        this.reset();
        this.resume();
        if (scorer.life === 0) {
            // start of new game
            this.resetLevel();
        }
        this.showEntities();
    }
    if (userInput === 'esc') {
        if (this.active) {
            dialog.showMsg('Game Paused...', 'gray');
            this.paused = true;
            this.pause();
        } else if (this.paused) {
            if (DEBUG) {
                console.log('resume game');
            }
            this.paused = false;
            this.resume();
        }
    }
};

Game.prototype.pause = function() {
    if (DEBUG) {
        console.log('Game pause or end')
    }
    allEnemies.forEach(function(enemy) {
        enemy.active = false;
    });
    allGems.forEach(function(gem) {
        gem.active = false;
    });

    player.active = false;
    scorer.active = false;
    this.active = false;
}
Game.prototype.resume = function() {
    if (DEBUG) {
        console.log('Game resume or start')
    }
    dialog.hide();
    scorer.show();
    allEnemies.forEach(function(enemy) {
        enemy.active = true;
    });
    player.active = true;
    scorer.active = true;
    this.active = true;
    HELPER_SHOW_STATUS();
};
Game.prototype.checkCollisions = function() {
    return player.overlapAny(allEnemies);
};
Game.prototype.checkWin = function() {
    return player.y === -10;
};
Game.prototype.checkTimeOut = function() {
    return scorer.timeElapsed > MAX_DURATION;
};
Game.prototype.checkLifeZero = function() {
    return scorer.life <= 0;
};
Game.prototype.pickUpGem = function() {
    // pickup gem
    allGems.forEach(function(gem) {
        if (gem.visible && gem.overlap(player)) {
            scorer.score += gem.value;
            gem.hide();
        }
    });
};
Game.prototype.check = function() {
    if (this.checkWin()) {
        dialog.showMsg('Game Won!', COLOR_GREEN);
        if (this.active) {
            scorer.score += scorer.level * SCORE_WIN;
            this.levelUp();
        }
        this.active = false;
    } else if (this.checkCollisions()) {
        dialog.showMsg('Game Lost!', COLOR_RED);
        if (this.active && scorer.life > 0) {
            scorer.life -= 1;
        }
        this.active = false;
    } else if (this.checkTimeOut()) {
        dialog.showMsg('Game Timed Out!', COLOR_BLUE);
        this.active = false;
    }
    if (this.checkLifeZero()) {
        dialog.showMsg('No lives! You Lost!', COLOR_ORANGE);
        this.active = false;
    }

    this.pickUpGem();

    if (!this.active) {
        this.pause();
    }
};

Game.prototype.reset = function() {
    // reset for each round of game
    allEnemies.forEach(function(enemy) {
        enemy.reset();
    });
    player.reset();
    player.show();
    this.showEntities();
    scorer.resetTimer();
}
Game.prototype.showEntities = function() {
    allRocks.concat(allGems).concat(allEnemies)
        .forEach(function(item) {
            item.show();
        });
}
Game.prototype.renderEntities = function() {
    allRocks.concat(allGems).concat(allEnemies)
        .forEach(function(item) {
            item.render();
        });
    player.render();
    dialog.render();
    chooser.render();
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
            ctx.drawImage(Resources.get(rowImages[row]), col * STEP_WIDTH, row * STEP_HEIGHT);
        }
    }
}

Game.prototype.render = function() {
    this.renderBackground();
    this.renderEntities();
};
Game.prototype.levelUp = function() {
    this.addEnemy(scorer.level);
    this.addGem(scorer.level);
    this.addRock(1);
    if (this.active) {
        scorer.level++;
    }
};
Game.prototype.resetLevel = function() {
    scorer.reset();
    allEnemies = [];
    allGems = [];
    allRocks = [];
    this.levelUp();
    scorer.reset();
};

Game.prototype.addEnemy = function(num_enemy) {
    for (var i = 0; i < num_enemy; i++) {
        var enemy = new Enemy(
            randomFromRange(50, 50 * scorer.level), // speed
            randomFromRange(0, 4), // starting x
            randomChoice([1, 2, 3]) // row
        );
        enemy.id = i;
        allEnemies.push(enemy);
    }
    // speed every enemy up
    allEnemies.forEach(function(enemy) {
        enemy.speed *= SPEEDUP_RATIO;
    });
};

Game.prototype.addGem = function(num_gem) {
    for (var i = 0; i < num_gem;) {
        var newGem = new Gem(
            randomChoice(Object.keys(GEM_VALUES)), // random color
            randomChoice([0, 1, 2, 3, 4]), // starting col
            randomChoice([1, 2, 3]) // row
        );
        if (!newGem.overlapAny(allGems.concat(allRocks))) {
            newGem.id = i;
            allGems.push(newGem);
            i++;
        }
    }
};

Game.prototype.addRock = function(num_rock) {
    for (var i = 0; i < num_rock;) {
        var newRock = new Rock(
            randomChoice([0, 1, 2, 3, 4]), // starting col
            randomChoice([1, 2, 3]) // row
        );
        if (!newRock.overlapAny(allGems.concat(allRocks))) {
            newRock.id = i;
            allRocks.push(newRock);
            i++;
        }
    }
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player,
    allEnemies,
    allGems,
    allRocks,
    dialog,
    chooser,
    player,
    game,
    scorer;

function init_entities() {
    // placed in global scope
    console.log('~~~~~~~~ Init entities ~~~~~~~~~~~')
    allEnemies = [];
    allGems = [];
    allRocks = [];
    dialog = new Dialog();
    chooser = new Chooser();
    player = new Player();
    game = new Game();
    scorer = new Scorer();
    game.levelUp();
    HELPER_SHOW_STATUS();
}










// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var directionKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    var controlKeys = {
        32: 'space',
        27: 'esc',
    };
    var helpKeys = {
        72: 'help',
    };
    var choiceKeys = {
        49: 1,
        50: 2,
        51: 3,
        52: 4,
        53: 5,
    };
    // TODO: refactor using case

    console.log('-------||| key pressed: ' + e.keyCode);
    if (directionKeys.hasOwnProperty(e.keyCode)) {
        player.move(directionKeys[e.keyCode]);
    } else if (choiceKeys.hasOwnProperty(e.keyCode)) {
        chooser.handleInput(choiceKeys[e.keyCode]);
    } else if (controlKeys.hasOwnProperty(e.keyCode)) {
        game.handleInput(controlKeys[e.keyCode]);
    } else if (helpKeys.hasOwnProperty(e.keyCode)) {
        HELPER_SHOW_STATUS();
    } else {
        console.log('Unexpected user input: ' + e.keyCode);
    }
});
