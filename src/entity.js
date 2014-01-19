"use strict";

var entity = function(spec) {
    var that = {};
    that.position = spec.position;
    that.sprite = spec.sprite;
    that.step = 5

    that.draw = function() {
        that.sprite.draw(that.position);
    };

    that.placeAt = function(position) {
        that.position = position;
    };

    that.getX = function() {
        return that.position.getX();
    };

    that.getY = function() {
        return that.position.getY();
    };

    that.getHeight = function() {
        return that.sprite.image.height;
    };

    that.getWidth = function() {
        return that.sprite.image.width;
    };

    that.moveLeft = function() {
        that.position.addX(-that.step);
    };

    // TODO compress move/push methods together
    that.moveRight = function() {
        that.position.addX(that.step);
    };

    that.pushRight = function(step) {
        that.position.addX(step);
    };

    that.moveUp = function() {
        that.position.addY(-that.step);
    };

    that.moveDown = function() {
        that.pushDown(that.step);
    };

    that.pushDown = function(step) {
        that.position.addY(step);
    };
        
    return that;
};
