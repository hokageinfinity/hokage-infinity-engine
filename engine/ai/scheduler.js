/* ==========================================================
   Hokage Infinity Engine
   scheduler.js
   AI Scheduler
========================================================== */

"use strict";

const Scheduler = {

    tick: 0,

    updatesPerSecond: 20,

    citizensProcessed: 0

};

/* ==========================================================
   UPDATE ALL AI
========================================================== */

function updateAIScheduler(){

    Scheduler.tick++;

    Scheduler.citizensProcessed = 0;

    for(const citizen of citizens){

        if(!citizen.alive) continue;

        processCitizen(citizen);

        Scheduler.citizensProcessed++;

    }

}

/* ==========================================================
   PROCESS ONE CITIZEN
========================================================== */

function processCitizen(citizen){

    processNeeds(citizen);

    processBrain(citizen);

    processMovement(citizen);

    processSocial(citizen);

    processJob(citizen);

    processMemories(citizen);

}

/* ==========================================================
   NEEDS
========================================================== */

function processNeeds(citizen){

    citizen.needs.hunger = Math.min(
        100,
        citizen.needs.hunger + 0.05
    );

    citizen.needs.energy = Math.max(
        0,
        citizen.needs.energy - 0.02
    );

}

/* ==========================================================
   BRAIN
========================================================== */

function processBrain(citizen){

    if(typeof think === "function"){

        think(citizen);

    }

    if(typeof decide === "function"){

        decide(citizen);

    }

    if(typeof plan === "function"){

        plan(citizen);

    }

}

/* ==========================================================
   MOVEMENT
========================================================== */

function processMovement(citizen){

    if(typeof updateMovement === "function"){

        updateMovement(citizen);

    }

}

/* ==========================================================
   SOCIAL
========================================================== */

function processSocial(citizen){

    if(typeof updateRelationships === "function"){

        updateRelationships(citizen);

    }

    if(typeof updateConversation === "function"){

        updateConversation(citizen);

    }

}

/* ==========================================================
   JOB
========================================================== */

function processJob(citizen){

    if(typeof updateJob === "function"){

        updateJob(citizen);

    }

}

/* ==========================================================
   MEMORY
========================================================== */

function processMemories(citizen){

    if(typeof memoryTickCitizen === "function"){

        memoryTickCitizen(citizen);

    }

}
