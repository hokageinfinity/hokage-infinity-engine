/* ==========================================================
   Hokage Infinity World
   world.js
   Integrated Engine Version 1.0
========================================================== */

"use strict";

/* ==========================================================
    WORLD
========================================================== */

let World = {

    version: "1.0",

    seed: Date.now(),

    name: "Hokage Infinity World",

    time: {

        year: 1,
        day: 1,
        hour: 6,
        minute: 0

    },

    weather: {

        current: "Clear",

        temperature: 72,

        wind: 5

    },

    season: "Spring",

    statistics: {

        births: 0,

        deaths: 0,

        conversations: 0,

        buildings: 0,

        events: 0,

        populationPeak: 0

    }

};

/* ==========================================================
    INITIALIZE
========================================================== */

function initializeWorld(){

    updateSeason();

}

/* ==========================================================
    SEASON
========================================================== */

function updateSeason(){

    const day = World.time.day;

    if(day <= 90){

        World.season = "Spring";

    }

    else if(day <= 180){

        World.season = "Summer";

    }

    else if(day <= 270){

        World.season = "Autumn";

    }

    else{

        World.season = "Winter";

    }

}

/* ==========================================================
    WEATHER
========================================================== */

function updateWeather(){

    const weather = [

        "Clear",

        "Cloudy",

        "Rain",

        "Storm",

        "Fog"

    ];

    if(Math.random() < 0.02){

        World.weather.current =

            weather[

                Math.floor(

                    Math.random() *

                    weather.length

                )

            ];

    }

}

/* ==========================================================
    POPULATION
========================================================== */

function updatePopulationStats(){

    if(

        citizens.length >

        World.statistics.populationPeak

    ){

        World.statistics.populationPeak =

            citizens.length;

    }

}

/* ==========================================================
    WORLD TICK
========================================================== */

function worldTick(){

    updateSeason();

    updateWeather();

    updatePopulationStats();

}

/* ==========================================================
    GET TIME STRING
========================================================== */

function getWorldTime(){

    return

        "Year " +

        World.time.year +

        " Day " +

        World.time.day +

        " " +

        String(World.time.hour)

        .padStart(2,"0")

        + ":" +

        String(World.time.minute)

        .padStart(2,"0");

}

/* ==========================================================
    RANDOM POSITION
========================================================== */

function randomWorldPosition(){

    return{

        x:Math.floor(Math.random()*80),

        y:Math.floor(Math.random()*80)

    };

}

/* ==========================================================
    RESET WORLD
========================================================== */

function resetWorldState(){

    World.time.year = 1;
    World.time.day = 1;
    World.time.hour = 6;
    World.time.minute = 0;

    World.statistics.births = 0;
    World.statistics.deaths = 0;
    World.statistics.conversations = 0;
    World.statistics.buildings = 0;
    World.statistics.events = 0;
    World.statistics.populationPeak = 0;

}
