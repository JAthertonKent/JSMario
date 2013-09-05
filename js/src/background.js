"use strict";

function Background(position, sprite) {
    this.position = position;
    this.ptwo = new Vector2d(800,0);
    this.sprite = sprite;
    this.step = 5;
}

Background.prototype = new Entity2d();

Background.prototype.draw = function() {
    this.sprite.draw(this.position);
    this.sprite.draw(this.ptwo);
};

Background.prototype.moveLeft = function() {
    this.ptwo.getX() <= -795 ? this.ptwo.addX(1595) : this.ptwo.addX(-this.step);
    return this.position.getX() <= -795 ? this.position.addX(1595) : this.position.addX(-this.step);
};

