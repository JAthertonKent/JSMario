describe("Gravity", function() {
    
    var mario_sprite;
    var mario;

    beforeEach(function () {
        mario_sprite = jasmine.createSpyObj('sprite', ['draw']);
    });

    it("should affect mario", function() {
        mario = new Actor(new Vector2d(5, 200), mario_sprite);
        mario.acceleration = 4;
        gravity(mario);
        expect(mario.velocity).toEqual(4);
    });
    
    it("should increase mario's velocity by acceleration", function() {
        mario = new Actor(new Vector2d(200, 100), mario_sprite);
        mario.acceleration = 1;
        gravity(mario);
        expect(mario.velocity).toEqual(1);
    });

    it("should increase mario's y by velocity ", function() {
        mario = new Actor(new Vector2d(200, 100), mario_sprite);
        mario.velocity = 25;
        gravity(mario);
        expect(mario.getY()).toEqual(125);
    });

    it("should reset the mario's velocity to zero when at ground", function() {
        mario = new Actor(new Vector2d(0, 400), mario_sprite);
        mario.velocity = 100;
        gravity(mario);
        expect(mario.velocity).toEqual(0);
    });

});
