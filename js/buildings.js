/* ==========================================================
   Hokage Infinity Engine
   buildings.js
   Engine Alpha 1.2
========================================================== */

"use strict";

/* ==========================================================
    BUILDING ENGINE
========================================================== */

const BuildingEngine = {

    buildings: [],

    types: {

        House: {
            maxHealth: 100,
            woodCost: 25,
            stoneCost: 5,
            capacity: 4
        },

        Farm: {
            maxHealth: 80,
            woodCost: 20,
            stoneCost: 10,
            production: "Food"
        },

        LumberCamp: {
            maxHealth: 90,
            woodCost: 15,
            stoneCost: 15,
            production: "Wood"
        },

        Mine: {
            maxHealth: 120,
            woodCost: 30,
            stoneCost: 20,
            production: "Stone"
        },

        Market: {
            maxHealth: 150,
            woodCost: 40,
            stoneCost: 30,
            production: "Gold"
        },

        TownHall: {
            maxHealth: 300,
            woodCost: 100,
            stoneCost: 100
        }

    }

};

/* ==========================================================
    CREATE BUILDING
========================================================== */

function createBuilding(type, x, y) {

    if (!BuildingEngine.types[type])
        return null;

    const template =
        BuildingEngine.types[type];

    const building = {

        id: crypto.randomUUID(),

        type,

        x,
        y,

        health: template.maxHealth,

        level: 1,

        workers: [],

        completed: true

    };

    BuildingEngine.buildings.push(building);

    addStory(

        StoryEngine.categories.BUILDING,

        `${type} constructed.`

    );

    return building;

}

/* ==========================================================
    REMOVE BUILDING
========================================================== */

function removeBuilding(id){

    BuildingEngine.buildings =

        BuildingEngine.buildings.filter(

            b => b.id !== id

        );

}

/* ==========================================================
    FIND BUILDING
========================================================== */

function getBuilding(id){

    return BuildingEngine.buildings.find(

        b => b.id === id

    );

}

/* ==========================================================
    FIND BY TYPE
========================================================== */

function getBuildingsByType(type){

    return BuildingEngine.buildings.filter(

        b => b.type === type

    );

}

/* ==========================================================
    DAMAGE
========================================================== */

function damageBuilding(

    building,

    amount

){

    building.health -= amount;

    if(building.health <= 0){

        removeBuilding(

            building.id

        );

    }

}

/* ==========================================================
    REPAIR
========================================================== */

function repairBuilding(

    building,

    amount

){

    const max =

        BuildingEngine.types

        [building.type]

        .maxHealth;

    building.health += amount;

    if(building.health > max)

        building.health = max;

}

/* ==========================================================
    ASSIGN WORKER
========================================================== */

function assignWorker(

    building,

    citizenID

){

    if(

        !building.workers.includes(

            citizenID

        )

    ){

        building.workers.push(

            citizenID

        );

    }

}

/* ==========================================================
    REMOVE WORKER
========================================================== */

function removeWorker(

    building,

    citizenID

){

    building.workers =

        building.workers.filter(

            id => id !== citizenID

        );

}

/* ==========================================================
    UPDATE
========================================================== */

function updateBuildings(){

    BuildingEngine.buildings.forEach(

        building=>{

            if(

                building.health <

                BuildingEngine.types

                [building.type]

                .maxHealth

            ){

                building.health += 0.01;

            }

        }

    );

}

/* ==========================================================
    STARTING VILLAGE
========================================================== */

function generateStartingVillage(){

    createBuilding(

        "TownHall",

        20,

        20

    );

    createBuilding(

        "House",

        17,

        20

    );

    createBuilding(

        "House",

        23,

        20

    );

    createBuilding(

        "Farm",

        20,

        24

    );

}
