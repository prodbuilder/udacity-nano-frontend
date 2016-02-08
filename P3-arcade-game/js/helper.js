function HELPER_SHOW_STATUS(game) {
    if (DEBUG) {
        console.log('============== Current status ================');
        console.log(game.dialog);
        console.log(game.chooser);
        console.log(game.player);
        game.allEnemies.forEach(function(enemy) {
            console.log(enemy);
            if (enemy.overlap(game.player)) {
                console.log('    ----   this enemy overlaps player!  ', enemy.id);
            }
        });
        game.allRocks.forEach(function(rock) {
            console.log(rock);
            if (rock.overlap(game.player)) {
                console.log('    ----   this rock overlaps player!  ', rock.id);
            }
        });
        game.allGems.forEach(function(gem) {
            console.log(gem);
            if (gem.overlap(game.player)) {
                console.log('    ----   this gem overlaps player! ', gem.id);
            }
        });
        console.log(game);
        console.log(game.scorer);
    }
}



function HELPER_SHOW_STATUS2(game) {
    if (DEBUG) {
        console.log('============== Current status ================');
        game.player.print();

        game.allEnemies.forEach(function(enemy) {
            enemy.print();
            if (enemy.overlap(game.player)) {
                console.log('    ----   this enemy overlaps player!  ', enemy.id);
            }
        });
        game.allRocks.forEach(function(rock) {
            rock.print();
            if (rock.overlap(game.player)) {
                console.log('    ----   this rock overlaps player!  ', rock.id);
            }
        });
        game.allGems.forEach(function(gem) {
            gem.print();
            if (gem.overlap(game.player)) {
                console.log('    ----   this gem overlaps player! ', gem.id);
            }
        });
    }
}


function randomChoice(arr) {
    return arr[Math.floor(arr.length * Math.random())];
}

function randomFromRange(min, max) {
    if (min > max) {
        var a = max;
        max = min;
        min = a;
    }
    var len = max - min;
    return Math.random() * len + min;
}

// Closure
(function() {
    /**
     * Decimal adjustment of a number.
     *
     * @param {String}  type  The type of adjustment.
     * @param {Number}  value The number.
     * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
     * @returns {Number} The adjusted value.
     */
    function decimalAdjust(type, value, exp) {
        // If the exp is undefined or zero...
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // If the value is not a number or the exp is not an integer...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        // Shift
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }

    // Decimal round
    if (!Math.round10) {
        Math.round10 = function(value, exp) {
            return decimalAdjust('round', value, exp);
        };
    }
    // Decimal floor
    if (!Math.floor10) {
        Math.floor10 = function(value, exp) {
            return decimalAdjust('floor', value, exp);
        };
    }
    // Decimal ceil
    if (!Math.ceil10) {
        Math.ceil10 = function(value, exp) {
            return decimalAdjust('ceil', value, exp);
        };
    }
})();
