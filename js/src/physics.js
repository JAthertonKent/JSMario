"use strict";

function Physics(mobileEntities, ground) {
    this.mobileEntityArray = mobileEntities;
    this.ground = ground;

    this.initializeMobileEntities();
}

Physics.prototype.initializeMobileEntities = function() {
    _.each(this.mobileEntityArray, function(it){it.velocity=0; it.acceleration=.15;});
};

Physics.prototype.applyEffects = function() {
    _.each(this.mobileEntityArray, function(it){this.increaseVelocity(it)}, this);

    _.each(this.mobileEntityArray, function(entity){
        _.each(this.ground, function(it){
            _.each(it.positions, keepOnGround, this)
        }, entity); 
    }, this);

    _.each(this.mobileEntityArray, function(it){it.pushDown(it.velocity)});
}

Physics.prototype.increaseVelocity = function (mobileEntity) {
    mobileEntity.velocity += mobileEntity.acceleration;
}

function keepOnGround(it){
    if (isCollide(it, this)) {
        placeOnTopOf(this, it);
        this.velocity = 0;
    }
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
