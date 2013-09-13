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

    it("should check if two entities are colliding", function() {
        a = new Entity2d(new Vector2d(0, 400), mario_sprite);
        b = new Entity2d(new Vector2d(0, 400), mario_sprite);
        Entity2d.prototype.getHeight = function () { return 35 };
        Entity2d.prototype.getWidth = function () { return 35 };
        expect(isCollide(a, b)).toEqual(true);
        a.position.addX(100);
        expect(isCollide(a, b)).toEqual(false);
    });
});
