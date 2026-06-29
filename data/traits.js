/* ==========================================================
   Hokage Infinity Engine
   traits.js
   Engine Alpha 1.2
========================================================== */

"use strict";

/* ==========================================================
    TRAIT ENGINE
========================================================== */

const TraitEngine = {

    traits: [

        "Brave",
        "Cowardly",
        "Kind",
        "Cruel",
        "Honest",
        "Deceptive",
        "Curious",
        "Lazy",
        "Hardworking",
        "Generous",
        "Greedy",
        "Patient",
        "Impulsive",
        "Creative",
        "Logical",
        "Leader",
        "Follower",
        "Optimistic",
        "Pessimistic",
        "Friendly",
        "Shy",
        "Loyal",
        "Independent",
        "Adventurous",
        "Calm",
        "Aggressive",
        "Wise",
        "Stubborn",
        "Disciplined",
        "Charismatic"

    ]

};

/* ==========================================================
    RANDOM TRAIT
========================================================== */

function randomTrait(){

    return TraitEngine.traits[

        Math.floor(

            Math.random() *

            TraitEngine.traits.length

        )

    ];

}

/* ==========================================================
    ASSIGN TRAITS
========================================================== */

function initializeTraits(){

    citizens.forEach(citizen=>{

        citizen.traits=[];

        while(

            citizen.traits.length<3

        ){

            const trait=

                randomTrait();

            if(

                !citizen.traits.includes(

                    trait

                )

            ){

                citizen.traits.push(

                    trait

                );

            }

        }

    });

}

/* ==========================================================
    HAS TRAIT
========================================================== */

function hasTrait(

    citizen,

    trait

){

    return citizen.traits.includes(

        trait

    );

}

/* ==========================================================
    ADD TRAIT
========================================================== */

function addTrait(

    citizen,

    trait

){

    if(

        !citizen.traits.includes(

            trait

        )

    ){

        citizen.traits.push(

            trait

        );

    }

}

/* ==========================================================
    REMOVE TRAIT
========================================================== */

function removeTrait(

    citizen,

    trait

){

    citizen.traits=

        citizen.traits.filter(

            t=>t!==trait

        );

}

/* ==========================================================
    PERSONALITY SCORE
========================================================== */

function personalityScore(citizen){

    let score=0;

    if(hasTrait(citizen,"Brave")) score+=10;
    if(hasTrait(citizen,"Leader")) score+=10;
    if(hasTrait(citizen,"Hardworking")) score+=8;
    if(hasTrait(citizen,"Kind")) score+=5;
    if(hasTrait(citizen,"Curious")) score+=5;

    if(hasTrait(citizen,"Lazy")) score-=8;
    if(hasTrait(citizen,"Cowardly")) score-=10;
    if(hasTrait(citizen,"Cruel")) score-=6;
    if(hasTrait(citizen,"Greedy")) score-=4;

    return score;

}

/* ==========================================================
    DOMINANT TRAIT
========================================================== */

function dominantTrait(citizen){

    return citizen.traits[0];

}

/* ==========================================================
    TRAIT DESCRIPTION
========================================================== */

function describeCitizen(citizen){

    return citizen.traits.join(", ");

}
