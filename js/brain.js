/* ==========================================================
   Hokage Infinity World
   brain.js
   AI God Brain Engine
   Version 2.0 Alpha
========================================================== */

"use strict";

const BrainEngine = {

    citizensThinking:0,

    decisionsMade:0,

    thoughtsGenerated:0,

    enabled:true

};

/* ==========================================================
    UPDATE ALL BRAINS
========================================================== */

function updateBrains(){

    if(!BrainEngine.enabled)
        return;

    citizens.forEach(citizen=>{

        think(citizen);

        decide(citizen);

        plan(citizen);

    });

}

/* ==========================================================
    THINK
========================================================== */

function think(citizen){

    BrainEngine.thoughtsGenerated++;

    if(citizen.needs.hunger>80){

        citizen.currentThought=

            "I'm getting hungry.";

        return;

    }

    if(citizen.needs.energy<20){

        citizen.currentThought=

            "I'm exhausted.";

        return;

    }

    if(citizen.goal==="Build"){

        citizen.currentThought=

            "I want to finish construction.";

        return;

    }

    if(citizen.goal==="Farm"){

        citizen.currentThought=

            "The crops need attention.";

        return;

    }

    citizen.currentThought=

        "I wonder what today will bring.";

}

/* ==========================================================
    DECIDE
========================================================== */

function decide(citizen){

    BrainEngine.decisionsMade++;

    if(citizen.needs.hunger>80){

        citizen.goal="Eat";

        return;

    }

    if(citizen.needs.energy<20){

        citizen.goal="Sleep";

        return;

    }

    if(citizen.needs.social<25){

        citizen.goal="Talk";

        return;

    }

}

/* ==========================================================
    PLAN
========================================================== */

function plan(citizen){

    switch(citizen.goal){

        case "Eat":

            citizen.currentTask="Finding Food";
            break;

        case "Sleep":

            citizen.currentTask="Going Home";
            break;

        case "Talk":

            citizen.currentTask="Finding Someone";
            break;

        case "Farm":

            citizen.currentTask="Working";
            break;

        case "Build":

            citizen.currentTask="Constructing";
            break;

        default:

            citizen.currentTask="Exploring";

    }

}

/* ==========================================================
    ENABLE
========================================================== */

function enableBrain(){

    BrainEngine.enabled=true;

}

/* ==========================================================
    DISABLE
========================================================== */

function disableBrain(){

    BrainEngine.enabled=false;

}
