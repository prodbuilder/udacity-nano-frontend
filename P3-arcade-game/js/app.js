

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
    console.log('~~~~~~~~ Init entities ~~~~~~~~~~~');
    allEnemies = [];
    allGems = [];
    allRocks = [];
    dialog = new Dialog();
    chooser = new Chooser();
    player = new Player();
    game = new Game();
    scorer = new Scorer();
    game.setLevel();
    chooser.show();
    HELPER_SHOW_STATUS();
}



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    game.handleInput(e);
});
