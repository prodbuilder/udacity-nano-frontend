Project 3 - Arcade Game
===============================


## How to run
Call `python -m SimpleHTTPServer` from project directory and open `index.html` from browser.

## Features
- At start of game (page load), user can chooser player avatar with number keys `1`-`5`, hit `enter` to confirm
- Game board components:
    - player, moves with `up` `down` `left` `right` arrow keys
    - player can not move off screen
    - enemy bugs, run across the screen and loop over
    - player loses a life if hit a bug
    - game resets when losing a life
    - game wins when player reaches= water
    - level: game levels up when player reaches water
    - gems, player can collect and earn score
        + different colored gems have different values
    - rocks: player can't walk over a rock
    - timer: game times out after a number of seconds
    - level decides:
        + number and speed of enemies
        + number of rocks
        + number of gems
    - life: game resets when player runs out of life
    - `Esc` can pause and resume game
    - score is calculated with winning and gem values collected


## Notes and Questions
- Used HTML5 canvas
- Used two patterns of OO:
    - `Child.prototype = Object.create(Parent.prototype)`
    - `Mixin.call(Child.prototype)`
- Failed to create new method on `Itemable` that checks overlap of an array of `[Itemable]`. 


## TODO
- At start of each new game, let user use chooser to pick avatar again. Currently this function only shows up once on page load. 
- Finer control of game state
- More separation of different classes. 
- Jasmine tests


## Project requirement
- [Project description](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).
- Rubric
![rubric](http://lh3.googleusercontent.com/OdKVKhSwOR1hi9KdNsL0e24va_omApWZCWVyEo03wcR4vZTQscAGBb8aBEQXNukLwZS5SLk3i6GQjF9ZIOBH=s0#w=972&h=618)
