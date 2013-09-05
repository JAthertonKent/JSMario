describe("Entity2d", function () {
    var background;
    var mario;
    var spyMario;
    var position;
    var mario_sprite;
    var background_sprite;
    var spyBackground;
    var scene;

    beforeEach(function () {
        position = jasmine.createSpyObj('vector2d', ['getX', 'getY', 'addX', 'addY']);
        mario_sprite = jasmine.createSpyObj('sprite', ['draw', 'flipImage']);
        mario = new Actor(position, mario_sprite);
        spyMario = jasmine.createSpyObj('actor', ['moveLeft', 'moveRight', 'draw']);
        background_sprite = jasmine.createSpyObj('sprite', ['draw']);
        background = new Background(position, background_sprite);
        spyBackground = jasmine.createSpyObj('background', ['moveRight', 'draw']);
        spyBackground.sprite = background_sprite;
        spyBackground.position = position;
        scene = new Scene(spyBackground, mario);
    });

    describe("Actor", function () {
       
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
            expect(mario_sprite.flipImage).toHaveBeenCalled();
        });
        
        it("should flip when walks right", function(){
            scene.drawScene();
            scene.keypress({which: 39});
            expect(mario_sprite.flipImage).toHaveBeenCalled();
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
            position = new Vector2d(0, 0);
            background = new Background(new Vector2d(0, 0), background_sprite);
            background.draw();
            expect(background_sprite.draw).toHaveBeenCalledWith(position);
            position.addX(800); //length of background_sprite
            expect(background_sprite.draw).toHaveBeenCalledWith(position);
        });

    });

});
