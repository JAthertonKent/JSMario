describe("Scene", function() {
    var spyMario;
    var mario_sprite;
    var spyBackground;
    var scene;

    beforeEach(function () {
        mario_sprite = jasmine.createSpyObj('sprite', ['draw', 'flipImage']);
        mario = new Actor(new Vector2d(5, 200), mario_sprite);
        spyBackground = jasmine.createSpyObj('background', ['draw']);

        scene = new Scene(spyBackground, mario);
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

    it("should move mario according to gravity", function() {
        spyMario = jasmine.createSpyObj('actor', ['moveLeft', 'moveRight', 'draw', 'nextFrame']);
        scene = new Scene(spyBackground, spyMario);
        scene.drawScene();
        expect(spyMario.nextFrame).toHaveBeenCalled();
    });
});

