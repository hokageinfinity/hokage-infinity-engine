/* ==========================================================
   Hokage Infinity Engine
   resources.js
   Engine Alpha 1.2
========================================================== */

"use strict";

/* ==========================================================
    RESOURCE ENGINE
========================================================== */

const ResourceEngine = {

    resources: {

        food: 1000,
        wood: 500,
        stone: 250,
        gold: 100,
        iron: 0,
        coal: 0,
        clay: 0,
        water: 1000

    },

    nodes: []

};

/* ==========================================================
    GET RESOURCE
========================================================== */

function getResource(name){

    return ResourceEngine.resources[name] || 0;

}

/* ==========================================================
    SET RESOURCE
========================================================== */

function setResource(name,value){

    ResourceEngine.resources[name] =

        Math.max(0,value);

}

/* ==========================================================
    ADD RESOURCE
========================================================== */

function addResource(name,amount){

    if(ResourceEngine.resources[name]===undefined){

        ResourceEngine.resources[name]=0;

    }

    ResourceEngine.resources[name]+=amount;

}

/* ==========================================================
    REMOVE RESOURCE
========================================================== */

function removeResource(name,amount){

    if(ResourceEngine.resources[name]===undefined)

        return false;

    if(ResourceEngine.resources[name]<amount)

        return false;

    ResourceEngine.resources[name]-=amount;

    return true;

}

/* ==========================================================
    HAS RESOURCE
========================================================== */

function hasResource(name,amount){

    return getResource(name)>=amount;

}

/* ==========================================================
    RESOURCE NODE
========================================================== */

function createResourceNode(

    type,

    x,

    y,

    amount

){

    const node={

        id:crypto.randomUUID(),

        type,

        x,

        y,

        amount,

        maxAmount:amount

    };

    ResourceEngine.nodes.push(node);

    return node;

}

/* ==========================================================
    HARVEST
========================================================== */

function harvestNode(

    node,

    amount

){

    node.amount-=amount;

    if(node.amount<0)

        node.amount=0;

    addResource(

        node.type.toLowerCase(),

        amount

    );

}

/* ==========================================================
    REMOVE EMPTY
========================================================== */

function cleanupNodes(){

    ResourceEngine.nodes=

        ResourceEngine.nodes.filter(

            n=>n.amount>0

        );

}

/* ==========================================================
    GENERATE WORLD
========================================================== */

function generateResources(){

    for(let i=0;i<200;i++){

        createResourceNode(

            "Wood",

            Math.floor(Math.random()*80),

            Math.floor(Math.random()*80),

            50

        );

    }

    for(let i=0;i<120;i++){

        createResourceNode(

            "Stone",

            Math.floor(Math.random()*80),

            Math.floor(Math.random()*80),

            80

        );

    }

    for(let i=0;i<40;i++){

        createResourceNode(

            "Iron",

            Math.floor(Math.random()*80),

            Math.floor(Math.random()*80),

            100

        );

    }

}

/* ==========================================================
    TICK
========================================================== */

function resourceTick(){

    cleanupNodes();

}

/* ==========================================================
    UPDATE UI
========================================================== */

function updateResourceDisplay(){

    if(document.getElementById("food"))

        document.getElementById("food").textContent=

            getResource("food");

    if(document.getElementById("wood"))

        document.getElementById("wood").textContent=

            getResource("wood");

    if(document.getElementById("stone"))

        document.getElementById("stone").textContent=

            getResource("stone");

    if(document.getElementById("gold"))

        document.getElementById("gold").textContent=

            getResource("gold");

}

/* ==========================================================
    INITIALIZE
========================================================== */

function initializeResources(){

    generateResources();

    updateResourceDisplay();

}
