/* timer and score and lives*/

// Timer
Timer = function() {
    this.reset();
};
Timer.prototype.reset = function() {
    this.timeElapsed = 0;
    this.active = true;
    this.visible = false;
};
Timer.prototype.render = function() {
    if (this.visible) {
        this.draw();
    }
};
Timer.prototype.draw = function() {
    ctx.font = '16px sans-serif';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'left';
    ctx.fillText('Elapsed seconds: ' + Math.round10(this.timeElapsed, -1),
        30, max_height - 35);
};
Timer.prototype.update = function(dt) {
    if (this.active) {
        this.timeElapsed += dt;
    }
};


// Scorer
var Scorer = function() {
    this.reset();
};
Scorer.prototype.reset = function() {
    this.score = 0;
    this.life = MAX_LIFE;
    this.visible = false;
};
Scorer.prototype.render = function() {
    if (this.visible) {
        this.draw();
    }
};
Scorer.prototype.draw = function() {
    ctx.font = '16px sans-serif';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'left';
    ctx.fillText('Score: ' + this.score, 280, max_height - 35);
    ctx.fillText('Lives: ' + this.life, 430, max_height - 35);
};

