var ShapeDrawing = (function() {

	/* TODO: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D#Paths */

	function setStyle(ctx) {
		ctx.fillStyle = "#FFA500";
		ctx.fillStyle = "rgb(255, 165, 5)";
		ctx.strokeStyle = "rgba(255, 165, 5, 0.5)";
		ctx.lineWidth = 5;
		ctx.lineCap = "round";
	}

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

	function drawArc(ctx) {
		// arc(x, y, radius, startAngle, endAngle, anticlockwise)
		ctx.beginPath();
		ctx.arc(200, 200, 50, Math.PI/2, Math.PI * 1.9, false); 
		ctx.fill();
	}

	function drawText(ctx) {
		ctx.font = "48px serif";
		ctx.strokeText("Hello world", 200, 100); // or fillText()
	}

	return {
		drawRectangles: drawRectangles,
		drawArc: drawArc,
		drawText: drawText
	};

})();
