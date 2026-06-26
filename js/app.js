/* ==========================================================
   Hokage Infinity Engine
   app.js
   Engine Alpha 1
========================================================== */

"use strict";

/* ==========================================================
    START GAME
========================================================== */

function startGame() {

    console.log("=================================");
    console.log("Starting Hokage Infinity Engine");
    console.log(World.version);
    console.log("=================================");

    // Create World
    initializeWorld();

    // Create Citizens
    initializeCitizens();

    // UI
    if (typeof initializeUI === "function") {
        initializeUI();
    }

    // Save System
    if (typeof initializeSaveSystem === "function") {
        initializeSaveSystem();
    }

    // Story
    addWorldStory("Civilization has begun.");

    // Begin Engine
    startSimulation();

}

/* ==========================================================
    PAGE LOADED
========================================================== */

window.addEventListener("load", () => {

    startGame();

});
