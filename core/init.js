/**
* Initializes the game loop and pause/unpause events
*/
window.onload = function() {
    // First initialize GameManager by passing the canvas object
    GameManager = GameManager(document.getElementById("canvas")); 

    // A cross-browser requestAnimationFrame
    var requestAnimFrame = (function() {
        return window.requestAnimationFrame    ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(callback){
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    // Don't run the game when the tab isn't visible
    window.addEventListener('focus', function() {
        unpause();
    });

    window.addEventListener('blur', function() {
        pause();
    });

    var running = false;
    var lastTimestamp;
    unpause(); // Play now!

    function pause() {
        running = false;
    }

    function unpause() {
        running = true;
        lastTimestamp = performance.now();
        requestAnimFrame(main);
    }

    // The main game loop
    // @param timestamp - DOMHighResTimeStamp
    function main(timestamp) {
        if(!running) {
            return;
        }

        requestAnimFrame(main); // Best practice (Mozilla)

        var delta = timestamp - lastTimestamp;
        lastTimestamp = timestamp; // ready for the next frame
        
        GameManager.update(delta);
        GameManager.render();

    }

};
