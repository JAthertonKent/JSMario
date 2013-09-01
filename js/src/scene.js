"use strict";

function Scene(background, mario){
    this.background = background;
    this.mario = mario;
}

Scene.prototype.drawScene = function (){
    forEach(this.background, Entity2d.prototype.draw);
    this.mario.draw();
};

Scene.prototype.keypress = function (event) {
    var leftArrow = 37;
    var upArrow = 38;
    var rightArrow = 39;
    var downArrow = 40;
    switch (event.which) {
        case  leftArrow:
            this.mario.moveLeft();
            break;
        case  upArrow:
            this.mario.moveUp();
            break;
        case  rightArrow:
            forEach(this.background, Entity2d.prototype.moveLeft);
            break;
        case  downArrow:
            this.mario.moveDown();
            break;
    }

};

var forEach = function(array, functionCall) {
    for (var i = 0; i < array.length; i++) {
        functionCall.apply(array[i]);
    };
};