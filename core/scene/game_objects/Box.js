// OOP in JavaScript - Tutorial

function Box(width, height) {
	this.width = width;
	this.height = height;
}

var box = new Box(200, 100);
box.colour = "black";
Box.prototype.foo = 42;
// Attach function to prototype (instead of every object with this.f)
Box.prototype.jump = function() { console.log("method"); };

/* OR like this:
Box.prototype = {
	foo: 42,
	jump: function() { console.log("method"); }
}
*/

function SpecialBox(width, height, power) { // inherits from Object (as default)
	Box.call(this, width, height); // setup this.width, this.heigh (pass 'this')
	this.power = power;
}

// The Object.create() method creates a new object with the specified prototype object.
SpecialBox.prototype = Object.create(Box.prototype); // set proto chain to point to Box
SpecialBox.prototype.hello = function() { console.log("hi"); }; 

var specialBox = new SpecialBox(2, 3, 5);
specialBox.hello();
specialBox.jump();

/* Consider different package/object styles
	1) function Thing() { var _private = 42; return { doThis: doThis }; }();
	2) function createThing(param) { var _private = 42; return { doThis: doThis }; }
	3) function Thing(param) { var this._private = 42; } Thing.prototype.doThis = ...
	
	1) Thing.doThis();
	2) var myThing = createThing(param); myThing.doThis();
	3) var myThing = new Thing(param); myThing.doThis();
	
	1) <- seems better as a Singleton pattern - or 'Package'
	2) <- is better for initializing (can param) and can have multiple instances;
	3) <- more efficient - best for multiple object instances


