describe("Entity2d", function () {
    var background;
    var mario;
    var position;
    var mario_sprite;
    var background_sprite;


    beforeEach(function () {
        position = jasmine.createSpyObj('vector2d', ['getX', 'getY', 'addX', 'addY']);
        mario_sprite = jasmine.createSpyObj('sprite', ['draw']);
        background_sprite = jasmine.createSpyObj('sprite', ['draw']);
        mario = new Entity2d(position, mario_sprite);
        background = new Entity2d(position, background_sprite);
    });

    it("should draw its sprite", function () {
        mario.draw();
        expect(mario_sprite.draw).toHaveBeenCalledWith(position);
    });

    it("should draw background", function(){
        background.draw();
        expect(background_sprite.draw).toHaveBeenCalledWith(position);
    });

    it("should not let mario go underground", function(){
        var local_mario = new Entity2d(new Vector2d(200, 100), mario_sprite);
        local_mario.draw();
        for(var i = 0; i < 100; i++){
            local_mario.moveDown();
        }
        expect(local_mario.getY()).toBeLessThan(401);
    });

    it("should not let mario get too high", function(){
        var local_mario = new Entity2d(new Vector2d(200, 100), mario_sprite);
        local_mario.draw();
        for(var i = 0; i < 100; i++){
            local_mario.moveUp();
        }
        expect(local_mario.getY()).toBeGreaterThan(-1);
    });

    it("should scroll background when mario moves left", function() {
        background = jasmine.createSpyObj('entity2d', ['moveRight', 'draw']);
        background.draw();
        mario.draw();
        game.keypress(37);
        expect(background.moveRight).toHaveBeenCalled();
    })
});