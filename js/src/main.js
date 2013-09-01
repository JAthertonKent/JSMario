"use strict";

var game = game || {};

game.canvas = document.getElementById('gameOne');
game.context = game.canvas.getContext('2d');

var background = new Background(new Vector2d(0, 0), new Sprite(game.context, 'img/bg.jpg'));
var secondBackground = new Background(new Vector2d(800, 0), new Sprite(game.context, 'img/bg.jpg'));

var mario = new Actor(new Vector2d(200, 100), new Sprite(game.context, 'img/mario.gif'));

game.scene = new Scene([background, secondBackground], mario);

var start = function (window) {
    
    function gameLoop() {
        game.context.clearRect(0, 0, 800, 450);
        game.scene.drawScene();
    }
    
    window.setInterval(gameLoop, 1000 / 60); // 60fps
};

start(window);

$(document.body).on('keydown', function (event) {
    game.scene.keypress(event);
});
