"use strict";

function Scene(background, mario){
    this.background = background;
    this.mario = mario;
}

Scene.prototype.draw = function (){
    for (var i = this.background.length - 1; i >= 0; i--) {
        this.background[i].draw();
    };
    // this.background.draw();
    this.mario.draw();
};

Scene.prototype.keypress = function (event) {
    var leftArrow = 37;
    var upArrow = 38;
    var rightArrow = 39;
    var downArrow = 40;
    switch (event.which) {
        case  leftArrow:
            this.background[0].moveRight();
            this.background[1].moveRight();
            break;
        case  upArrow:
            this.mario.moveUp();
            break;
        case  rightArrow:
            this.background[0].moveLeft();
            this.background[1].moveLeft();
            break;
        case  downArrow:
            this.mario.moveDown();
            break;
    }

};