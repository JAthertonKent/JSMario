"use strict";

function Physics(mobileEntity, ground) {
    this.mobileEntity = mobileEntity;
    this.mobileEntity.velocity = 0;
    this.mobileEntity.acceleration = .15;
    this.ground = ground;
}

Physics.prototype.applyEffects = function() {
    this.increaseVelocity(this.mobileEntity);
    _.each(this.ground.positions, this.keepOnGround, this);
    this.mobileEntity.pushDown(this.mobileEntity.velocity);
}

Physics.prototype.keepOnGround = function (it){
    if (isCollide(it, this.mobileEntity)) {
        placeOnTopOf(this.mobileEntity, it);
        this.mobileEntity.velocity = 0;
    }
}

Physics.prototype.increaseVelocity = function (mobileEntity) {
    mobileEntity.velocity += mobileEntity.acceleration;
}

function placeOnTopOf(entity, base) {
    entity.placeAt(new Vector2d(entity.getX(), base.getY() - entity.getHeight()));
}

function isCollide(a, b) {
    return !(
        ((a.getY() + a.getHeight()) < (b.getY())) ||
        (a.getY() > (b.getY() + b.getHeight())) ||
        ((a.getX() + a.getWidth()) < b.getX()) ||
        (a.getX() > (b.getX() + b.getWidth()))
    );
}
