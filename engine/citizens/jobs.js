/* ==========================================================
   Hokage Infinity Engine
   jobs.js
   Engine Alpha 1.2
========================================================== */

"use strict";

/* ==========================================================
    JOB ENGINE
========================================================== */

const JobEngine = {

    jobs: {

        Farmer: {

            produces: "Food",

            workplace: "Farm"

        },

        Lumberjack: {

            produces: "Wood",

            workplace: "Forest"

        },

        Miner: {

            produces: "Stone",

            workplace: "Mine"

        },

        Builder: {

            produces: "Buildings",

            workplace: "Construction"

        },

        Merchant: {

            produces: "Gold",

            workplace: "Market"

        },

        Hunter: {

            produces: "Food",

            workplace: "Forest"

        },

        Blacksmith: {

            produces: "Tools",

            workplace: "Forge"

        }

    }

};

/* ==========================================================
    INITIALIZE JOBS
========================================================== */

function initializeJobs(){

    citizens.forEach(citizen=>{

        citizen.jobProgress=0;

        citizen.currentTask="Idle";

        citizen.workTimer=0;

    });

}

/* ==========================================================
    START WORK
========================================================== */

function startWorking(citizen){

    citizen.currentTask="Working";

    citizen.workTimer=0;

}

/* ==========================================================
    STOP WORK
========================================================== */

function stopWorking(citizen){

    citizen.currentTask="Idle";

}

/* ==========================================================
    WORK UPDATE
========================================================== */

function updateCitizenWork(citizen){

    citizen.workTimer++;

    citizen.jobProgress++;

    switch(citizen.job.title){

        case "Farmer":

            World.resources.food++;

            break;

        case "Lumberjack":

            World.resources.wood++;

            break;

        case "Miner":

            World.resources.stone++;

            break;

        case "Merchant":

            World.resources.gold++;

            break;

        case "Hunter":

            World.resources.food++;

            break;

        case "Builder":

            break;

        case "Blacksmith":

            break;

    }

    if(citizen.workTimer>=50){

        stopWorking(citizen);

    }

}

/* ==========================================================
    JOB AI
========================================================== */

function updateJobs(){

    citizens.forEach(citizen=>{

        if(citizen.currentTask==="Idle"){

            if(Math.random()<0.02){

                startWorking(citizen);

            }

        }

        else if(citizen.currentTask==="Working"){

            updateCitizenWork(citizen);

        }

    });

}

/* ==========================================================
    GET JOB INFO
========================================================== */

function getJobInfo(jobName){

    return JobEngine.jobs[jobName];

}

/* ==========================================================
    CHANGE JOB
========================================================== */

function changeCitizenJob(

    citizen,

    newJob

){

    if(

        !JobEngine.jobs[newJob]

    ) return;

    citizen.job.title=newJob;

    citizen.jobProgress=0;

    citizen.currentTask="Idle";

}

/* ==========================================================
    FUTURE HOOKS
========================================================== */

function assignDailyTasks(){

    // Future AI Scheduler

}

function assignWorkplace(){

    // Future Building System

}

function assignInventory(){

    // Future Inventory System

}
