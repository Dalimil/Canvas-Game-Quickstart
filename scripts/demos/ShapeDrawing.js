var ShapeDrawing = function() {

	/* TODO: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D#Paths */

	// Style
		ctx.fillStyle = "#FFA500";
		ctx.fillStyle = "rgb(255, 165, 5)";
		ctx.strokeStyle = "rgba(255, 165, 5, 0.5)";
		ctx.lineWidth = 5;
		ctx.lineCap = "round";
	
	// Rectangle
		ctx.fillRect(25,25,100,100);
		ctx.clearRect(45,45,60,60);
		ctx.strokeRect(50,50,50,50);
	
	// Path
		ctx.beginPath();
		ctx.moveTo(75,50);
		ctx.lineTo(100,75);
		ctx.lineTo(100,25);
		ctx.closePath();
		ctx.stroke(); // or fill()
	
	// Arc and Circles
		// arc(x, y, radius, startAngle, endAngle, anticlockwise)
		ctx.beginPath();
		ctx.arc(200, 200, 50, Math.PI/2, Math.PI * 1.9, false); 
		ctx.fill();
	
	// Text
		ctx.font = "48px serif";
		ctx.strokeText("Hello world", 200, 100); // or fillText()
	
	// Image
		// Images would normally be pre-loaded elsewhere
		var img = new Image();   // Create new img element
		img.addEventListener("load", function() {
			// execute drawImage statements here
			ctx.drawImage(img, 50, 50); 
			// OR to scale: drawImage(img, x, y, width, height)
		}, false);
		img.src = 'myImage.png'; // Set source path - image starts loading now

};
