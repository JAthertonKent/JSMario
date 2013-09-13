describe("Entity2d", function () {
    var position;
    var background_sprite;

    beforeEach(function () {
        position = jasmine.createSpyObj('vector2d', ['getX', 'getY', 'addX', 'addY']);
        background_sprite = jasmine.createSpyObj('sprite', ['draw']);
    });

    describe("Actor", function () {
        var mario_sprite;
        var mario;
        var ground_sprite;
        var ground;
        var spyBackground;
        var scene;

        beforeEach(function () {
            position = jasmine.createSpyObj('vector2d', ['getX', 'getY', 'addX', 'addY']);
            mario_sprite = jasmine.createSpyObj('sprite', ['draw', 'switchImage']);
            mario = new Actor(position, mario_sprite); 
            ground_sprite = jasmine.createSpyObj('sprite', ['draw']); 
            ground = new Ground(position, ground_sprite);
            spyBackground = jasmine.createSpyObj('background', ['moveRight', 'draw']);
            spyBackground.sprite = background_sprite;
            spyBackground.position = position;
            scene = new Scene(spyBackground, mario, ground);
        });
        
        it("should draw its sprite", function () {
            mario.draw();
            expect(mario_sprite.draw).toHaveBeenCalledWith(position);
        });
    
        it("should not go underground", function() {
            mario = new Actor(new Vector2d(200, 100), mario_sprite);
            mario.draw();
            for(var i = 0; i < 100; i++){
                mario.moveDown();
            }
            expect(mario.getY()).toBeLessThan(401);
        });

        it("should flip when walks left", function(){
            scene.drawScene();

            scene.keypress({which: 37});
            expect(mario_sprite.switchImage).toHaveBeenCalled();
        });
        
        it("should flip when walks right", function(){
            scene.drawScene();
            scene.keypress({which: 39});
            expect(mario_sprite.switchImage).toHaveBeenCalled();
        });

        it("should start with no velocity", function () {
            mario = new Actor(new Vector2d(200, 100), mario_sprite);
            expect(mario.velocity).toEqual(0);
        });

        it("should jump", function () {
            mario = new Actor(new Vector2d(200, 100), mario_sprite);
            mario.moveUp();
            expect(mario.velocity).toEqual(-4);
        });
});
    
  
    describe("Background", function () {
        var background;

        beforeEach(function () {
            background = new Background(position, background_sprite);
        });

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
        var ground_sprite;
        var ground;

        beforeEach(function () {
            ground_sprite = jasmine.createSpyObj('sprite', ['draw']); 
            ground = new Ground(position, ground_sprite);
        })
        
        it("should draw an array of brick sprites", function() {
            ground.draw();
            expect(ground_sprite.draw.callCount).toBeGreaterThan(1);
        });

        it("should scroll brick array", function() {
            var expected = ground.positions[0].getX();
            var expectedTwo = ground.positions[10].getX();
            ground.moveLeft();
            expect(ground.positions[0].getX()).toEqual(expected-5);
            expect(ground.positions[10].getX()).toEqual(expectedTwo-5);

        });

    });

});
