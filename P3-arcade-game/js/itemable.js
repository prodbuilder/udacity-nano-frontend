// interface renderable, for dialog and scorer
var Renderable = function() {
    this.visible = false;
};
Renderable.prototype.render = function() {
    if (this.visible) {
        this.draw();
    }
};
Renderable.prototype.show = function() {
    this.visible = true;
};
Renderable.prototype.hide = function() {
    this.visible = false;
};
Renderable.prototype.draw = function() {
};


// interface for items that can be shown
// to be inherited by enemy, player, gems, rock
var Itemable = function(x, y, sprite, width, visibleWidth) {
    this.sprite = sprite;
    this.width = width;
    this.visibleWidth = visibleWidth;

    this.initX = x;
    this.initY = y;
    this.x = this.initX;
    this.y = this.initY;
};

// inherit from renderable
Itemable.prototype = Object.create(Renderable.prototype);
Itemable.prototype.constructor = Itemable;

// reset location
Itemable.prototype.reset = function() {
    this.x = this.initX;
    this.y = this.initY;
};

// override draw method
Itemable.prototype.draw = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// check overlap related methods
Itemable.prototype.leftX = function() {
    return this.x + this.width / 2 - this.visibleWidth / 2;
};
Itemable.prototype.rightX = function() {
    return this.x + this.width / 2 + this.visibleWidth / 2;
};
Itemable.prototype.overlap = function(that) {
    return (that instanceof Itemable) &&
        (Math.abs(this.y - that.y) < 20) &&
        ((this.leftX() <= that.leftX() && that.leftX() <= this.rightX()) ||
            (this.leftX() <= that.rightX() && that.rightX() <= this.rightX()));
};
Itemable.prototype.overlapAny = function(those) {
    var any_overlap = false;
    those.forEach(function(that) {
        if (that.overlap(this)) {
            any_overlap = true;
        }
    });
    return any_overlap;
};
