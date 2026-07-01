/* ==========================================================
   Hokage Infinity Engine
   engine.js
========================================================== */

"use strict";

const Engine = {

    initialized: false,

    running: false,

    startTime: 0,

    frame: 0

};

/* ==========================================================
   INITIALIZE ENGINE
========================================================== */

function initializeEngine(){

    console.clear();

    console.log(
        `%c${ENGINE.name}`,
        "font-size:22px;font-weight:bold;color:#00AAFF;font-weight:bold;"
    );

    console.log(`Version : ${ENGINE.version}`);
    console.log(`Codename: ${ENGINE.codename}`);
    console.log(`Author   : ${ENGINE.author}`);
    console.log("----------------------------");

    initializeWorldSystem();

    initializeAISystem();

    initializeCitizenSystem();

    initializeSimulationSystem();

    initializeRenderer();

    initializeUI();

    initializeSaveSystem();

    Engine.initialized = true;

    Engine.startTime = performance.now();

    console.log("Engine Initialized");

}

/* ==========================================================
   START ENGINE
========================================================== */

function startEngine(){

    if(!Engine.initialized){

        initializeEngine();

    }

    Engine.running = true;

    console.log("Starting Game Loop...");

    startGameLoop();

}

/* ==========================================================
   ENGINE UPDATE
========================================================== */

function engineTick(){

    if(!Engine.running)
        return;

    Engine.frame++;

}

/* ==========================================================
   STOP ENGINE
========================================================== */

function stopEngine(){

    Engine.running = false;

    console.log("Engine Stopped");

}
