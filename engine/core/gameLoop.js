/* ==========================================================
   Hokage Infinity Engine
   gameLoop.js
   Main Engine Loop
========================================================== */

"use strict";

const GameLoop = {

    running: false,

    lastTime: 0,

    delta: 0,

    fps: 0,

    frameCounter: 0,

    fpsTimer: 0

};

/* ==========================================================
   START
========================================================== */

function startGameLoop(){

    if(GameLoop.running)
        return;

    GameLoop.running = true;

    requestAnimationFrame(loop);

}

/* ==========================================================
   STOP
========================================================== */

function stopGameLoop(){

    GameLoop.running = false;

}

/* ==========================================================
   MAIN LOOP
========================================================== */

function loop(timestamp){

    if(!GameLoop.running)
        return;

    GameLoop.delta = timestamp - GameLoop.lastTime;

    GameLoop.lastTime = timestamp;

    update(GameLoop.delta);

    render();

    calculateFPS(timestamp);

    requestAnimationFrame(loop);

}

/* ==========================================================
   UPDATE
========================================================== */

function update(delta){

    engineTick();

    updateWorld();

    updateSimulation();

    updateAIScheduler();

    updateSociety();

    updateRenderer();

    updateUI();

}

/* ==========================================================
   RENDER
========================================================== */

function render(){

    if(typeof renderTerrain === "function"){

        renderTerrain(ctx);

    }

    if(typeof renderCitizens === "function"){

        renderCitizens(ctx);

    }

    if(typeof renderEffects === "function"){

        renderEffects(ctx);

    }

}

/* ==========================================================
   FPS
========================================================== */

function calculateFPS(timestamp){

    GameLoop.frameCounter++;

    if(timestamp - GameLoop.fpsTimer >= 1000){

        GameLoop.fps = GameLoop.frameCounter;

        GameLoop.frameCounter = 0;

        GameLoop.fpsTimer = timestamp;

    }

}
