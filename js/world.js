/* ==========================================================
   Hokage Infinity Engine
   world.js
   Engine Alpha 1
========================================================== */

const World = {

    version: "Engine Alpha 1",

    running: true,

    speed: 1,

    tick: 0,

    /* =====================================
                TIME
    ===================================== */

    time: {

        year: 1,

        season: "Spring",

        day: 1,

        hour: 8,

        minute: 0

    },

    /* =====================================
               WEATHER
    ===================================== */

    weather: {

        type: "Sunny",

        temperature: 72,

        wind: 3,

        rain: 0

    },

    /* =====================================
             WORLD SETTINGS
    ===================================== */

    settings: {

        width: 100,

        height: 100,

        tileSize: 32

    },

    /* =====================================
               RESOURCES
    ===================================== */

    resources: {

        food: 1000,

        wood: 500,

        stone: 250,

        gold: 100

    },

    /* =====================================
             POPULATION
    ===================================== */

    population: {

        total: 0,

        births: 0,

        deaths: 0

    },

    /* =====================================
               KINGDOMS
    ===================================== */

    kingdoms: [],

    /* =====================================
                 MAP
    ===================================== */

    map: [],

    /* =====================================
             WORLD HISTORY
    ===================================== */

    history: [],

    /* =====================================
               EVENTS
    ===================================== */

    activeEvents: []

};

/* ==========================================================
    CREATE MAP
========================================================== */

function createWorldMap() {

    World.map = [];

    for (let y = 0; y < World.settings.height; y++) {

        const row = [];

        for (let x = 0; x < World.settings.width; x++) {

            row.push({

                x,

                y,

                terrain: "grass",

                resource: null,

                building: null,

                citizens: [],

                discovered: true

            });

        }

        World.map.push(row);

    }

}

/* ==========================================================
    PLACE BASIC RESOURCES
========================================================== */

function generateResources() {

    for (let y = 0; y < World.settings.height; y++) {

        for (let x = 0; x < World.settings.width; x++) {

            const tile = World.map[y][x];

            const roll = Math.random();

            if (roll < 0.08) {

                tile.resource = "tree";

            }
            else if (roll < 0.11) {

                tile.resource = "stone";

            }
            else if (roll < 0.13) {

                tile.resource = "berries";

            }

        }

    }

}

/* ==========================================================
      WORLD HISTORY
========================================================== */

function addWorldStory(text) {

    World.history.unshift({

        year: World.time.year,

        day: World.time.day,

        message: text

    });

}

/* ==========================================================
       TIME SYSTEM
========================================================== */

function advanceTime(minutes) {

    World.time.minute += minutes;

    while (World.time.minute >= 60) {

        World.time.minute -= 60;

        World.time.hour++;

    }

    while (World.time.hour >= 24) {

        World.time.hour = 0;

        World.time.day++;
    }

    while (World.time.day > 90) {

        World.time.day = 1;

        nextSeason();

    }

}

/* ==========================================================
        SEASONS
========================================================== */

function nextSeason() {

    switch (World.time.season) {

        case "Spring":

            World.time.season = "Summer";

            break;

        case "Summer":

            World.time.season = "Autumn";

            break;

        case "Autumn":

            World.time.season = "Winter";

            break;

        default:

            World.time.season = "Spring";

            World.time.year++;

    }

    addWorldStory(

        "The world enters " + World.time.season + "."

    );

}

/* ==========================================================
        START WORLD
========================================================== */

function initializeWorld() {

    createWorldMap();

    generateResources();

    addWorldStory(

        "The world has been created."

    );

}
