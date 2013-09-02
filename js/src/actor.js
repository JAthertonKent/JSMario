"use strict";

function Actor(position, sprite) {
    this.position = position;
    this.sprite = sprite;
    this.step = 5;
}

Actor.prototype = new Entity2d();

Actor.prototype.moveLeft = function() {
    this.sprite.flipImage(this.position);

    return this.position.getX() <= 5 ? this.position.addX(0) : this.position.addX(-this.step);
};

Actor.prototype.moveRight = function() {
    //TODO: remove reference to game.scene.background, mario should tell the
    //backgrounds to start moving
    if (this.position.getX() > 400) {
        forEach(game.scene.background, Background.prototype.moveLeft);
    } else { 
        return this.position.addX(this.step);
    }
};

Actor.prototype.moveUp = function() {
    var bound = 0;
    return this.position.getY() < bound ? this.position.addY(-this.position.getY()) : this.position.addY(-this.step);
};

Actor.prototype.moveDown = function() {
    var bound = 400;
    return this.position.getY() > bound ? this.position.addY(-(this.position.getY()-bound)) : this.position.addY(this.step);
};

