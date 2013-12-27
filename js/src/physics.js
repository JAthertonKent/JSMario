"use strict";

var physics = function(mobileEntities, ground) {
    var that = {};

    that.mobileEntityArray = mobileEntities;
    that.ground = ground;

    that.initializeMobileEntities = function() {
        _.each(that.mobileEntityArray, function(it){
            it.velocity = vector(0, 0);
            it.acceleration = vector(0, 0.15);
            it.maxVelocityX = 5;
        });
    };

    that.applyEffects = function() {
        // TODO merge these calls to _.each()
        _.each(that.mobileEntityArray, function(it) {
            this.increaseVelocity(it);
            this.keepWithinBounds(it);

            it.pushDown(it.velocity.getY());
            it.pushRight(it.velocity.getX());

            // TODO get rid of nested calls to _.each()
            _.each(this.ground, function(block) {
                _.each(block.positions, keepOnGround, this)
            }, it); 
        }, that);
    }

    that.keepWithinBounds = function (mobileEntity) {
        if (mobileEntity.position.getX() < mobileEntity.step) {
            mobileEntity.acceleration.setX(0);
            mobileEntity.velocity.setX(0);
            mobileEntity.position.setX(mobileEntity.step);
        }
    }

    that.increaseVelocity = function (mobileEntity) {
        if (mobileEntity.maxVelocityX) {
            enforceMaxVelocity(mobileEntity);
        }
        mobileEntity.velocity.addY(mobileEntity.acceleration.getY());
        mobileEntity.velocity.addX(mobileEntity.acceleration.getX());
    }

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

    that.initializeMobileEntities();
    return that;
}

