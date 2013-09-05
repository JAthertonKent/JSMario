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
    
    it("should increase entity's velocity by acceleration", function() {
        mario = new Actor(new Vector2d(200, 100), mario_sprite);
        mario.acceleration = 1;
        gravity(mario);
        expect(mario.velocity).toEqual(1);
    });

    it("should increase entity's y by velocity ", function() {
        mario = new Actor(new Vector2d(200, 100), mario_sprite);
        mario.velocity = 25;
        gravity(mario);
        expect(mario.getY()).toEqual(125);
    });

    it("should reset the entity's velocity to zero when at ground", function() {
        mario = new Actor(new Vector2d(0, 400), mario_sprite);
        mario.velocity = 100;
        gravity(mario);
        expect(mario.velocity).toEqual(0);
    });

});
