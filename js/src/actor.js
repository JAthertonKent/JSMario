"use strict";

function Actor(position, sprite) {
    this.position = position;
    this.sprite = sprite;
    this.step = 5;
}

Actor.prototype = new Entity2d();

Actor.prototype.moveLeft = function() {
    this.sprite.switchImage(this.position, 'img/leftMario.gif');

    this.pushBack();
};

Actor.prototype.moveRight = function() {
    this.sprite.switchImage(this.position, 'img/mario.gif');

    this.position.addX(this.step);
};

Actor.prototype.moveUp = function() {
    var bound = 0;
    this.velocity = -4; // stinky
    this.position.addY(-this.step);
};

Actor.prototype.moveDown = function(step) {
    step = step || this.step;
    this.position.addY(step);
};

Actor.prototype.pushBack = function() {
    this.position.getX() <= this.step ? this.position.addX(0) : this.position.addX(-this.step);
};

