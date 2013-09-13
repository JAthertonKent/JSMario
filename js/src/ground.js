"use strict";

function Ground(position, sprite) {
    this.position = position;
    this.sprite = sprite;

    this.positions = new Array(); 
    _.each(_.range(70), function(x){ this.push(new Vector2d(x*24 , 450)) }, this.positions);    
}

Ground.prototype = new Entity2d();

Ground.prototype.draw = function() {
    var drawIt = function(it){ this.sprite.draw(it) }
    _.each(this.positions, drawIt, this);
}

Ground.prototype.moveLeft = function() {
    var moveItLeft = function(it){ it.getX() <= -795 ? it.addX(1595) : it.addX(-5) }
    _.each(this.positions, moveItLeft);
};

