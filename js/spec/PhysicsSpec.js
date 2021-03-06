describe("Physics", function() {
    
    var sprite;
    var mario;
    var physics;

    beforeEach(function () {
        Entity2d.prototype.getHeight = function () { return 35 };
        Entity2d.prototype.getWidth = function () { return 35 };
        sprite = jasmine.createSpyObj('sprite', ['draw']);
        mario = actor({position: new Vector2d(5, 200), sprite: sprite});
        mario.getWidth = function () { return 35 };
        mario.getHeight = function () { return 35 };
        var ground = { positions: [new Entity2d(new Vector2d(0, 400), sprite)] };
        physics = new Physics([mario], [ground]);
    });
    
    describe("Gravity", function(){
        it("should affect mario", function() {
            mario.acceleration = 4;
            physics.applyEffects();
            expect(mario.velocity).toEqual(4);
        });
        
        it("should increase mario's y-velocity by y-acceleration", function() {
            mario.placeAt(new Vector2d(200, 100));
            mario.acceleration = 1;
            physics.applyEffects();
            expect(mario.velocity).toEqual(1);
        });

        it("should increase mario's y by y-velocity ", function() {
            mario.placeAt(new Vector2d(0, 100));
            mario.velocity = 25;
            mario.acceleration = 0;
            physics.applyEffects();
            expect(mario.getY()).toEqual(125);
        });

        it("should reset the mario's y-velocity to zero after colliding", function() {
            mario.placeAt(new Vector2d(0, 400));
            mario.velocity = 100;
            physics.applyEffects();
            expect(mario.velocity).toEqual(0);
        });

        it("should start mobileEntity with zero velocity", function () {
            expect(mario.velocity).toEqual(0);
        });
    });
    
    describe("Collisions", function(){
        it("should check if two entities are colliding", function() {
            a = new Entity2d(new Vector2d(0, 400), sprite);
            b = new Entity2d(new Vector2d(0, 400), sprite);
            expect(isCollide(a, b)).toEqual(true);
            a.position.addX(100);
            expect(isCollide(a, b)).toEqual(false);
        });

        it("should move actor to top of block when colliding", function() {
            mario = actor({position: new Vector2d(0, 0), sprite: sprite});
            mario.getWidth = function () { return 35 };
            mario.getHeight = function () { return 35 };
            ground = new Ground(new Vector2d(0, 0), sprite);
            physics = new Physics([mario], [ground]);
            physics.applyEffects();
            expect(mario.getY()).toBeLessThan(0);
        });
    });
    
});
