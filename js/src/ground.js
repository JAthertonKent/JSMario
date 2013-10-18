"use strict";

var platform = function(spec) {
    var that = entity(spec);
    that.iter = spec.iter;

    that.positions = new Array(); 
    _.each(_.range(that.position.getX(), 63), function(x){ 
        this.push(new Tile(new Vector2d(that.iter*(x*24) , that.position.getY()), that.sprite))
    }, that.positions);    

    that.draw = function() {
        var drawIt = function(it){ it.draw() }
        _.each(that.positions, drawIt);
    };

    that.moveLeft = function() {
        var moveItLeft = function(it){ it.moveLeft() }
        _.each(that.positions, moveItLeft);
    };

    return that;
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
