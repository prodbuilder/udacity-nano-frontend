var Game = function() {
    this.active = false;
};
canActivate.call(Game.prototype);

Game.prototype.handleInput = function(e) {
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
        13: 'enter',
    };
    if (DEBUG) {
        console.log('-------||| key pressed: ' + e.keyCode);
    }
    if (directionKeys.hasOwnProperty(e.keyCode)) {
        player.move(directionKeys[e.keyCode]);
    } else if (choiceKeys.hasOwnProperty(e.keyCode)) {
        chooser.handleInput(choiceKeys[e.keyCode]);
    } else if (controlKeys.hasOwnProperty(e.keyCode)) {
        game.control(controlKeys[e.keyCode]);
    } else if (helpKeys.hasOwnProperty(e.keyCode)) {
        HELPER_SHOW_STATUS();
    } else {
        if (DEBUG) {
            console.log('Unexpected user input: ' + e.keyCode);
        }
    }
};

Game.prototype.control = function(userInput) {
    if (DEBUG) {
        console.log('Game handling output: ' + userInput);
    }
    if (userInput === 'space') {
        if (!this.paused && !this.active && dialog.visible) {
            if (DEBUG) {
                console.log('space means start game');
            }
            this.reset();
            this.resume();
            if (scorer.life === 0) {
                // start of new game
                scorer.resetScore();
                this.setLevel();
            }
            this.showEntities();
        }
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
        console.log('Game pause or end');
    }
    [this, player, scorer]
    .concat(allGems)
        .concat(allEnemies)
        .forEach(function(item) {
            item.deactivate();
        });
};
Game.prototype.resume = function() {
    if (DEBUG) {
        console.log('Game resume or start');
    }
    dialog.hide();
    scorer.show();
    [this, player, scorer]
    .concat(allEnemies)
        .forEach(function(item) {
            item.activate();
        });
};


Game.prototype.checkCollisions = function() {
    var collided = false;
    allEnemies.forEach(function(enemy) {
        if (enemy.overlap(player)) {
            collided = true;
        }
    });
    return collided;
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
            scorer.win();
            this.setLevel();
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
    this.showEntities();
    scorer.resetTimer();
};
Game.prototype.showEntities = function() {
    allRocks.concat(allGems).concat(allEnemies)
        .forEach(function(item) {
            item.show();
        });
};
Game.prototype.renderEntities = function() {
    allGems.concat(allRocks).concat(allEnemies)
        .forEach(function(item) {
            item.render();
        });
    player.render();
    dialog.render();
    if (!this.active) {
        chooser.render();
    }
    scorer.render();
};
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
    for (row = 0; row < numRows; row++) {
        for (col = 0; col < numCols; col++) {
            ctx.drawImage(Resources.get(rowImages[row]), col * STEP_WIDTH, row * STEP_HEIGHT);
        }
    }
};

Game.prototype.render = function() {
    this.renderBackground();
    this.renderEntities();
};
Game.prototype.setLevel = function() {
    // add entities based on current game level
    allEnemies = [];
    allGems = [];
    allRocks = [];
    var num_gem = scorer.level + 1;
    var num_enemy = scorer.level + 2;
    var num_rock = scorer.level - 1;
    this.addEnemy(num_enemy);
    this.addGem(num_gem);
    this.addRock(num_rock);
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
    var overlap;
    for (var i = 0; i < num_gem;) {
        var newGem = new Gem(
            randomChoice(Object.keys(GEM_VALUES)), // random color
            randomChoice([0, 1, 2, 3, 4]), // starting col
            randomChoice([1, 2, 3]) // row
        );
        overlap = false;
        allGems.forEach(function(gem) {
            overlap = gem.overlap(newGem);
        });
        allRocks.forEach(function(rock) {
            overlap = rock.overlap(newGem);
        });
        if (!overlap) {
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
        overlap = false;
        allGems.forEach(function(gem) {
            overlap = gem.overlap(newRock);
        });
        allRocks.forEach(function(rock) {
            overlap = rock.overlap(newRock);
        });
        if (!overlap) {
            newRock.id = i;
            allRocks.push(newRock);
            i++;
        }
    }
};
