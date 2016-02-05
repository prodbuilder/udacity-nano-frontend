Rock = function(x, y) {
    // color has to be among 'Orange', 'Blue', 'Green'
    // otherwise, set to blue
    var sprite = 'images/Rock.png',
        width = 101,
        visibleWidth = 60;
    x = (typeof x === 'undefined' ? 2 : x) * STEP_WIDTH;
    y = (typeof y === 'undefined' ? 5 : y) * STEP_HEIGHT - 20;

    Itemable.call(this, x, y, sprite, width, visibleWidth);
};
Rock.prototype = Object.create(Itemable.prototype);
Rock.prototype.constructor = Rock;
