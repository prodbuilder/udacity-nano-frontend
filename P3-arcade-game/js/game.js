var Game = function() {
    this.active = false;
};
canActivate.call(Game.prototype);

Game.prototype.handleInput = function(userInput) {
    if (userInput === 'help') {
        HELPER_SHOW_STATUS();
    }
    if (this.chooser.visible) {
        switch (userInput) {
            case 'left':
                this.chooser.goLeft();
                break;
            case 'right':
                this.chooser.goRight();
                break;
            case 'space': // wait for a confirm key
                this.setAvatar();
                break;
        }
    } else {
        switch (userInput) {
            case 'left':
            case 'right':
            case 'up':
            case 'down':
                this.player.move(userInput);
                break;
            case 'esc':
                this.handlePauseResume();
                break;
            case 'space':
                this.start();
                // setTimeout(this.start.bind(this), 1000);
                break;
        }
    }
};

Game.prototype.setAvatar = function() {
    this.chooser.setAvatar();
    this.player.setAvatar(this.chooser.avatar);
    this.scorer.setAvatar(this.chooser.avatar);
    this.chooser.hide();

    // this.dialog.show();
    setTimeout(this.dialog.show.bind(this.dialog), 500);

    this.player.show();
};
Game.prototype.start = function(userInput) {
    if (!this.paused && !this.active && this.dialog.visible) {
        this.reset();
        this.resume();
        if (this.scorer.lifeOut()) {
            // start of new game
            this.scorer.resetScore();
            this.setLevel();
        }
        this.showEntities();
    }
};
Game.prototype.handlePauseResume = function(userInput) {
    if (this.active) {
        this.dialog.showMsg('Game Paused...', 'gray');
        this.paused = true;
        this.pause();
    } else if (this.paused) {
        this.paused = false;
        this.resume();
    }
};
Game.prototype.pause = function() {
    [this, this.player, this.scorer]
    .concat(this.allGems)
        .concat(this.allEnemies)
        .forEach(function(item) {
            item.deactivate();
        });
};
Game.prototype.resume = function() {
    this.dialog.hide();
    this.scorer.show();
    [this, this.player, this.scorer]
    .concat(this.allEnemies)
        .forEach(function(item) {
            item.activate();
        });
};

Game.prototype.update = function(dt) {
    this.updateEntities(dt);

    if (this.player.reachWater()) {
        this.dialog.showMsg('Game Won!', COLOR_GREEN);
        if (this.active) {
            this.scorer.win();
            this.setLevel();
        }
        this.deactivate();
    } else if (this.player.overlapAny(this.allEnemies)) {
        this.dialog.showMsg('Game Lost!', COLOR_RED);
        if (this.active && this.scorer.life > 0) {
            this.scorer.lose();
        }
        this.deactivate();
    } else if (this.scorer.timedOut()) {
        this.dialog.showMsg('Game Timed Out!', COLOR_BLUE);
        this.deactivate();
    }

    if (this.scorer.lifeOut()) {
        this.dialog.showMsg('No lives! You Lost!', COLOR_ORANGE);
        this.deactivate();
    }

    var pickedGem = this.player.tryPickUp(this.allGems);
    this.scorer.addGem(pickedGem);

    if (!this.active) {
        this.pause();
    }
};
Game.prototype.reset = function() {
    // reset for each round of game
    this.allEnemies.forEach(function(enemy) {
        enemy.reset();
    });
    this.player.reset();
    this.showEntities();
    this.scorer.resetTimer();
};
Game.prototype.updateEntities = function(dt) {
    this.allEnemies.forEach(function(enemy) {
        enemy.update(dt);
    });
    this.player.update();
    this.scorer.update(dt);
};
Game.prototype.showEntities = function() {
    this.allRocks.concat(this.allGems).concat(this.allEnemies)
        .forEach(function(item) {
            item.show();
        });
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
    this.allGems.concat(this.allRocks).concat(this.allEnemies)
        .forEach(function(item) {
            item.render();
        });
    this.player.render();
    this.dialog.render();
    if (!this.active) {
        this.chooser.render();
    }
    this.scorer.render();
};
Game.prototype.setLevel = function() {
    // add entities based on current game level
    this.setEnemy(this.scorer.num_enemy());
    this.setGem(this.scorer.num_gem());
    this.setRock(this.scorer.num_rock());
    // so that play knows about the board and where is inaccessible
    // without accessing rock values in game
    this.player.setRocks(this.allRocks);
};

Game.prototype.setEnemy = function(num_enemy) {
    this.allEnemies = [];
    for (var i = 0; i < num_enemy; i++) {
        var enemy = new Enemy(
            SPEEDUP_RATIO * randomFromRange(50, 50 * this.scorer.level), // speed
            randomFromRange(0, 4), // starting x
            randomChoice([1, 2, 3]) // row
        );
        enemy.id = i;
        this.allEnemies.push(enemy);
    }
};
Game.prototype.setGem = function(num_gem) {
    this.allGems = [];
    for (var i = 0; i < num_gem;) {
        var newGem = new Gem(
            randomChoice(Object.keys(GEM_VALUES)), // random color
            randomChoice([0, 1, 2, 3, 4]), // starting col
            randomChoice([1, 2, 3]) // row
        );
        if (!(newGem.overlapAny(this.allGems) || newGem.overlapAny(this.allRocks))) {
            newGem.id = i;
            this.allGems.push(newGem);
            i++;
        }
    }
};
Game.prototype.setRock = function(num_rock) {
    this.allRocks = [];
    for (var i = 0; i < num_rock;) {
        var newRock = new Rock(
            randomChoice([0, 1, 2, 3, 4]), // starting col
            randomChoice([1, 2, 3]) // row
        );
        if (!(newRock.overlapAny(this.allGems) || newRock.overlapAny(this.allRocks))) {
            newRock.id = i;
            this.allRocks.push(newRock);
            i++;
        }
    }
};
Game.prototype.initEntities = function() {
    this.allEnemies = [];
    this.allGems = [];
    this.allRocks = [];
    this.dialog = new Dialog();
    this.chooser = new Chooser();
    this.player = new Player();
    this.scorer = new Scorer();
};
Game.prototype.init = function() {
    this.initEntities();
    this.setLevel();
    this.chooser.show();
    HELPER_SHOW_STATUS();
};
