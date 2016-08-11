requirejs.config({
    // By default load any module IDs from baseUrl
    baseUrl: 'scripts/lib',
    // But if the module ID starts with "app", load it from the scripts/core directory.
    // Paths are relative to the baseUrl, and can simplify long require-strings
    paths: {
        app: '../core',
        maths: '../core/maths',
        scene: '../core/scene'
    }
});

// Check http://www.manuel-strehl.de/dev/load_jquery_before_requirejs.en.html if jQuery not working

// Start the main app logic.
requirejs(['app/AppManager'], function(app) {
	app.init();
});
