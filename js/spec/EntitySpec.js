describe("Entity2d", function () {
    var background;
    var position;
    var background_sprite;
    var ground, ground_sprite;

    beforeEach(function () {
        Entity2d.prototype.getHeight = function () { return 35 };
        Entity2d.prototype.getWidth = function () { return 35 };
        position = jasmine.createSpyObj('vector2d', ['getX', 'getY', 'addX', 'addY']);
        background_sprite = jasmine.createSpyObj('sprite', ['draw']);
        background = new Background(position, background_sprite);
        ground_sprite = jasmine.createSpyObj('sprite', ['draw']); 
        ground = new Ground(new Vector2d(0, 450), ground_sprite);

        
    });

    describe("Actor", function () {
        var mario, mario_sprite, scene, spyBackground;
        beforeEach(function () {
            mario_sprite = jasmine.createSpyObj('sprite', ['draw', 'switchImage']);
            mario = new Actor(position, mario_sprite);
        });
       
        it("should draw its sprite", function () {
            mario.draw();
            expect(mario_sprite.draw).toHaveBeenCalledWith(position);
        });
    
        xit("should not go underground", function() {
            mario = new Actor(new Vector2d(200, 100), mario_sprite);
            mario.draw();
            for(var i = 0; i < 100; i++){
                mario.moveDown();
            }
            expect(mario.getY()).toBeLessThan(401);
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
            mario = new Actor(new Vector2d(200, 100), mario_sprite);
            mario.moveUp();
            expect(mario.velocity).toEqual(-4);
        });

});
    
  
    describe("Background", function () {

        it("should draw background", function() {
            background = new Background(position, background_sprite);
            background.draw();
            expect(background_sprite.draw).toHaveBeenCalledWith(position);
        });

        it("should rotate back into view", function() {
            background = new Background(new Vector2d(-795, 0), background_sprite);
            background.moveLeft();
            expect(background.getX()).toBeGreaterThan(799);
        });

        it("should scroll two images at once", function() {
            background = new Background(new Vector2d(0, 0), background_sprite);
            background.draw();
            expect(background_sprite.draw.callCount).toBe(2);
        });

    });

    describe("Ground", function() {
        
        it("should draw an array of brick sprites", function() {
            var ground_sprite = jasmine.createSpyObj('sprite', ['draw']); 
            var ground = new Ground(new Vector2d(0, 450), ground_sprite);
            ground.draw();
            expect(ground_sprite.draw.callCount).toBeGreaterThan(1);
        });

        it("should scroll brick array", function() {
            var ground_sprite = jasmine.createSpyObj('sprite', ['draw']); 
            var ground = new Ground(new Vector2d(0, 450), ground_sprite);
            var expected = ground.positions[0].getX();
            var expectedTwo = ground.positions[10].getX();
            ground.moveLeft();
            expect(ground.positions[0].getX()).toEqual(expected-5);
            expect(ground.positions[10].getX()).toEqual(expectedTwo-5);

        });

    });

});
