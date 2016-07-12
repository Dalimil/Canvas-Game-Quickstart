var Environment = (function() {
	// World representation

	function render(ctx) {
		// Optimize, maybe don't need to redraw that often?
		
		ShapeDrawing.drawRectangles(ctx);
		ShapeDrawing.drawArc(ctx);
		ShapeDrawing.drawText(ctx);
	}

	return {
		render: render
	};

})();
