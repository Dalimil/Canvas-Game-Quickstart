/**
* Initializes the game loop and pause/unpause events
*/
window.onload = function() {

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

    // Let's play this game!
    var previousTime = Date.now();
    var running = true;
    main();


    // Pause and unpause
    function pause() {
        running = false;
    }

    function unpause() {
        running = true;
        previousTime = Date.now();
        main();
    }

    // The main game loop
    function main() {
        if(!running) {
            return;
        }

        var currentTime = Date.now();
        var dt = currentTime - previousTime;

        Game.update(dt);
        Game.render();

        previousTime = currentTime;
        requestAnimFrame(main);
    }

};
