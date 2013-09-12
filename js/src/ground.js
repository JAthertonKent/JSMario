"use strict";

function Ground(position, sprite) {
    this.position = position;
    this.sprite = sprite;
    this.positions = new Array(); 

    _.each(_.range(35), function(x){ this.push(new Vector2d(x*24 , 450)) }, this.positions);    
}

Ground.prototype = new Entity2d();

Ground.prototype.draw = function() {
    _.each(this.positions, function(it){ this.sprite.draw(it) }, this);
}

Background.prototype.moveLeft = function() {
    this.ptwo.getX() <= -795 ? this.ptwo.addX(1595) : this.ptwo.addX(-this.step);
    this.position.getX() <= -795 ? this.position.addX(1595) : this.position.addX(-this.step);
};

