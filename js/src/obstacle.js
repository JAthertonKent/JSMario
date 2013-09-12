"use strict";

function Obstacle(position, sprite) {
    this.position = position;
    this.sprite = sprite;
    this.positions = new Array(); 

    _.each(_.range(35), function(x){ this.push(new Vector2d(x*24 , 450)) }, this.positions);    
}

Obstacle.prototype = new Entity2d();

Obstacle.prototype.draw = function() {
    _.each(this.positions, function(it){ this.sprite.draw(it) }, this);
}
