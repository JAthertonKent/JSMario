"use strict";

var game = game || {};

game.canvas = document.getElementById('gameOne');
game.context = game.canvas.getContext('2d');

var background = background({position: new Vector2d(0, 0), sprite: new Sprite(game.context, 'img/bg.jpg')});
var mario = actor({position: new Vector2d(200, 100), sprite: new Sprite(game.context, 'img/mario.gif')});
var mario1 = actor({position: new Vector2d(600, 50), sprite: new Sprite(game.context, 'img/mario.gif')});
var ground = platform({position: new Vector2d(0, 450), sprite: new Sprite(game.context, 'img/brick.png'), iter: 1});

var start = function (window) {
    
    var physics = new Physics([mario], [ground]);
    //player mario needs to be second entity!!!
    game.scene = new Scene([background, mario, ground], physics);

    function gameLoop() {
        game.context.clearRect(0, 0, 800, 474);
        game.scene.drawScene();
    }
    
    window.setInterval(gameLoop, 1000 / 60); // 60fps
};

function keypress(event) {
    var keyMap = {
        37: mario.turnLeftAndMove,      //left arrow
        38: mario.moveUp,               //up arrow
        39: mario.turnRightAndMove,     //right arrow
        40: mario.moveDown              //down arrow
    };

    keyMap[event.which].apply(mario);
};

start(window);

$(document.body).on('keydown', keypress); 


