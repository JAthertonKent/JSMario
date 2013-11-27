"use strict";

var actor = function(spec) {
    var that = entity(spec);

    that.turnRightAndMove = function() {
        that.sprite.switchImage(that.position, 'img/mario.gif');

        that.moveRight();
    };


    that.turnLeftAndMove = function() {
        that.sprite.switchImage(that.position, 'img/leftMario.gif');

        that.moveLeft();
    };

    that.moveLeft = function() {
        that.position.getX() <= that.step ? that.position.addX(0) : that.position.addX(-that.step);
    };

    that.moveUp = function() {
        var bound = 0;
        that.velocity.setY(-4);
        that.position.addY(-that.step);
    };

    return that;
};
