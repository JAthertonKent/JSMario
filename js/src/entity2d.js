"use strict";

function Entity2d(position, sprite) {
    this.position = position;
    this.sprite = sprite;
    this.step = 5;
}

Entity2d.prototype.draw = function() {
    this.sprite.draw(this.position);
};

Entity2d.prototype.placeAt = function(position) {
    this.position = position;
};

Entity2d.prototype.getX = function() {
    return this.position.getX();
};

Entity2d.prototype.getY = function() {
    return this.position.getY();
};

Entity2d.prototype.getHeight = function() {
    return this.sprite.image.height;
};

Entity2d.prototype.getWidth = function() {
    return this.sprite.image.width;
};

Entity2d.prototype.moveLeft = function() {
    this.position.addX(-this.step);
};

Entity2d.prototype.moveRight = function() {
    this.position.addX(this.step);
};

Entity2d.prototype.moveUp = function() {
    this.position.addY(-this.step);
};

Entity2d.prototype.moveDown = function() {
    this.position.addY(this.step);
};

