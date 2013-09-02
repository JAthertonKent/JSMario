describe("Scene", function() {

    beforeEach(function () {
        spyMario = jasmine.createSpyObj('actor', ['moveLeft', 'moveRight', 'draw']);
        spyBackground = jasmine.createSpyObj('background', ['moveRight']);
        spyBackground2 = jasmine.createSpyObj('background', ['moveRight']);
        background_sprite = jasmine.createSpyObj('sprite', ['draw']);
        mario_sprite = jasmine.createSpyObj('sprite', ['draw', 'flipImage']);
        spyBackground.sprite = background_sprite;
        spyBackground2.sprite = background_sprite;
    });


    it("should prevent the actor from escaping by the left most side", function() {
        mario = new Actor(new Vector2d(5, 200), mario_sprite);
        scene = new Scene([spyBackground, spyBackground2], mario);
        scene.drawScene();
        scene.keypress({which: 37});
        expect(mario.getX()).toEqual(5);   

    });

    it("should let the actor walk around half the scene", function() {
        mario = new Actor(new Vector2d(5, 200), mario_sprite);
        scene = new Scene([spyBackground, spyBackground2], mario);
        scene.drawScene();
        scene.keypress({which: 39});
        expect(mario.getX()).toEqual(10);   
    });

});
