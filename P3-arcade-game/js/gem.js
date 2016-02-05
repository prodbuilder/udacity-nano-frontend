Gem = function(color, x, y) {
    // color has to be among 'Orange', 'Blue', 'Green'
    // otherwise, set to blue
    color = GEM_VALUES.hasOwnProperty(color) ? color : 'Blue';
    var sprite = 'images/Gem ' + color + '.png',
        width = 101,
        visibleWidth = 80;
    var x = (typeof x === 'undefined' ? 2 : x) * STEP_WIDTH;
    var y = (typeof y === 'undefined' ? 5 : y) * STEP_HEIGHT - 20;

    Itemable.call(this, x, y, sprite, width, visibleWidth);
    this.value = GEM_VALUES[color];
};
Gem.prototype = Object.create(Itemable.prototype);
Gem.prototype.constructor = Gem;
canActivate.call(Gem.prototype);
