/* ==========================================================
   Hokage Infinity World
   simulation.js
   Integrated Engine Version 1.0
========================================================== */

"use strict";

/* ==========================================================
    SIMULATION ENGINE
========================================================== */

const Simulation = {

    tick: 0,

    dayLength: 288,

    running: true

};

/* ==========================================================
    ADVANCE TIME
========================================================== */

function advanceTime(){

    Simulation.tick++;

    World.time.minute += 5;

    if(World.time.minute >= 60){

        World.time.minute = 0;
        World.time.hour++;

    }

    if(World.time.hour >= 24){

        World.time.hour = 0;
        World.time.day++;

        runDailySimulation();

    }

    if(World.time.day > 365){

        World.time.day = 1;
        World.time.year++;

    }

}

/* ==========================================================
    DAILY SIMULATION
========================================================== */

function runDailySimulation(){

    citizens.forEach(citizen=>{

        updateCitizenNeeds(citizen);

        updateCitizenGoals(citizen);

        generateThought(citizen);

    });

}

/* ==========================================================
    NEEDS
========================================================== */

function updateCitizenNeeds(citizen){

    citizen.needs.hunger += 2;

    citizen.needs.energy -= 3;

    citizen.needs.social -= 1;

    citizen.needs.happiness -= 0.5;

    clampNeeds(citizen);

}

/* ==========================================================
    LIMIT VALUES
========================================================== */

function clampNeeds(citizen){

    Object.keys(citizen.needs).forEach(key=>{

        if(citizen.needs[key] < 0)
            citizen.needs[key]=0;

        if(citizen.needs[key] > 100)
            citizen.needs[key]=100;

    });

}

/* ==========================================================
    GOALS
========================================================== */

function updateCitizenGoals(citizen){

    if(citizen.needs.hunger>75){

        citizen.goal="Eat";

        return;

    }

    if(citizen.needs.energy<25){

        citizen.goal="Sleep";

        return;

    }

    if(citizen.job.title==="Farmer"){

        citizen.goal="Farm";

        return;

    }

    if(citizen.job.title==="Miner"){

        citizen.goal="Mine";

        return;

    }

    if(citizen.job.title==="Builder"){

        citizen.goal="Build";

        return;

    }

    citizen.goal="Socialize";

}

/* ==========================================================
    DAY/NIGHT
========================================================== */

function isDaytime(){

    return World.time.hour>=6 &&

           World.time.hour<20;

}

/* ==========================================================
    UPDATE WORLD
========================================================== */

function updateSimulation(){

    advanceTime();

    updateJobs();

    updateBuildings();

    resourceTick();

    updatePathfinding();

    updateRelationships();

    updateEmotions();

    conversationTick();

    eventTick();

}

/* ==========================================================
    TICK
========================================================== */

function simulationTick(){

    updateSimulation();

}

/* ==========================================================
    START
========================================================== */

function startSimulation(){

    Simulation.running=true;

}

/* ==========================================================
    STOP
========================================================== */

function stopSimulation(){

    Simulation.running=false;

}
