"use strict";

var game = game || {};

game.canvas = document.getElementById('gameOne');
game.context = game.canvas.getContext('2d');
game.scene = new Scene(game.context);
(function (window) {
    
    function gameLoop() {
        game.context.clearRect(0, 0, 800, 450);
        game.scene.draw();

    }

    window.setInterval(gameLoop, 1000 / 60); // 60fps

}(window));

$(document.body).on('keydown', function (event) {
    game.scene.keypress(event);
});
