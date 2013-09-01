"use strict";

function Entity2d(position, sprite) {
    this.position = position;
    this.sprite = sprite;
    this.step = 5;
}

Entity2d.prototype.draw = function() {
    this.sprite.draw(this.position);
};

Entity2d.prototype.getX = function() {
    return this.position.getX();
};

Entity2d.prototype.getY = function() {
    return this.position.getY();
};

Entity2d.prototype.moveLeft = function() {
    return this.position.getX() <= 5 ? this.position.addX(this.step) : this.position.addX(-this.step);
    //return this.position.addX(-this.step);
};

Entity2d.prototype.moveRight = function() {
    return this.position.addX(this.step);
};

Entity2d.prototype.moveUp = function() {
    var bound = 0;
    return this.position.getY() < bound ? this.position.addY(-this.position.getY()) : this.position.addY(-this.step);
};

Entity2d.prototype.moveDown = function() {
    var bound = 400;
    return this.position.getY() > bound ? this.position.addY(-(this.position.getY()-bound)) : this.position.addY(this.step);
};

