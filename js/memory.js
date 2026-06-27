/* ==========================================================
   Hokage Infinity Engine
   memory.js
   AI Memory System
========================================================== */

"use strict";

/* ==========================================================
    MEMORY ENGINE
========================================================== */

const MemoryEngine = {

    maxMemories: 500,

    totalMemories: 0

};

/* ==========================================================
    CREATE MEMORY
========================================================== */

function createMemory(

    citizen,

    type,

    description,

    importance = 1

){

    const memory = {

        id: crypto.randomUUID(),

        year: World.time.year,

        day: World.time.day,

        hour: World.time.hour,

        minute: World.time.minute,

        type,

        description,

        importance,

        age: 0

    };

    citizen.memories.unshift(memory);

    MemoryEngine.totalMemories++;

    while(

        citizen.memories.length >

        MemoryEngine.maxMemories

    ){

        citizen.memories.pop();

    }

}

/* ==========================================================
    AGE MEMORIES
========================================================== */

function updateMemoryAges(){

    citizens.forEach(citizen=>{

        citizen.memories.forEach(memory=>{

            memory.age++;

        });

    });

}

/* ==========================================================
    FIND MEMORIES
========================================================== */

function getMemoriesByType(

    citizen,

    type

){

    return citizen.memories.filter(

        memory=>memory.type===type

    );

}

/* ==========================================================
    MOST IMPORTANT
========================================================== */

function getImportantMemories(citizen){

    return citizen.memories

        .filter(

            memory=>memory.importance>=5

        )

        .sort(

            (a,b)=>

            b.importance-a.importance

        );

}

/* ==========================================================
    RECENT MEMORIES
========================================================== */

function getRecentMemories(

    citizen,

    amount=10

){

    return citizen.memories.slice(

        0,

        amount

    );

}

/* ==========================================================
    FORGET SMALL MEMORIES
========================================================== */

function forgetOldMemories(){

    citizens.forEach(citizen=>{

        citizen.memories=

            citizen.memories.filter(memory=>{

                if(memory.importance>=5)

                    return true;

                return memory.age<500;

            });

    });

}

/* ==========================================================
    MEMORY TICK
========================================================== */

function memoryTick(){

    updateMemoryAges();

    forgetOldMemories();

}
