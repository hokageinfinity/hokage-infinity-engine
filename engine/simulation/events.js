/* ==========================================================
   Hokage Infinity Engine
   events.js
   Engine Alpha 1.2
========================================================== */

"use strict";

/* ==========================================================
    EVENT ENGINE
========================================================== */

const EventEngine = {

    activeEvents: [],

    completedEvents: [],

    templates: [

        "Harvest Festival",
        "Forest Fire",
        "Heavy Rain",
        "Bandit Attack",
        "Merchant Caravan",
        "Animal Migration",
        "Village Celebration",
        "Food Shortage",
        "Disease Outbreak",
        "Gold Discovery"

    ]

};

/* ==========================================================
    CREATE EVENT
========================================================== */

function createEvent(name, description) {

    const event = {

        id: crypto.randomUUID(),

        name,

        description,

        year: World.time.year,

        day: World.time.day,

        hour: World.time.hour,

        duration: 24,

        completed: false

    };

    EventEngine.activeEvents.push(event);

    addStory(

        StoryEngine.categories.EVENT,

        `${name}: ${description}`

    );

    return event;

}

/* ==========================================================
    COMPLETE EVENT
========================================================== */

function completeEvent(eventID) {

    const event = EventEngine.activeEvents.find(

        e => e.id === eventID

    );

    if (!event) return;

    event.completed = true;

    EventEngine.completedEvents.push(event);

    EventEngine.activeEvents =

        EventEngine.activeEvents.filter(

            e => e.id !== eventID

        );

}

/* ==========================================================
    RANDOM EVENT
========================================================== */

function triggerRandomEvent() {

    const template =

        EventEngine.templates[

            Math.floor(

                Math.random() *

                EventEngine.templates.length

            )

        ];

    switch(template){

        case "Harvest Festival":

            addResource("food",200);

            createEvent(

                template,

                "The harvest exceeded expectations."

            );

            break;

        case "Forest Fire":

            removeResource("wood",100);

            createEvent(

                template,

                "A fire destroyed part of the forest."

            );

            break;

        case "Heavy Rain":

            addResource("water",250);

            createEvent(

                template,

                "Rain replenished lakes and rivers."

            );

            break;

        case "Bandit Attack":

            removeResource("gold",25);

            createEvent(

                template,

                "Bandits stole valuables."

            );

            break;

        case "Merchant Caravan":

            addResource("gold",50);

            createEvent(

                template,

                "Merchants boosted the economy."

            );

            break;

        case "Animal Migration":

            addResource("food",100);

            createEvent(

                template,

                "Wild game became plentiful."

            );

            break;

        case "Village Celebration":

            createEvent(

                template,

                "Citizens celebrated together."

            );

            break;

        case "Food Shortage":

            removeResource("food",200);

            createEvent(

                template,

                "Supplies began running low."

            );

            break;

        case "Disease Outbreak":

            createEvent(

                template,

                "Illness spread through the settlement."

            );

            break;

        case "Gold Discovery":

            addResource("gold",150);

            createEvent(

                template,

                "A rich vein of gold was found."

            );

            break;

    }

}

/* ==========================================================
    UPDATE EVENTS
========================================================== */

function updateEvents(){

    EventEngine.activeEvents.forEach(event=>{

        event.duration--;

        if(event.duration<=0){

            completeEvent(event.id);

        }

    });

}

/* ==========================================================
    EVENT TICK
========================================================== */

function eventTick(){

    if(Math.random()<0.002){

        triggerRandomEvent();

    }

    updateEvents();

}

/* ==========================================================
    GOD EVENT
========================================================== */

function createGodEvent(text){

    createEvent(

        "God Intervention",

        text

    );

}

/* ==========================================================
    GETTERS
========================================================== */

function getActiveEvents(){

    return EventEngine.activeEvents;

}

function getCompletedEvents(){

    return EventEngine.completedEvents;

}

/* ==========================================================
    INITIALIZE
========================================================== */

function initializeEvents(){

    console.log(

        "Event Engine Initialized"

    );

}
