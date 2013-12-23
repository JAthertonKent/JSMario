var sprite = function (imageSource, entity) {
    var that = {};
    var image = new Image();

    image.src = imageSource;
    
    that.getImage = function () { return image; };
    that.getPosition = function () { return entity.getPosition(); };

    return that;
};
