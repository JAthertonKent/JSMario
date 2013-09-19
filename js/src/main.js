"use strict";

var game = game || {};

game.canvas = document.getElementById('gameOne');
game.context = game.canvas.getContext('2d');

var background = new Background(new Vector2d(0, 0), new Sprite(game.context, 'img/bg.jpg'));
var mario = new Actor(new Vector2d(200, 100), new Sprite(game.context, 'img/mario.gif'));
var mario1 = new Actor(new Vector2d(600, 50), new Sprite(game.context, 'img/mario.gif'));
var mario2 = new Entity2d(new Vector2d(300, 200), new Sprite(game.context, 'img/mario.gif'));
var mario3 = new Tile(new Vector2d(100, 50), new Sprite(game.context, 'img/mario.gif'));
var ground = new Ground(new Vector2d(0, 450), new Sprite(game.context, 'img/brick.png'), 1);
var ground2 = new Ground(new Vector2d(0, 250), new Sprite(game.context, 'img/brick.png'), 3);
var ground3 = new Ground(new Vector2d(0, 350), new Sprite(game.context, 'img/brick.png'), 3);

var start = function (window) {
    
    var physics = new Physics([mario, mario1, mario2, mario3], [ground, ground2, ground3]);
    //player mario needs to be second entity!!!
    game.scene = new Scene([background, mario, ground, mario1, mario2, mario3, ground2, ground3], physics);

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


