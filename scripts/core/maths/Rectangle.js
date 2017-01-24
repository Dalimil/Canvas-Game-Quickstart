"use strict";

define(function() {

    function Rectangle(origin, width, height) {
        if(!(this instanceof Rectangle)) {
			// Called without new
			return new Rectangle(origin, width, height);
		}
        this.origin = origin || 0;
        this.width = width || 1;
        this.height = height || 1;

        this.x1 = this.origin.x;
        this.x2 = this.origin.x + width;
        this.y1 = this.origin.y;
        this.y2 = this.origin.y + height;
    }
    
    return Rectangle;
});

