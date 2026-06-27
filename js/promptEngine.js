/* ==========================================================
   Hokage Infinity Engine
   promptEngine.js
   Engine Alpha 1.2
========================================================== */

"use strict";

/* ==========================================================
    GOD BRAIN
========================================================== */

const PromptEngine = {

    history: [],

    lastPrompt: "",

    commandCount: 0

};

/* ==========================================================
    INITIALIZE
========================================================== */

function initializePromptEngine() {

    console.log("God Brain Initialized");

}

/* ==========================================================
    SUBMIT PROMPT
========================================================== */

function submitPrompt(prompt) {

    if (!prompt) return;

    PromptEngine.lastPrompt = prompt;

    PromptEngine.commandCount++;

    PromptEngine.history.unshift({

        id: crypto.randomUUID(),

        prompt,

        year: World.time.year,

        day: World.time.day,

        hour: World.time.hour

    });

    addStory(

        StoryEngine.categories.GOD,

        prompt

    );

    processPrompt(prompt);

}

/* ==========================================================
    PROCESS
========================================================== */

function processPrompt(prompt) {

    const text = prompt.toLowerCase();

    /* ---------- FOOD ---------- */

    if (text.includes("food")) {

        addResource("food",500);

        createGodEvent(

            "Food appeared across the land."

        );

    }

    /* ---------- WOOD ---------- */

    if (text.includes("wood")) {

        addResource("wood",300);

        createGodEvent(

            "Forests rapidly expanded."

        );

    }

    /* ---------- STONE ---------- */

    if (text.includes("stone")) {

        addResource("stone",300);

        createGodEvent(

            "New stone deposits emerged."

        );

    }

    /* ---------- GOLD ---------- */

    if (text.includes("gold")) {

        addResource("gold",500);

        createGodEvent(

            "Gold veins appeared."

        );

    }

    /* ---------- HAPPY ---------- */

    if (

        text.includes("happy") ||

        text.includes("joy")

    ){

        citizens.forEach(c=>{

            changeEmotion(

                c,

                "joy",

                25

            );

        });

    }

    /* ---------- SAD ---------- */

    if (

        text.includes("sad")

    ){

        citizens.forEach(c=>{

            changeEmotion(

                c,

                "sadness",

                25

            );

        });

    }

    /* ---------- ANGRY ---------- */

    if (

        text.includes("angry")

    ){

        citizens.forEach(c=>{

            changeEmotion(

                c,

                "anger",

                25

            );

        });

    }

    /* ---------- FESTIVAL ---------- */

    if (

        text.includes("festival")

    ){

        createEvent(

            "Festival",

            "The people celebrate."

        );

    }

    /* ---------- FIRE ---------- */

    if (

        text.includes("fire")

    ){

        createEvent(

            "Fire",

            "A destructive blaze spreads."

        );

    }

    /* ---------- RAIN ---------- */

    if (

        text.includes("rain")

    ){

        createEvent(

            "Rain",

            "Rain nourishes the land."

        );

    }

    /* ---------- VILLAGE ---------- */

    if (

        text.includes("village")

    ){

        createBuilding(

            "House",

            Math.floor(Math.random()*80),

            Math.floor(Math.random()*80)

        );

    }

    /* ---------- FARM ---------- */

    if (

        text.includes("farm")

    ){

        createBuilding(

            "Farm",

            Math.floor(Math.random()*80),

            Math.floor(Math.random()*80)

        );

    }

    /* ---------- RANDOM ---------- */

    if (

        text.includes("random")

    ){

        triggerRandomEvent();

    }

}

/* ==========================================================
    HISTORY
========================================================== */

function getPromptHistory() {

    return PromptEngine.history;

}

/* ==========================================================
    CLEAR
========================================================== */

function clearPromptHistory() {

    PromptEngine.history = [];

}

/* ==========================================================
    UI
========================================================== */

function setupPromptSystem() {

    const button =

        document.getElementById(

            "promptButton"

        );

    const input =

        document.getElementById(

            "promptInput"

        );

    if (!button || !input)

        return;

    button.addEventListener(

        "click",

        ()=>{

            submitPrompt(

                input.value

            );

            input.value="";

        }

    );

}
