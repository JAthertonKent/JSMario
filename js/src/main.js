"use strict";

var game = game || {};

game.canvas = document.getElementById('gameOne');
game.context = game.canvas.getContext('2d');
var background = new Entity2d(new Vector2d(0, 0), new Sprite(game.context, 'img/bg.jpg'));
var secondBackground = new Entity2d(new Vector2d(800, 0), new Sprite(game.context, 'img/bg.jpg'));
var mario = new Entity2d(new Vector2d(200, 100), new Sprite(game.context, 'img/mario.gif'));

game.scene = new Scene([background, secondBackground], mario);

(function (window) {
    
    function gameLoop() {
        game.context.clearRect(0, 0, 800, 450);
        game.scene.drawScene();
    }

    window.setInterval(gameLoop, 1000 / 60); // 60fps

}(window));

$(document.body).on('keydown', function (event) {
    game.scene.keypress(event);
});
