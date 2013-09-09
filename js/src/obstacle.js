"use strict";

function Obstacle(position, sprite) {
    this.position = position;
    this.sprite = sprite;
    this.positions = new Array(); 
    
    this.positions[0] = new Vector2d(0 , 450);
    for(var i = 1; i < 60; i++){
        this.positions[i] = new Vector2d(this.positions[i-1].getX() + 24 , 450);
    }
}

Obstacle.prototype = new Entity2d();

Obstacle.prototype.draw = function() {
    for(var i = 0; i < this.positions.length; i++){
        this.sprite.draw(this.positions[i]);
    }
}
