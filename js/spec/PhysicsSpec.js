describe("Physics", function() {
    
    var mario_sprite;
    var mario;
    var gravity;

    beforeEach(function () {
        var ground = { position: {} };
        mario_sprite = jasmine.createSpyObj('sprite', ['draw']);
        mario = new Actor(new Vector2d(5, 200), mario_sprite);
        gravity = new Physics(mario, ground);
    });
    
    describe("Gravity", function(){
        it("should affect mario", function() {
            mario.acceleration = 4;
            gravity.applyEffects();
            expect(mario.velocity).toEqual(4);
        });
        
        it("should increase mario's y-velocity by y-acceleration", function() {
            mario.placeAt(new Vector2d(200, 100));
            mario.acceleration = 1;
            gravity.applyEffects();
            expect(mario.velocity).toEqual(1);
        });

        it("should increase mario's y by y-velocity ", function() {
            mario.placeAt(new Vector2d(200, 100));
            mario.velocity = 25;
            gravity.applyEffects();
            expect(mario.getY()).toEqual(125);
        });

        it("should reset the mario's y-velocity to zero when at ground", function() {
            mario.placeAt(new Vector2d(0, 400));
            mario.velocity = 100;
            gravity.applyEffects();
            expect(mario.velocity).toEqual(0);
        });
    });
    
    describe("Collisions", function(){
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
    
});
