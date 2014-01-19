"use strict";

var platform = function(spec) {
    var that = entity(spec);
    that.iter = spec.iter;

    that.positions = new Array(); 
    _.each(_.range(that.position.getX(), 63), function(x){
        var tilePosition = vector(that.iter*(x*24) , that.position.getY());
        this.push(tile({position: tilePosition, sprite: that.sprite}));
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

var tile = function(spec) {
    var that = entity(spec);
    var bkgWidth = 800;

    that.moveLeft = function() {
        if (that.position.getX() <= -(bkgWidth - that.step)) {
            that.position.addX(2*bkgWidth - that.step);
        } else {
            that.position.addX(-that.step);
        }
    };
    return that;
};
