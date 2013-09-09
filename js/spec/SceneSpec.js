describe("Scene", function() {
    var spyMario;
    var mario_sprite;
    var spyBackground;
    var scene;
    var ground;

    beforeEach(function () {
        mario_sprite = jasmine.createSpyObj('sprite', ['draw', 'flipImage']);
        mario = new Actor(new Vector2d(5, 200), mario_sprite);
        spyBackground = jasmine.createSpyObj('background', ['draw', 'moveLeft']);
        ground = jasmine.createSpyObj('obstacle', ['draw']);

        scene = new Scene(spyBackground, mario, ground);
    });


    it("should prevent the actor from escaping by the left most side", function() {
        scene.drawScene();
        scene.keypress({which: 37});
        expect(mario.getX()).toEqual(5);   
    });

    it("should let the actor walk around half the scene", function() {
        scene.drawScene();
        scene.keypress({which: 39});
        expect(mario.getX()).toEqual(10);   
    });

    it("should apply gravity", function() {
        spyOn(window, 'gravity');
        scene = new Scene(spyBackground, mario, ground);
        scene.drawScene();
        expect(gravity).toHaveBeenCalledWith(mario);
    });

    it("should check actor's position and tell background to scroll if in middle", function() {
        mario = new Actor(new Vector2d(401, 0), mario_sprite);
        scene = new Scene(spyBackground, mario, ground);
        scene.drawScene();
        expect(spyBackground.moveLeft).toHaveBeenCalled();
    });

    it("should push actor back if background scrolls", function() {
        mario = new Actor(new Vector2d(401, 0), mario_sprite);
        scene = new Scene(spyBackground, mario, ground);
        scene.drawScene();
        expect(mario.getX()).toBeLessThan(400);
    });
    
    it("should draw the ground", function() {
        scene = new Scene(spyBackground, mario, ground);
        scene.drawScene();
        expect(ground.draw).toHaveBeenCalled();
    });
});

