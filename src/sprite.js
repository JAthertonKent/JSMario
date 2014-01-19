"use strict";

var sprite = function(context, imageSource) {
    var that = {};

    that.context = context;
    that.image = new Image();
    that.image.src = imageSource;
    that.flipped = false;

    that.draw = function(position) {
        that.context.drawImage(that.image, position.getX(), position.getY());
    };

    that.switchImage = function (position, newImageSource) {
        //that.context.clearRect(position.getX(), position.getY(), that.image.width/2, that.image.height);
        //that.image.src = 'img/mario_map.png';
        //that.context.drawImage(that.image, 36, 0, 36, 44, position.getX(), position.getY(), 36, 44);
        that.image.src = newImageSource;
    };

    return that;
}
