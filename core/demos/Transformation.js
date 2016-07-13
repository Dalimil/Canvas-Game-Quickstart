var Transformation = function() {

	// Translation
		ctx.save(); // saves canvas state
		ctx.translate(10, 10);
		ctx.fillRect(0, 0, 25, 25);
		ctx.restore();
	
	// Rotation
		// ctx.rotate(angle) rotates around its origin (0, 0)
		ctx.save();

		// draw blue rect
		ctx.fillStyle = "#0095DD";
		ctx.fillRect(150, 30, 100, 100);  

		// translate to rectangle's center
		ctx.translate(200, 80); // x = x + 0.5 * width
		ctx.rotate(Math.PI/8); // rotate (rad)
		ctx.translate(-200, -80); // translate back

		// draw grey rect
		ctx.fillStyle = "#4D4E53";
		ctx.fillRect(150, 30, 100, 100);

		ctx.restore();
	
	// Scaling
		ctx.save();
		ctx.scale(2, 2); // scale x*2, y*2
		// OR mirror horizontally: ctx.scale(-1, 1)
  		// OR mirror vertically: ctx.scale(1, -1)
  		ctx.fillRect(10,10,20,20);
		ctx.restore();
	
};