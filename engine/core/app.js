/* ==========================================================
   Hokage Infinity World
   app.js
   Integrated Engine Version 1.0
========================================================== */

"use strict";

/* ==========================================================
    APPLICATION
========================================================== */

let simulationRunning = false;
let simulationSpeed = 120; // milliseconds per simulation tick

/* ==========================================================
    START GAME
========================================================== */

function startGame() {

    console.clear();

console.log(
    `%c${ENGINE.name}`,
    "font-size:22px;font-weight:bold;color:#4da6ff;"
);

console.log(`Version : ${ENGINE.version}`);
console.log(`Codename: ${ENGINE.codename}`);
console.log(`Author   : ${ENGINE.author}`);
console.log("----------------------------");
console.log("Starting Engine...");

    /* ---------- Core ---------- */

    initializeWorld();

    initializeResources();

    initializeCitizens();

    initializeTraits();

    initializeRelationships();

    initializeJobs();

    initializeEvents();

    initializePromptEngine();

    initializePathfinding();

    generateStartingVillage();

    initializeRenderer();

    initializeUI();

    initializeSaveSystem();

    /* ---------- Restore Save ---------- */

    loadWorld();

    /* ---------- UI ---------- */

    updateAllUI();

    /* ---------- Begin Simulation ---------- */

    simulationRunning = true;

    requestAnimationFrame(gameLoop);

}

/* ==========================================================
    MAIN LOOP
========================================================== */

let lastTick = 0;

function gameLoop(timestamp){

    requestAnimationFrame(gameLoop);

    if(!simulationRunning)
        return;

    if(timestamp-lastTick<simulationSpeed)
        return;

    lastTick=timestamp;

    simulationTick();

}

/* ==========================================================
    SIMULATION
========================================================== */

function simulationTick(){

    advanceTime();

    updateJobs();

    updateBuildings();

    resourceTick();

    updatePathfinding();

    updateRelationships();

    updateEmotions();

    conversationTick();

    eventTick();

    updateStory();

    updateRenderer();

    updateAllUI();

}

/* ==========================================================
    PAUSE
========================================================== */

function pauseSimulation(){

    simulationRunning=false;

}

/* ==========================================================
    RESUME
========================================================== */

function resumeSimulation(){

    simulationRunning=true;

}

/* ==========================================================
    SPEED
========================================================== */

function setSimulationSpeed(speed){

    simulationSpeed=speed;

}

/* ==========================================================
    RESET
========================================================== */

function newWorld(){

    resetWorld();

}

/* ==========================================================
    DOM READY
========================================================== */

window.addEventListener(

    "DOMContentLoaded",

    ()=>{

        startGame();

    }

);
