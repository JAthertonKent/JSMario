"use strict";

function Scene(background, mario, ground){
    this.background = background;
    this.mario = mario;
    this.ground = ground;
}

Scene.prototype.drawScene = function (){
    this.keepFromFarRight(); 

    this.background.draw();
    this.mario.draw();
    this.ground.draw();
    
    gravity(this.mario);
};

Scene.prototype.keepFromFarRight = function (){
    if (this.mario.getX() > 400) {
        this.background.moveLeft();
        this.mario.pushBack();
    }
}

Scene.prototype.keypress = function (event) {
    var keyMap = {
        37: this.mario.moveLeft,    //left arrow
        38: this.mario.moveUp,      //up arrow
        39: this.mario.moveRight,   //right arrow
        40: this.mario.moveDown     //down arrow
    };

    keyMap[event.which].apply(this.mario);
};

