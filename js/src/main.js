"use strict";

var start = function (window) {
    var keypress = function (activeEntity) {
        var keyMap = {
            37: activeEntity.turnLeftAndMove,      //left arrow
            38: activeEntity.moveUp,               //up arrow
            39: activeEntity.turnRightAndMove,     //right arrow
            40: activeEntity.moveDown              //down arrow
        };

        return function (event) {
            keyMap[event.which] && keyMap[event.which].apply(activeEntity);
        };
    };

    var context = document.getElementById('gameOne').getContext('2d');

    var bkg = background({position: vector(0, 0), sprite: new Sprite(context, 'img/bg.jpg')});
    var mario = actor({position: vector(200, 100), sprite: new Sprite(context, 'img/mario.gif')});
    var mario1 = actor({position: vector(600, 50), sprite: new Sprite(context, 'img/mario.gif')});
    var ground = platform({position: vector(0, 450), sprite: new Sprite(context, 'img/brick.png'), iter: 1});
    var ground1 = platform({position: vector(0, 200), sprite: new Sprite(context, 'img/brick.png'), iter: 4});

    var physics = new Physics([mario], [ground, ground1]);
    //player mario needs to be second entity!!!
    var scn = scene([bkg, mario, ground, ground1], physics);

    var gameLoop = function () {
        context.clearRect(0, 0, 800, 474);
        scn.drawScene();
    }

    $(document.body).on('keydown', keypress(mario)); 
    window.setInterval(gameLoop, 1000 / 60); // 60fps
};

$(document).ready(function() {
    start(window)
});
