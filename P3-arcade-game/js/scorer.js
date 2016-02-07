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
    this.collectedGems = [];
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
    this.drawTime();
    this.drawLevel();
    this.drawLife();
    this.drawCollectedGem();
    this.drawScore();
};

Scorer.prototype.drawTime = function() {
    ctx.font = '16px sans-serif';
    ctx.fillStyle = COLOR_OFFWHITE;
    ctx.textAlign = 'left';
    ctx.fillText('Elapsed: ' + Math.round10(this.timeElapsed, -1),
        20, MAX_HEIGHT - 35);
    ctx.fillText('/ ' + MAX_DURATION,
        120, MAX_HEIGHT - 35);
};
Scorer.prototype.drawLevel = function() {
    ctx.font = '16px sans-serif';
    ctx.fillStyle = COLOR_OFFWHITE;
    ctx.textAlign = 'left';
    ctx.fillText('Level:', 200, MAX_HEIGHT - 35);
    for (var i = 0; i < this.level; i++) {
        ctx.drawImage(Resources.get(SPRITE_STAR), 0, 0, STEP_WIDTH, PLAYER_HEIGHT,
            250 + i * 0.2 * STEP_WIDTH, MAX_HEIGHT - 70,
            0.3 * STEP_WIDTH, 0.3 * PLAYER_HEIGHT);
    }
};
Scorer.prototype.drawScore = function() {
    ctx.font = '36px sans-serif';
    ctx.fillText('Score: ' + this.score, 20, 100);
};
Scorer.prototype.drawLife = function() {
    for (var i = 0; i < this.life; i++) {
        ctx.drawImage(Resources.get(this.sprite), 0, 0, STEP_WIDTH, PLAYER_HEIGHT,
            MAX_WIDTH - 45 - i * 0.3 * STEP_WIDTH, MAX_HEIGHT - 83,
            0.4 * STEP_WIDTH, 0.4 * PLAYER_HEIGHT);

    }
};
Scorer.prototype.drawCollectedGem = function() {
    var gem, row, col;
    for (var i = 0; i < this.collectedGems.length; i++) {
        gem = this.collectedGems[i];
        row = i % 2;
        col = Math.round((i + 1) / 2);
        ctx.drawImage(Resources.get(gem.sprite), 0, 0, STEP_WIDTH, PLAYER_HEIGHT,
            MAX_WIDTH - 10 - col * 0.25 * STEP_WIDTH, 50 + row * 0.2 * PLAYER_HEIGHT,
            0.25 * STEP_WIDTH, 0.25 * PLAYER_HEIGHT);
    }
};
Scorer.prototype.update = function(dt) {
    if (this.active) {
        this.timeElapsed += dt;
    }
};
Scorer.prototype.percentTimeRemain = function() {
    return (MAX_DURATION - this.timeElapsed) / MAX_DURATION;
};
Scorer.prototype.timeScore = function() {
    return Math.round(this.percentTimeRemain() * SCORE_TIME);
};
Scorer.prototype.winScore = function() {
    return this.level * SCORE_WIN;
};
Scorer.prototype.win = function() {
    this.score += this.winScore() + this.timeScore();
    this.level++;
};
Scorer.prototype.lose = function() {
    this.score += this.timeScore();
    this.life--;
};
Scorer.prototype.addScore = function(s) {
    this.score += s;
};
Scorer.prototype.addGem = function(gem) {
    if (gem instanceof Gem) {
        this.addScore(gem.value);
        this.collectedGems.push(gem);
    }
};
Scorer.prototype.setAvatar = function(sprite) {
    this.sprite = sprite;
};
Scorer.prototype.timedOut = function(sprite) {
    return this.timeElapsed > MAX_DURATION;
};
Scorer.prototype.lifeOut = function(sprite) {
    return this.life <= 0;
};

Scorer.prototype.num_enemy = function() {
    return this.level + 2;
};
Scorer.prototype.num_rock = function() {
    // set upper bound, so rocks dont' complete block off water
    return Math.min(MAX_COL - 1,
        this.level - 1);
};
Scorer.prototype.num_gem = function() {
    // upper bound, so there are always enough space to place gems
    return Math.min(MAX_COL * MAX_ROW - this.num_rock(),
        this.level + 1);
};
