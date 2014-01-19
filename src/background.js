"use strict";

var background = function(spec) {
    var that = entity(spec);
    that.ptwo = vector(800,0);

    that.draw = function() {
        that.sprite.draw(that.position);
        that.sprite.draw(that.ptwo);
    };

    that.moveLeft = function() {
        that.ptwo.getX() <= -795 ? that.ptwo.addX(1595) : that.ptwo.addX(-that.step);
        that.position.getX() <= -795 ? that.position.addX(1595) : that.position.addX(-that.step);
    };

    return that;
};
