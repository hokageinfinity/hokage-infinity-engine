/* ==========================================================
   Hokage Infinity Engine
   behaviorTree.js
   AI Behavior Tree System
========================================================== */

"use strict";

const BehaviorStatus = {

    SUCCESS: "success",

    FAILURE: "failure",

    RUNNING: "running"

};

/* ==========================================================
    MAIN ENTRY
========================================================== */

function runBehaviorTree(citizen){

    if(checkEmergencyNeeds(citizen))
        return;

    if(checkWork(citizen))
        return;

    if(checkSocial(citizen))
        return;

    if(checkExplore(citizen))
        return;

    idleBehavior(citizen);

}

/* ==========================================================
    EMERGENCY
========================================================== */

function checkEmergencyNeeds(citizen){

    if(citizen.needs.hunger >= 90){

        citizen.goal = "Eat";

        startAction(citizen, ActionType.EAT);

        return true;

    }

    if(citizen.needs.energy <= 10){

        citizen.goal = "Sleep";

        startAction(citizen, ActionType.SLEEP);

        return true;

    }

    return false;

}

/* ==========================================================
    WORK
========================================================== */

function checkWork(citizen){

    if(citizen.job === "Builder"){

        citizen.goal = "Build";

        startAction(citizen, ActionType.BUILD);

        return true;

    }

    if(citizen.job === "Farmer"){

        citizen.goal = "Farm";

        startAction(citizen, ActionType.FARM);

        return true;

    }

    if(citizen.job === "Miner"){

        citizen.goal = "Mine";

        startAction(citizen, ActionType.MINE);

        return true;

    }

    return false;

}

/* ==========================================================
    SOCIAL
========================================================== */

function checkSocial(citizen){

    if(citizen.needs.social < 25){

        citizen.goal = "Talk";

        startAction(citizen, ActionType.TALK);

        return true;

    }

    return false;

}

/* ==========================================================
    EXPLORE
========================================================== */

function checkExplore(citizen){

    citizen.goal = "Explore";

    startAction(citizen, ActionType.EXPLORE);

    return true;

}

/* ==========================================================
    IDLE
========================================================== */

function idleBehavior(citizen){

    citizen.goal = "Idle";

    startAction(citizen, ActionType.IDLE);

}
