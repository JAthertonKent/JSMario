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
        resolveCollision(entity,base);
        //entity.placeAt(vector(entity.getX(), base.getY() - entity.getHeight()));
    }

    function resolveCollision(player, entity){
        // Find the mid points of the entity and player
        var pHalfWidth = player.getWidth() * .5;
        var pHalfHeight = player.getHeight() * .5; 
        var pMidX = pHalfWidth + player.getX();
        var pMidY = pHalfHeight + player.getY();

        var aHalfWidth = (entity.getWidth() * .5);
        var aHalfHeight = (entity.getHeight() * .5);
        var aMidX = aHalfWidth + entity.getX();
        var aMidY = aHalfHeight + entity.getY();
        // To find the side of entry calculate based on
        // the normalized sides
        var dx = (aMidX - pMidX) / aHalfWidth;
        var dy = (aMidY - pMidY) / aHalfHeight; 
        // Calculate the absolute change in x and y
        var absDX = Math.abs(dx);
        var absDY = Math.abs(dy);
        // If the distance between the normalized x and y
        // position is less than a small threshold (.1 in this case)
        // then this object is approaching from a corner
        if (Math.abs(absDX - absDY) < .1) {
            // If the player is approaching from positive X
            if (dx < 0) {
                // Set the player x to the right side
                player.placeAt(vector(entity.getX() + entity.getWidth(), player.getY()));
            // If the player is approaching from negative X
            } else {
                // Set the player x to the left side
                player.placeAt(vector(entity.getY() - player.getWidth(), player.getY()));
            }
            // If the player is approaching from positive Y
            if (dy < 0) {
                // Set the player y to the bottom
                player.placeAt(vector(player.getX(), entity.getY() + entity.getHeight()));
            // If the player is approaching from negative Y
            } else {
                // Set the player y to the top
                player.placeAt(vector(player.getX(), entity.getY() - player.getHeight()));
            }
        // If the object is approaching from the sides
        } else if (absDX > absDY) {
            // If the player is approaching from positive X
            if (dx < 0) {
                player.placeAt(vector(entity.getX() + entity.getWidth(), player.getY()));
            } else {
            // If the player is approaching from negative X
                player.placeAt(vector(entity.getX() - player.getWidth(), player.getY()));
            }
            // TODO: Add X Velocity component
            // If this collision is coming from the top or bottom more
            } else {
                // If the player is approaching from positive Y
                if (dy < 0) {
                    player.placeAt(vector(player.getX(), entity.getY() + entity.getHeight()));
                } else {
                // If the player is approaching from negative Y
                    player.placeAt(vector(player.getX(), entity.getY() - player.getHeight()));
                }
                // TODO: Add Y Velocity component
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

    that.initializeMobileEntities();
    return that;
}

