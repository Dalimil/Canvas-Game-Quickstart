var ShapeDrawing = (function() {

	/* TODO: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D#Paths */


	function drawRectangles(ctx) {
		ctx.fillRect(25,25,100,100);
		ctx.clearRect(45,45,60,60);
		ctx.strokeRect(50,50,50,50);
	}

	function drawPath(ctx) {
		ctx.beginPath();
		ctx.moveTo(75,50);
		ctx.lineTo(100,75);
		ctx.lineTo(100,25);
		ctx.closePath();
		ctx.stroke(); // or fill()
	}

	return {
		drawRectangles: drawRectangles
	};

})();
