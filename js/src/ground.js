"use strict";

function Ground(position, sprite, iter) {
    this.position = position;
    this.sprite = sprite;
    //TODO:extract method
    //     There might also be a bug when you try to init a new ground with x
    //     other than zero 
    this.positions = new Array(); 
    _.each(_.range(position.getX(), 63), function(x){ 
        this.push(new Tile(new Vector2d(iter*(x*24) , position.getY()), sprite))
    }, this.positions);    
}

Ground.prototype.draw = function() {
    var drawIt = function(it){ it.draw() }
    _.each(this.positions, drawIt);
};

Ground.prototype.moveLeft = function() {
    var moveItLeft = function(it){ it.moveLeft() }
    _.each(this.positions, moveItLeft);
};



function Tile(position, sprite) {
    this.position = position;
    this.sprite = sprite;
    this.step = 5;
}

Tile.prototype = new Entity2d();

Tile.prototype.moveLeft = function() {
    this.position.getX() <= -795 ? this.position.addX(1595) : this.position.addX(-5); 
};
