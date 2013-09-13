"use strict";

function Ground(position, sprite) {
    this.position = position;
    this.sprite = sprite;

    this.positions = new Array(); 
    _.each(_.range(70), function(x){ this.push(new Entity2d(new Vector2d(x*24 , 450), sprite)) }, this.positions);    
}

Ground.prototype = new Entity2d();

Ground.prototype.draw = function() {
    var drawIt = function(it){ it.draw() }
    _.each(this.positions, drawIt);
};

Ground.prototype.moveLeft = function() {
    var moveItLeft = function(it){ it.moveLeft() }
    _.each(this.positions, moveItLeft);
};
 //it.getX() <= -795 ? it.addX(1595) : it.addX(-5) 
