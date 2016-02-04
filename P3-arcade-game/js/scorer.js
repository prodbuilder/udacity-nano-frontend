// Scorer
var Scorer = function() {
    this.reset();
};
// inherit from renderable
Scorer.prototype = Object.create(Renderable.prototype);
Scorer.prototype.constructor = Scorer;

Scorer.prototype.reset = function() {
    this.resetScore();
    this.resetTimer();
};

Scorer.prototype.resetTimer = function() {
    this.timeElapsed = 0;
    this.active = true;
};
Scorer.prototype.resetScore = function() {
    this.score = 0;
    this.life = MAX_LIFE;
    this.level = 1;
}
Scorer.prototype.draw = function() {
    ctx.font = '16px sans-serif';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'left';

    ctx.fillText('Elapsed seconds: ' + Math.round10(this.timeElapsed, -1),
        20, MAX_HEIGHT - 35);
    ctx.fillText('/ ' + MAX_DURATION,
        175, MAX_HEIGHT - 35);
    ctx.fillText('Level: ' + this.level, 230, MAX_HEIGHT - 35);
    ctx.fillText('Score: ' + this.score, 320, MAX_HEIGHT - 35);
    ctx.fillText('Lives: ' + this.life, 430, MAX_HEIGHT - 35);
};

Scorer.prototype.update = function(dt) {
    if (this.active) {
        this.timeElapsed += dt;
    }
};
