function HELPER_SHOW_STATUS() {
    if (DEBUG) {
        console.log('============== Current status ================');
        console.log(dialog);
        console.log(chooser);
        console.log(player);
        allEnemies.forEach(function(enemy) {
            console.log(enemy);
            if (enemy.overlap(player)) {
                console.log('    ----   this enemy overlaps player!');
            }
        });
        allRocks.forEach(function(rock) {
            console.log(rock);
            if (rock.overlap(player)) {
                console.log('    ----   this rock overlaps player!');
            }
        });
        allGems.forEach(function(gem) {
            console.log(gem);
            if (gem.overlap(player)) {
                console.log('    ----   this gem overlaps player!');
            }
        });
        if (player.overlapAny(allRocks)) {
            console.log('player overlap at least one rock!');
        }
        if (player.overlapAny(allEnemies)) {
            console.log('player overlap at least one enemy!');

        }
        if (player.overlapAny(allGems)) {
            console.log('player overlap at least one gem!');
        }
        console.log(game);
        console.log(scorer);
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
