/* ==========================================================
   Hokage Infinity World
   citizens.js
   Integrated Engine Version 1.0
   Part 1 / 2
========================================================== */

"use strict";

/* ==========================================================
    CITIZEN STORAGE
========================================================== */

let citizens = [];

/* ==========================================================
    CREATE CITIZEN
========================================================== */

function createCitizen(){

    const name = generateUniqueCitizenName();

    const position = randomWorldPosition();

    const citizen = {

        /* ---------- Identity ---------- */

        identity:{

            id:crypto.randomUUID(),

            first:name.first,

            last:name.last,

            age:Math.floor(Math.random()*40)+18,

            gender:

                Math.random()<0.5

                ?"Male"

                :"Female"

        },

        /* ---------- Position ---------- */

        position:{

            x:position.x,

            y:position.y

        },

        path:[],

        /* ---------- Life ---------- */

        alive:true,

        health:100,

        energy:100,

        hunger:0,

        /* ---------- Needs ---------- */

        needs:{

            hunger:0,

            energy:100,

            social:80,

            happiness:80

        },

        /* ---------- Job ---------- */

        job:{

            title:randomJob()

        },

        currentTask:"Idle",

        goal:"Explore",

        /* ---------- Personality ---------- */

        traits:[],

        /* ---------- Relationships ---------- */

        friends:[],

        enemies:[],

        family:[],

        spouse:null,

        /* ---------- AI ---------- */

        memories:[],

        achievements:[],

        inventory:[],

        home:null,

        workplace:null,

        dailySchedule:[],

        currentThought:"",

        currentConversation:null

    };

    citizens.push(citizen);

    return citizen;

}

/* ==========================================================
    INITIAL POPULATION
========================================================== */

function initializeCitizens(){

    citizens=[];

    for(let i=0;i<100;i++){

        createCitizen();

    }

}

/* ==========================================================
    RANDOM JOB
========================================================== */

function randomJob(){

    const jobs=[

        "Farmer",

        "Builder",

        "Miner",

        "Merchant",

        "Hunter",

        "Lumberjack",

        "Blacksmith"

    ];

    return jobs[

        Math.floor(

            Math.random()*jobs.length

        )

    ];

}

/* ==========================================================
    FIND CITIZEN
========================================================== */

function getCitizen(id){

    return citizens.find(

        c=>c.identity.id===id

    );

}

/* ==========================================================
    REMOVE CITIZEN
========================================================== */

function removeCitizen(id){

    citizens=

        citizens.filter(

            c=>c.identity.id!==id

        );

}

/* ==========================================================
    MEMORY
========================================================== */

function addMemory(

    citizen,

    memory

){

    citizen.memories.unshift({

        text:memory,

        year:World.time.year,

        day:World.time.day

    });

    if(citizen.memories.length>100){

        citizen.memories.pop();

    }

}

/* ==========================================================
    ACHIEVEMENTS
========================================================== */

function addAchievement(

    citizen,

    achievement

){

    if(

        !citizen.achievements.includes(

            achievement

        )

    ){

        citizen.achievements.push(

            achievement

        );

    }

}
/* ==========================================================
    AGING
========================================================== */

function updateCitizenAge(citizen){

    if(
        World.time.day === 1 &&
        World.time.hour === 0 &&
        World.time.minute === 0
    ){
        citizen.identity.age++;
    }

}

/* ==========================================================
    LIFE
========================================================== */

function updateCitizenLife(citizen){

    if(citizen.health<=0){

        citizen.alive=false;

        World.statistics.deaths++;

        addStory(
            StoryEngine.categories.CITIZEN,
            citizen.identity.first +
            " has died."
        );

    }

}

/* ==========================================================
    INVENTORY
========================================================== */

function addInventoryItem(

    citizen,

    item,

    amount=1

){

    citizen.inventory.push({

        item,

        amount

    });

}

function removeInventoryItem(

    citizen,

    item

){

    citizen.inventory=

        citizen.inventory.filter(

            i=>i.item!==item

        );

}

/* ==========================================================
    DAILY ROUTINE
========================================================== */

function updateDailySchedule(citizen){

    const hour=World.time.hour;

    if(hour>=6 && hour<8){

        citizen.currentTask="Wake Up";

    }

    else if(hour>=8 && hour<17){

        citizen.currentTask="Working";

    }

    else if(hour>=17 && hour<20){

        citizen.currentTask="Socializing";

    }

    else if(hour>=20 && hour<22){

        citizen.currentTask="Relaxing";

    }

    else{

        citizen.currentTask="Sleeping";

    }

}

/* ==========================================================
    GOALS
========================================================== */

function updateCitizenAI(citizen){

    if(citizen.goal==="Explore"){

        if(
            !citizen.path ||
            citizen.path.length===0
        ){

            const target=randomWorldPosition();

            moveCitizenTo(

                citizen,

                target.x,

                target.y

            );

        }

    }

}

/* ==========================================================
    HAPPINESS
========================================================== */

function calculateCitizenHappiness(citizen){

    citizen.needs.happiness=

        100-

        citizen.needs.hunger+

        citizen.needs.energy/2;

    if(

        citizen.needs.happiness>100

    ){

        citizen.needs.happiness=100;

    }

    if(

        citizen.needs.happiness<0

    ){

        citizen.needs.happiness=0;

    }

}

/* ==========================================================
    MEMORIES
========================================================== */

function updateCitizenMemories(citizen){

    if(Math.random()<0.001){

        addMemory(

            citizen,

            "Had an ordinary day."

        );

    }

}

/* ==========================================================
    ACHIEVEMENTS
========================================================== */

function updateCitizenAchievements(citizen){

    if(

        citizen.identity.age>=50 &&

        !citizen.achievements.includes(

            "Village Elder"

        )

    ){

        addAchievement(

            citizen,

            "Village Elder"

        );

    }

}

/* ==========================================================
    UPDATE ONE
========================================================== */

function updateCitizen(citizen){

    if(!citizen.alive)

        return;

    updateCitizenAge(citizen);

    updateCitizenLife(citizen);

    updateDailySchedule(citizen);

    updateCitizenAI(citizen);

    calculateCitizenHappiness(citizen);

    updateCitizenMemories(citizen);

    updateCitizenAchievements(citizen);

}

/* ==========================================================
    UPDATE ALL
========================================================== */

function updateCitizens(){

    citizens.forEach(

        citizen=>{

            updateCitizen(

                citizen

            );

        }

    );

}

/* ==========================================================
    POPULATION
========================================================== */

function getPopulation(){

    return citizens.filter(

        c=>c.alive

    ).length;

}

/* ==========================================================
    RANDOM CITIZEN
========================================================== */

function randomCitizen(){

    return citizens[

        Math.floor(

            Math.random()*

            citizens.length

        )

    ];

}

/* ==========================================================
    FUTURE AI HOOKS
========================================================== */

function processCitizenThoughts(){

    // AI Brain Phase 2

}

function processCitizenRelationships(){

    // AI Brain Phase 2

}

function processCitizenConversations(){

    // AI Brain Phase 2

}

function processCitizenDreams(){

    // AI Brain Phase 3

}

function processCitizenPlanning(){

    // AI Brain Phase 3

}
