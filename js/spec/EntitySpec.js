describe("Entity2d", function () {
    var position;
    var sprite;
    var ground;

    beforeEach(function () {
        Entity2d.prototype.getHeight = function () { return 35 };
        Entity2d.prototype.getWidth = function () { return 35 };
        position = jasmine.createSpyObj('vector2d', ['getX', 'getY', 'addX', 'addY']);
        sprite = jasmine.createSpyObj('sprite', ['draw']); 
        ground = new Ground(new Vector2d(0, 450), sprite);

        
    });

    describe("Actor", function () {
        var mario, mario_sprite, scene, spyBackground;
        beforeEach(function () {
            mario_sprite = jasmine.createSpyObj('sprite', ['draw', 'switchImage']);
            mario = actor({position: position, sprite: mario_sprite});
        });
       
        it("should draw its sprite", function () {
            mario.draw();
            expect(mario_sprite.draw).toHaveBeenCalledWith(position);
        });
    
        it("should flip when walks left", function(){
            mario.turnLeftAndMove();
            expect(mario_sprite.switchImage).toHaveBeenCalled();
        });
        
        it("should flip when walks right", function(){
            mario.turnRightAndMove();
            expect(mario_sprite.switchImage).toHaveBeenCalled();
        });

        it("should jump", function () {
            mario = actor({position: new Vector2d(200, 100), sprite: mario_sprite});
            mario.moveUp();
            expect(mario.velocity).toEqual(-4);
        });

    });
    
  
    describe("Background", function () {
        var bg;
        it("should draw background", function() {
            bg = background({position: position, sprite: sprite});
            bg.draw();
            expect(sprite.draw).toHaveBeenCalledWith(position);
        });

        it("should rotate back into view", function() {
            bg = background({position: new Vector2d(-795, 0), sprite: sprite});
            bg.moveLeft();
            expect(bg.getX()).toBeGreaterThan(799);
        });

        it("should scroll two images at once", function() {
            bg = background({position: new Vector2d(0, 0), sprite: sprite});
            bg.draw();
            expect(sprite.draw.callCount).toBe(2);
        });

    });

    describe("Ground", function() {
        
        it("should draw an array of brick sprites", function() {
            var ground = new Ground(new Vector2d(0, 450), sprite);
            ground.draw();
            expect(sprite.draw.callCount).toBeGreaterThan(1);
        });

        it("should scroll brick array", function() {
            var ground = new Ground(new Vector2d(0, 450), sprite, 1);
            var expected = ground.positions[0].getX();
            var expectedTwo = ground.positions[10].getX();
            ground.moveLeft();
            expect(ground.positions[0].getX()).toEqual(expected-5);
            expect(ground.positions[10].getX()).toEqual(expectedTwo-5);

        });

    });

});
