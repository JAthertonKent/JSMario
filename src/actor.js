"use strict";

var actor = function(spec) {
    var that = entity(spec);

    that.turnRightAndMove = function() {
        that.sprite.switchImage(that.position, 'img/mario.gif');

        that.acceleration.setX(0.1);
    };

    that.turnLeftAndMove = function() {
        that.sprite.switchImage(that.position, 'img/leftMario.gif');

        that.acceleration.setX(-0.1);
    };

    that.moveUp = function() {
        var bound = 0;
        that.velocity.setY(-4);
        that.position.addY(-that.step);
    };

    return that;
};

