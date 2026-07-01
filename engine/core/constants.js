/* ==========================================================
   Hokage Infinity Engine
   constants.js
========================================================== */

"use strict";

/* ==========================================================
   ENGINE INFO
========================================================== */

const ENGINE = {

    name: "Hokage Infinity Engine",

    version: "Alpha 2.0",

    codename: "Living World",

    author: "Nathen Ravenscroft",

    build: 1,

    website: "",

    debug: true

};

/* ==========================================================
   WORLD
========================================================== */

const WORLD_CONSTANTS = {

    tileSize: 32,

    defaultWidth: 200,

    defaultHeight: 200,

    startingPopulation: 25

};

/* ==========================================================
   TIME
========================================================== */

const TIME_CONSTANTS = {

    ticksPerSecond: 60,

    minutesPerTick: 10,

    hoursPerDay: 24,

    daysPerSeason: 30,

    seasonsPerYear: 4

};

/* ==========================================================
   GAME SPEED
========================================================== */

const GAME_SPEED = {

    PAUSED: 0,

    NORMAL: 1,

    FAST: 2,

    VERY_FAST: 4

};

/* ==========================================================
   DEBUG
========================================================== */

const DEBUG = {

    enabled: true,

    showFPS: true,

    showAI: true,

    showPathfinding: false,

    showChunks: false

};
