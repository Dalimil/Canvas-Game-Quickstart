# Canvas JavaScript Game Quickstart

**This is a template for JavaScript 2D games (or animations) using HTML5 Canvas**

## TODO
- [ ] Implement physics engine, incl. collisions and resolution
- [ ] HUD module - with health, mana, sound switch and main-menu link
- [ ] Light module - directional, ambient, ... -> Use https://github.com/gre/illuminated.js/
- [ ] Implement Particle system (+ with custom image assets) -> inspiration: http://www.mrspeaker.net/dev/parcycle/ (see radial gradient render code)

## JavaScript Optimization
To optimize, run:

    node tools/r.js -o tools/build.js

That build command creates an optimized version of the project in a single
**main-build.js** file. It will include all dependencies of main.js (recursive).

For more information on the optimizer:
http://requirejs.org/docs/optimization.html

For more information on using requirejs:
http://requirejs.org/docs/api.html
