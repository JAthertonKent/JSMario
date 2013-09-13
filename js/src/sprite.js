"use strict";

function Sprite(context, imageSource) {
    this.context = context;
    this.image = new Image();
    this.image.src = imageSource;
    this.flipped = false;
}

Sprite.prototype.draw = function(position) {
    this.context.drawImage(this.image, position.getX(), position.getY());
};

Sprite.prototype.switchImage = function (position, newImageSource) {
	//this.context.clearRect(position.getX(), position.getY(), this.image.width/2, this.image.height);
	//this.image.src = 'img/mario_map.png';
	//this.context.drawImage(this.image, 36, 0, 36, 44, position.getX(), position.getY(), 36, 44);
    this.image.src = newImageSource;
	console.log('flip');
};
