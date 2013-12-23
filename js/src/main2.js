"use strict";

var keyEventHandler = function (activeEntity, keyMap) {
    return function (event) {
	keyMap[event.which] && keyMap[event.which].apply(activeEntity);
    };
};

var start = function (window) {
    var canvas = document.getElementById('gameOne');

    var bkg = new Image();
    bkg.src = 'img/bg.jpg';

    var mario; // ! ! ! !
    var marioSprite; // ! ! ! !

    var draw = getDrawFunction(canvas, bkg, marioSprite, []);
    var physics = getPhysicsFunction(mario);

    var gameLoop = function () {
	physics();
	draw();
    }

    $(window).keydown(keyEventHandler(mario, {
	37: mario.runLeft,
	38: mario.tryToJump,
	39: mario.runRight
    }));
    
    $(window).keyup(keyEventHandler(mario, {
	37: mario.stopRunningLeft,
	38: mario.giveUpJumping,
	39: mario.stopRunningRight
    }));

    window.setInterval(gameLoop, 1000 / 60); // 60fps
};

$( start(window) );
