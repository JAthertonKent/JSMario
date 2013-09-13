describe("Scene", function() {
    var mario_sprite;
    var mario;
    var background;
    var scene;
    var ground;

    beforeEach(function () {
        mario_sprite = jasmine.createSpyObj('sprite', ['draw', 'switchImage']);
        mario = new Actor(new Vector2d(5, 200), mario_sprite);
        background = jasmine.createSpyObj('background', ['draw', 'moveLeft']);
        ground = jasmine.createSpyObj('obstacle', ['draw', 'moveLeft']);
        scene = new Scene(background, mario, ground);
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
        scene.drawScene();
        expect(gravity).toHaveBeenCalledWith(mario);
    });

    it("should check actor's position and tell background to scroll if in middle", function() {
        scene = new Scene(background, new Actor(new Vector2d(401, 0), mario_sprite), ground);
        scene.drawScene();
        expect(background.moveLeft).toHaveBeenCalled();
    });

    it("should push actor back if background scrolls", function() {
        scene = new Scene(background, new Actor(new Vector2d(401, 0), mario_sprite), ground);
        scene.drawScene();
        expect(mario.getX()).toBeLessThan(400);
    });
    
    it("should draw the ground", function() {
        scene.drawScene();
        expect(ground.draw).toHaveBeenCalled();
    });
});

