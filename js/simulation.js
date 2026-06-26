/* ==========================================================
   Hokage Infinity Engine
   simulation.js
   Engine Alpha 1
========================================================== */

"use strict";

/* ==========================================================
    ENGINE SETTINGS
========================================================== */

const Simulation = {

    running: false,

    ticks: 0,

    fps: 30,

    tickLength: 1000 / 30,

    timer: null,

    minutesPerTick: 5

};

/* ==========================================================
    START
========================================================== */

function startSimulation() {

    if (Simulation.running)
        return;

    Simulation.running = true;

    Simulation.timer = setInterval(

        simulationTick,

        Simulation.tickLength

    );

    console.log("Simulation Started");

}

/* ==========================================================
    STOP
========================================================== */

function stopSimulation() {

    Simulation.running = false;

    clearInterval(

        Simulation.timer

    );

}

/* ==========================================================
    MAIN TICK
========================================================== */

function simulationTick() {

    Simulation.ticks++;

    World.tick++;

    advanceTime(

        Simulation.minutesPerTick

    );

    updateCitizens();

    updateWorld();

    updateInterface();

}

/* ==========================================================
    WORLD UPDATE
========================================================== */

function updateWorld() {

    updatePopulation();

    updateWeather();

    updateResources();

}

/* ==========================================================
    POPULATION
========================================================== */

function updatePopulation() {

    World.population.total =

        citizens.length;

}

/* ==========================================================
    WEATHER
========================================================== */

function updateWeather() {

    if (Math.random() < 0.002) {

        const weather = [

            "Sunny",

            "Cloudy",

            "Rain",

            "Storm"

        ];

        World.weather.type =

            randomChoice(weather);

    }

}

/* ==========================================================
    RESOURCES
========================================================== */

function updateResources() {

    World.resources.food += 1;

    World.resources.wood += 1;

    World.resources.stone += 1;

}

/* ==========================================================
    UPDATE UI
========================================================== */

function updateInterface() {

    updateTopBar();

    updateCitizenList();

    updateStoryFeed();

    updateCitizenPanel();

}

/* ==========================================================
    TOP BAR
========================================================== */

function updateTopBar() {

    document.getElementById("year").textContent =
        World.time.year;

    document.getElementById("season").textContent =
        World.time.season;

    document.getElementById("day").textContent =
        World.time.day;

    const hour =

        String(

            World.time.hour

        ).padStart(2,"0");

    const minute =

        String(

            World.time.minute

        ).padStart(2,"0");

    document.getElementById("time").textContent =

        hour + ":" + minute;

    document.getElementById("population").textContent =

        World.population.total;

}

/* ==========================================================
    STORY
========================================================== */

let lastStoryTick = 0;

function maybeCreateStoryEvent() {

    if (

        Simulation.ticks -

        lastStoryTick < 300

    )

        return;

    lastStoryTick =

        Simulation.ticks;

    const citizen =

        randomChoice(citizens);

    addWorldStory(

        citizen.identity.firstName +

        " spent the day working as a " +

        citizen.job.title +

        "."

    );

}
