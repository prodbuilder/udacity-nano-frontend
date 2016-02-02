
// interface for items that can be shown
// to be inherited by enemy, player, gems
var Itemable = function(x, y, sprite, width, visibleWidth) {
    this.x = x;
    this.y = y;
    this.initX = x;
    this.initY = y;
    this.sprite = sprite;
    this.width = width;
    this.visibleWidth = visibleWidth;
}
Itemable.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Itemable.prototype.leftX = function() {
    return this.x + this.width/2 - this.visibleWidth/2;
}
Itemable.prototype.rightX = function() {
    return this.x + this.width/2 + this.visibleWidth/2;
}
Itemable.prototype.overlap = function(that) {
    return (that instanceof Itemable) &&
        ( Math.abs(this.y - that.y) < 20 ) &&
        ( (this.leftX() <= that.leftX() && that.leftX() <= this.rightX())
            ||
          (this.leftX() <= that.rightX() && that.rightX() <= this.rightX()) );
}
Itemable.prototype.reset = function() {
    this.x = this.initX;
    this.y = this.initY;
}