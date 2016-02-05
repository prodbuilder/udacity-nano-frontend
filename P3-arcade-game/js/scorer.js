// Scorer, keep level, score, life, time
var Scorer = function() {
    this.reset();
};
// inherit from renderable
Scorer.prototype = Object.create(Renderable.prototype);
Scorer.prototype.constructor = Scorer;
// add canActivate mixin
canActivate.call(Scorer.prototype);

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
};
Scorer.prototype.draw = function() {
    ctx.font = '16px sans-serif';
    ctx.fillStyle = COLOR_OFFWHITE;
    ctx.textAlign = 'left';

    ctx.fillText('Elapsed: ' + Math.round10(this.timeElapsed, -1),
        20, MAX_HEIGHT - 35);
    ctx.fillText('/ ' + MAX_DURATION,
        115, MAX_HEIGHT - 35);
    ctx.fillText('Level:', 200, MAX_HEIGHT - 35);

    for (var i = 0; i < this.level; i++) {
        ctx.drawImage(Resources.get(SPRITE_STAR), 0, 0, STEP_WIDTH, PLAYER_HEIGHT,
            250 + i * 0.2 * STEP_WIDTH, MAX_HEIGHT - 70,
            0.3 * STEP_WIDTH, 0.3 * PLAYER_HEIGHT);
    }

    ctx.font = '36px sans-serif';
    ctx.fillText('Score: ' + this.score, 20, 100);
    for (i = 0; i < this.life; i++) {
        ctx.drawImage(Resources.get(player.sprite), 0, 0, STEP_WIDTH, PLAYER_HEIGHT,
            MAX_WIDTH - 40 - i * 0.3 * STEP_WIDTH, MAX_HEIGHT - 83,
            0.4 * STEP_WIDTH, 0.4 * PLAYER_HEIGHT);
    }
};

Scorer.prototype.update = function(dt) {
    if (this.active) {
        this.timeElapsed += dt;
    }
};
Scorer.prototype.win = function() {
    this.score += this.level * SCORE_WIN;
    this.level++;
};
