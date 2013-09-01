"use strict";

function Background(position, sprite) {
    this.position = position;
    this.sprite = sprite;
    this.step = 5;
}

Background.prototype = new Entity2d();

Background.prototype.moveLeft = function() {
    return this.position.getX() <= -795 ? this.position.addX(1595) : this.position.addX(-this.step);
};
