describe("Scene", function() {
    var spyMario;
    var sprite;
    var spyBackground;
    var scene;
    var ground;
    var physics; 

    beforeEach(function () {
        sprite = jasmine.createSpyObj('sprite', ['draw', 'switchImage']);
        mario = new Actor(new Vector2d(5, 200), sprite);
        spyBackground = jasmine.createSpyObj('background', ['draw', 'moveLeft']);
        ground = jasmine.createSpyObj('obstacle', ['draw', 'moveLeft']);
        physics = jasmine.createSpyObj('physics', ['applyEffects']);
        scene = new Scene([spyBackground, mario, ground], physics);
    });

    it("should prevent the actor from escaping by the left most side", function() {
        //this is really only testing actor
        mario.turnLeftAndMove();
        expect(mario.getX()).toEqual(5);   
    });

    it("should apply gravity", function() {
        scene.drawScene();
        expect(physics.applyEffects).toHaveBeenCalled;
    });

    it("should check actor's position and tell background to scroll if in middle", function() {
        mario = new Actor(new Vector2d(401, 0), sprite);
        scene = new Scene([spyBackground, mario, ground], physics);
        scene.drawScene();
        expect(spyBackground.moveLeft).toHaveBeenCalled();
    });

    it("should push actor back if background scrolls", function() {
        mario = new Actor(new Vector2d(401, 0), sprite);
        scene = new Scene([spyBackground, mario, ground], physics);
        scene.drawScene();
        expect(mario.getX()).toBeLessThan(400);
    });
    
    it("should draw the ground", function() {
        scene = new Scene([spyBackground, mario, ground], physics);
        scene.drawScene();
        expect(ground.draw).toHaveBeenCalled();
    });

});

