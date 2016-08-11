# Canvas JavaScript Game Quickstart

**This is a template for JavaScript 2D games (or animations) using HTML5 Canvas**

## TODO
- [ ] Implement physics engine, incl. collisions and resolution
- [ ] Light module - directional, ambient, ... Use illuminated.js
- [ ] Power-up (triggers) module - onTrigger() interface for gameObjects
- [ ] HUD module - with health, mana, sound switch and main-menu link
- [ ] Implement game rounds in GameManager
- [ ] init npm + websockets and multiplayer? - or fork into a different repo (e.g. pure multiplayer game skeleton)

## JavaScript Optimization
To optimize, run:

    node tools/r.js -o tools/build.js

That build command creates an optimized version of the project in a single
**main-build.js** file. It will include all dependencies of main.js (recursive).

For more information on the optimizer:
http://requirejs.org/docs/optimization.html

For more information on using requirejs:
http://requirejs.org/docs/api.html
