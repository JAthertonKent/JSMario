"use strict";

function Scene(context){
    this.background = new Entity2d(new Vector2d(0, 0), new Sprite(context, 'img/bg.jpg'));
    this.mario = new Entity2d(new Vector2d(200, 100), new Sprite(context, 'http://www.dan-dare.org/Dan%20Mario/SMB1MarioSmallAni.gif'));    
}

Scene.prototype.draw = function (){
    this.background.draw();
    this.mario.draw();
};

Scene.prototype.keypress = function (event) {
    var leftArrow = 37;
    var upArrow = 38;
    var rightArrow = 39;
    var downArrow = 40;
    switch (event.which) {
        case  leftArrow:
            this.background.moveRight();
            break;
        case  upArrow:
            this.mario.moveUp();
            break;
        case  rightArrow:
            this.background.moveLeft();
            break;
        case  downArrow:
            this.mario.moveDown();
            break;
    }

};