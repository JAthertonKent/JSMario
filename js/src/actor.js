"use strict";

function Actor(position, sprite) {
    this.position = position;
    this.sprite = sprite;
    this.step = 5;
    this.velocity = 0;
    this.acceleration = .15;
    this.groundY = 400;
}

Actor.prototype = new Entity2d();

Actor.prototype.moveLeft = function() {
    this.sprite.flipImage(this.position, 'img/leftMario.gif');

    return this.position.getX() <= 5 ? this.position.addX(0) : this.position.addX(-this.step);
};

Actor.prototype.moveRight = function() {
    this.sprite.flipImage(this.position, 'img/mario.gif');

    //TODO: remove reference to game.scene.background, mario shouldnt tell the
    //backgrounds to start moving
    if (this.position.getX() > 400) {
        game.scene.background.moveLeft();
    } else { 
        return this.position.addX(this.step);
    }
};

Actor.prototype.moveUp = function() {
    var bound = 0;
    return this.position.getY() < bound ? this.position.addY(-this.position.getY()) : this.position.addY(-this.step);
};

Actor.prototype.moveDown = function(step) {
    step = step || this.step;
    return this.position.getY() > this.groundY ? this.position.addY(-(this.position.getY() - this.groundY)) : this.position.addY(step);
};

