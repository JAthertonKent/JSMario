describe("Gravity", function() {

    beforeEach(function () {

    });

    it("should effect mario", function() {
        mario_sprite = jasmine.createSpyObj('sprite', ['draw', 'flipImage']);
        mario = new Actor(new Vector2d(5, 200), mario_sprite);
        mario.acceleration = 4;
        gravity(mario);
        expect(mario.velocity).toEqual(4);
    });

});
