"use strict";

// TODO replace pseudoclass pattern
function Physics(mobileEntities, ground) {
    this.mobileEntityArray = mobileEntities;
    this.ground = ground;

    this.initializeMobileEntities();
}

Physics.prototype.initializeMobileEntities = function() {
    _.each(this.mobileEntityArray, function(it){
        it.velocity = vector(0, 0);
        it.acceleration = vector(0, 0.15);
        it.maxVelocityX = 5;
    });
};

Physics.prototype.applyEffects = function() {
    // TODO merge these calls to _.each()
    _.each(this.mobileEntityArray, function(it) {
        this.increaseVelocity(it);
        this.keepWithinBounds(it);
    }, this);

    // TODO get rid of nested calls to _.each()
    _.each(this.mobileEntityArray, function(entity) {
        _.each(this.ground, function(it) {
            _.each(it.positions, keepOnGround, this)
        }, entity); 
    }, this);

    _.each(this.mobileEntityArray, function(it) {
        it.pushDown(it.velocity.getY());
        it.pushRight(it.velocity.getX());
    });
}


Physics.prototype.keepWithinBounds = function (mobileEntity) {
    if (mobileEntity.position.getX() < mobileEntity.step) {
        mobileEntity.acceleration.setX(0);
        mobileEntity.velocity.setX(0);
        mobileEntity.position.setX(mobileEntity.step);
    }
}

Physics.prototype.increaseVelocity = function (mobileEntity) {
    if (mobileEntity.maxVelocityX) {
        enforceMaxVelocity(mobileEntity);
    }
    mobileEntity.velocity.addY(mobileEntity.acceleration.getY());
    mobileEntity.velocity.addX(mobileEntity.acceleration.getX());
}

// TODO remove physics functions from global scope
function enforceMaxVelocity(mobileEntity) {
    var fastestSafeVelocity = mobileEntity.maxVelocityX - 1e-5;
    if (mobileEntity.velocity.getX() > mobileEntity.maxVelocityX) {
        mobileEntity.velocity.setX(fastestSafeVelocity);
        mobileEntity.acceleration.setX(0);
    } else if (mobileEntity.velocity.getX() < -mobileEntity.maxVelocityX) {
        mobileEntity.velocity.setX(-fastestSafeVelocity);
        mobileEntity.acceleration.setX(0);
    }
}

function keepOnGround(it){
    if (isCollide(it, this)) {
        placeOnTopOf(this, it);
        this.velocity.setY(0);
    }
}

function placeOnTopOf(entity, base) {
    entity.placeAt(vector(entity.getX(), base.getY() - entity.getHeight()));
}

function isCollide(a, b) {
    return !(
        ((a.getY() + a.getHeight()) < (b.getY())) ||
        (a.getY() > (b.getY() + b.getHeight())) ||
        ((a.getX() + a.getWidth()) < b.getX()) ||
        (a.getX() > (b.getX() + b.getWidth()))
    );
}
