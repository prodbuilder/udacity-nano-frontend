// superclass: Renderable
//             Itemable
// mixin:      canActivate

// interface renderable, for dialog and scorer
var Renderable = function() {
    this.init();
};
Renderable.prototype.init = function() {
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
Renderable.prototype.draw = function() {};


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
    this.init();
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

Itemable.prototype.row = function() {
    return Math.round(this.y / STEP_HEIGHT);
};

Itemable.prototype.col = function() {
    return Math.round(this.x / STEP_WIDTH) + 1;
};

Itemable.prototype.overlap = function(that) {
    return (that instanceof Itemable) &&
        this.row() == that.row() &&
        ((this.leftX() <= that.leftX() && that.leftX() <= this.rightX()) ||
            (this.leftX() <= that.rightX() && that.rightX() <= this.rightX() ||
                (that.leftX() <= this.leftX() && this.leftX() <= that.rightX()) ||
                (that.leftX() <= this.rightX() && this.rightX() <= that.rightX())
            )
        );
};

/* lots of learning here, do not delete!! */

// Itemable.prototype.overlapAny = function(those) {
//     var _this = this;
//     console.log('in overlapAny');
//     console.log(_this);

//     var has_overlap = false;
//     those.forEach(function(that) {
//         if (that.visible && that.overlap(_this)) {
//             has_overlap = true;
//         }
//     });
//     // return has_overlap; // works


//     // return those.some(_this.overlap); // does not work
//     // return those.some(this.overlap).bind(this); // does not work
//     // return those.some(_this.overlap).bind(_this); // does not work
//     var overlapFun = function(that) {
//         return _this.overlap(that);
//     };
//     return those.some(overlapFun); // works
// };


Itemable.prototype.overlapAny = function(those) {
    var _this = this;
    var overlapFun = function(that) {
        return _this.overlap(that);
    };
    return those.some(overlapFun); // works
}; // works

// Itemable.prototype.overlapAny = function(those) {
//     var _this = this;
//     return those.some(_this.overlap.bind(_this)); // does not work
// };


//helper print function for debugging
Itemable.prototype.print = function() {
    console.log('Row = ' + this.row() + ', Col=' + this.col() + ', Id=' + this.id, this);
};

// a mixin for "activate"-able objects
var canActivate = function() {
    this.activate = function() {
        this.active = true;
    };
    this.deactivate = function(bool) {
        this.active = false;
    };
    return this;
};
