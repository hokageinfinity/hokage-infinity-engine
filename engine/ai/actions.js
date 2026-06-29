/* ==========================================================
   Hokage Infinity Engine
   actions.js
   Universal Action System
========================================================== */

"use strict";

const ActionEngine = {

    activeActions: [],

    completedActions: 0

};

/* ==========================================================
   ACTION TYPES
========================================================== */

const ActionType = {

    IDLE: "Idle",

    WALK: "Walk",

    TALK: "Talk",

    EAT: "Eat",

    SLEEP: "Sleep",

    BUILD: "Build",

    CHOP_TREE: "Chop Tree",

    MINE: "Mine",

    FARM: "Farm",

    FISH: "Fish",

    HUNT: "Hunt",

    CRAFT: "Craft",

    EXPLORE: "Explore"

};

/* ==========================================================
   START ACTION
========================================================== */

function startAction(citizen,type,data={}){

    citizen.action={

        type,

        progress:0,

        duration:data.duration ?? 100,

        target:data.target ?? null,

        data

    };

}

/* ==========================================================
   UPDATE ACTION
========================================================== */

function updateAction(citizen){

    if(!citizen.action){

        startAction(citizen,ActionType.IDLE);

        return;

    }

    citizen.action.progress++;

    if(

        citizen.action.progress>=

        citizen.action.duration

    ){

        finishAction(citizen);

    }

}

/* ==========================================================
   FINISH
========================================================== */

function finishAction(citizen){

    ActionEngine.completedActions++;

    switch(citizen.action.type){

        case ActionType.EAT:

            citizen.needs.hunger=0;
            break;

        case ActionType.SLEEP:

            citizen.needs.energy=100;
            break;

        case ActionType.TALK:

            citizen.needs.social=Math.min(
                100,
                citizen.needs.social+20
            );
            break;

    }

    citizen.action=null;

}

/* ==========================================================
   IS BUSY
========================================================== */

function isBusy(citizen){

    return citizen.action!=null;

}
