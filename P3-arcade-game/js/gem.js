Gem = function(color, x, y) {
    // color has to be among 'Orange', 'Blue', 'Green'
    // otherwise, set to blue
    color = GEM_VALUES.hasOwnProperty(color) ? color : 'Blue';
    var sprite = 'images/Gem ' + color + '.png',
        width = 101,
        visibleWidth = 80;
    x = (typeof x === 'undefined' ? 2 : x) * STEP_WIDTH;
    y = (typeof y === 'undefined' ? 5 : y) * STEP_HEIGHT - 20;

    Itemable.call(this, x, y, sprite, width, visibleWidth);
    this.value = GEM_VALUES[color];
};
Gem.prototype = Object.create(Itemable.prototype);
Gem.prototype.constructor = Gem;
canActivate.call(Gem.prototype);

Gem.prototype.draw = function() {
    Itemable.prototype.draw.call(this);
    this.drawValue();
};

Gem.prototype.drawValue = function() {
    ctx.font = '30px sans-serif';
    ctx.fillStyle = COLOR_OFFWHITE;
    ctx.textAlign = 'center';
    ctx.fillText(this.value, (this.col() - 0.5) * STEP_WIDTH, (this.row() + 0.9) * STEP_HEIGHT);
}
