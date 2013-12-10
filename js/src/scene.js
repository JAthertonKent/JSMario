"use strict";

//Background should always be the first entity and the actor the second
var scene = function (entities, physics) {
    var that = {};

    that.entities = entities;
    that.physics = physics;

    that.drawScene = function (){
        that.physics.applyEffects();
        that.keepFromFarRight(); 

        _.each(that.entities, function(it){it.draw()});
    }

    that.keepFromFarRight = function (){
        var halfOfBackgroundWidth = 400;
        if (that.entities[1].getX() > halfOfBackgroundWidth) {
            _.each(that.entities, function(it){it.moveLeft()});
        }
    }

    return that;
}

