function gravity(entity) {
    entity.moveDown(entity.velocity);
    increaseVelocityIfNotGrounded(entity);
}

function increaseVelocityIfNotGrounded(entity) {
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
