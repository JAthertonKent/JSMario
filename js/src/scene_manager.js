"use strict";

var getDrawFunction = function (canvas, bkgImage, primarySprite, sprites) {
    var leftBound = 0;
    var rightBound = 400;
    var frameOffset = vector(0, 0);
    var context = canvas.getContext('2d');

    var clearCanvas = function () {
	context.clearRect(0, 0, canvas.width, canvas.height);
    };

    var computeFrameOffset = function () {
	var primaryPosition = primarySprite.getPosition().minus(frameOffset);

	if (primaryPosition.getX() < leftBound) {
	    frameOffset.addX(leftBound - primaryPosition.getX());			     
	} else if (primaryPosition.getY() > rightBound) {
	    frameOffset.addX(primaryPosition.getX() - rightBound);
	}
    };

    var drawBackground = function () {
	// Asssumptions: The the background image is wider than the canvas
	//               The background height is the same as the canvas
	var backgroundX = frameOffset.getX() % bkgImage.naturalWidth;
	context.drawImage(background, backgroundX, 0);
	context.drawImage(background, backgroundX - bkgImage.naturalWidth, 0);
    }

    var drawSprite = function (sprite) {
	var drawPosition = sprite.getPosition().minus(frameOffset);
	context.drawImage(sprite.getImage(), drawPosition.getX(), drawPosition.getY());
    }

    return function () {
	clearCanvas();
	computeFrameOffset();
	drawBackground();
	drawSprite(primarySprite);
	_.each(sprites, drawSprite);
    };
};
