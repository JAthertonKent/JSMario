"use strict";

function Actor(position, sprite) {
    this.position = position;
    this.sprite = sprite;
    this.step = 5;
}

Actor.prototype = new Entity2d();

Actor.prototype.turnRightAndMove = function() {
    this.sprite.switchImage(this.position, 'img/mario.gif');

    this.moveRight();
};


Actor.prototype.turnLeftAndMove = function() {
    this.sprite.switchImage(this.position, 'img/leftMario.gif');

    this.moveLeft();
};

Actor.prototype.moveLeft = function() {
    this.position.getX() <= this.step ? this.position.addX(0) : this.position.addX(-this.step);
};

Actor.prototype.moveUp = function() {
    var bound = 0;
    this.velocity = -4; // stinky
    this.position.addY(-this.step);
};
