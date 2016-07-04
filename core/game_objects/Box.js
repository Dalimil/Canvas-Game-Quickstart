// TODO - OOP in JS - tutorial

function Box(width, height) {
	this.width = width;
	this.height = height;
}

var box = new Box(200, 100);

Box.prototype.foo = 42;
// Attach function to prototype (instead of every object with this.f)
Box.prototype.jump = function() { console.log("method"); };

box.colour = "black";

function SpecialBox(width, height, power) { // inherits from Object (as default)
	Box.call(this, width, height); // setup this.width, this.heigh (pass 'this')
	this.power = power;
}

SpecialBox.prototype = Object.create(Box.prototype); // set proto chain to point to Box
SpecialBox.prototype.hello = function() { console.log("hi"); }; 

var specialBox = new SpecialBox(2, 3, 5);
specialBox.hello();
specialBox.jump();

/* Consider 2 closure-package styles
	1) function Thing() { var private = 42; return { doThis: doThis }; }();
	2) function makeThing(param) { var private = 42; return { doThis: doThis }; }

	1) <- seems better as a Singleton pattern - or 'Package'
	2) <- is better for initializing (can param) and can have multiple instances;
	

