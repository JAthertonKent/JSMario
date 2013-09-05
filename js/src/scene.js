"use strict";

function Scene(background, mario){
    this.background = background;
    this.mario = mario;
}

Scene.prototype.drawScene = function (){
    this.background.draw();
    this.mario.draw();
    
    gravity(this.mario);
};

Scene.prototype.keypress = function (event) {
    var keyMap = {
        37: this.mario.moveLeft,    //left arrow
        38: this.mario.moveUp,      //up arrow
        39: this.mario.moveRight,   //right arrow
        40: this.mario.moveDown     //down arrow
    };

    keyMap[event.which].apply(this.mario);
};

