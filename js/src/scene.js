"use strict";

//Background should always be the first entity and the actor the second
function Scene(entities, physics){
    this.entities = entities;
    this.physics = physics;
}

Scene.prototype.drawScene = function (){
    this.physics.applyEffects();
    this.keepFromFarRight(); 

    _.each(this.entities, function(it){it.draw()});
};

Scene.prototype.keepFromFarRight = function (){
    if (this.entities[1].getX() > 400) {
        _.each(this.entities, function(it){it.moveLeft()});
    }
}



