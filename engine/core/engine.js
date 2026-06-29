/* ==========================================================
   Hokage Infinity Engine
   engine.js
   Core Engine Manager
========================================================== */

"use strict";

/* ==========================================================
   ENGINE
========================================================== */

const Engine = {

    version: "2.0 Alpha",

    running: false,

    initialized: false,

    modules: {},

    statistics: {

        fps: 0,

        ticks: 0,

        citizens: 0,

        memories: 0,

        conversations: 0,

        decisions: 0

    }

};

/* ==========================================================
   REGISTER MODULE
========================================================== */

function registerModule(name,module){

    Engine.modules[name]=module;

    console.log("Registered:",name);

}

/* ==========================================================
   GET MODULE
========================================================== */

function getModule(name){

    return Engine.modules[name];

}

/* ==========================================================
   INITIALIZE
========================================================== */

function initializeEngine(){

    console.log(

        "Starting Hokage Infinity Engine"

    );

    Engine.initialized=true;

}

/* ==========================================================
   START
========================================================== */

function startEngine(){

    Engine.running=true;

}

/* ==========================================================
   STOP
========================================================== */

function stopEngine(){

    Engine.running=false;

}

/* ==========================================================
   UPDATE STATS
========================================================== */

function updateEngineStats(){

    Engine.statistics.citizens=

        citizens.length;

    if(typeof MemoryEngine!=="undefined"){

        Engine.statistics.memories=

            MemoryEngine.totalMemories;

    }

    if(typeof BrainEngine!=="undefined"){

        Engine.statistics.decisions=

            BrainEngine.decisionsMade;

    }

}

/* ==========================================================
   TICK
========================================================== */

function engineTick(){

    if(!Engine.running)

        return;

    Engine.statistics.ticks++;

    updateEngineStats();

}
