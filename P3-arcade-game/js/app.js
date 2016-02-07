var game = new Game();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space',
        27: 'esc',
        72: 'help',
    };
    // TODO: this is a node module, need browserify
    // var keycode = require('keycode');
    if (DEBUG) {
        // console.log('-------||| key pressed: ' + e.keyCode , keycode(e));
        var key = allowedKeys.hasOwnProperty(e.keyCode) ? allowedKeys[e.keyCode] : 'Unknown';
        console.log('-------||| key pressed: ' + e.keyCode + ' is ' + key);
    }
    game.handleInput(allowedKeys[e.keyCode]);
});
