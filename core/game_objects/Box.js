// TODO - OOP in JS - tutorial

function Box(width, height) {
	this.width = width;
	this.height = height;
}

var box = new Box(200, 100);

//consider Object.create(standardObject) <- copy?

Box.prototype.color = null;
Box.prototype.jump = function() { console.log("method"); };
car1.color = "black";

