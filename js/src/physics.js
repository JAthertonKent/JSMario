"use strict";

function Physics(entity) {
    this.entity = entity;
}

Physics.prototype.applyEffects = function() {
    this.entity.moveDown(this.entity.velocity);
    this.increaseVelocityIfNotGrounded(this.entity);
}

Physics.prototype.increaseVelocityIfNotGrounded = function (entity) {
    if (entity.position.getY() > entity.groundY) {
        entity.velocity = 0;
    } else {
        entity.velocity += entity.acceleration;
    }
}

function isCollide(a, b) {
    return !(
        ((a.getY() + a.getHeight()) < (b.getY())) ||
        (a.getY() > (b.getY() + b.getHeight())) ||
        ((a.getX() + a.getWidth()) < b.getX()) ||
        (a.getX() > (b.getX() + b.getWidth()))
    );
}
