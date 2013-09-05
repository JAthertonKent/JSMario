var gravity = function(entity) {
    entity.moveDown(entity.velocity);
    increaseVelocityIfNotGrounded(entity);
};

var increaseVelocityIfNotGrounded = function(entity) {
    if (entity.position.getY() > entity.groundY) {
        entity.velocity = 0;
    } else {
        entity.velocity += entity.acceleration;
    }
}

