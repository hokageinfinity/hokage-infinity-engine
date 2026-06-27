/* ==========================================================
   Hokage Infinity Engine
   names.js
   Engine Alpha 1.2
========================================================== */

"use strict";

/* ==========================================================
    NAME ENGINE
========================================================== */

const NameEngine = {

    firstNames: [

        "Aiden","Alex","Amelia","Anna","Aria",
        "Benjamin","Blake","Brandon","Caleb","Carter",
        "Charlotte","Chloe","Christopher","Daniel","David",
        "Ethan","Emma","Emily","Evelyn","Gabriel",
        "Grace","Hannah","Harper","Henry","Isaac",
        "Isabella","Jack","Jackson","Jacob","James",
        "Jaxon","John","Jonathan","Joseph","Joshua",
        "Layla","Leah","Leo","Liam","Lillian",
        "Logan","Lucas","Luke","Madison","Mason",
        "Matthew","Mia","Michael","Nathan","Noah",
        "Nora","Oliver","Olivia","Owen","Penelope",
        "Riley","Ryan","Samuel","Scarlett","Sebastian",
        "Sophia","Stella","Theodore","Victoria","William",
        "Wyatt","Zoe"

    ],

    lastNames: [

        "Adams","Allen","Anderson","Baker","Bennett",
        "Brooks","Brown","Campbell","Carter","Clark",
        "Collins","Cooper","Cox","Davis","Diaz",
        "Edwards","Evans","Fisher","Flores","Garcia",
        "Gonzalez","Gray","Green","Hall","Harris",
        "Hayes","Hernandez","Hill","Howard","Hughes",
        "Jackson","Johnson","Jones","Kelly","King",
        "Lee","Lewis","Long","Lopez","Martin",
        "Martinez","Miller","Mitchell","Moore","Morgan",
        "Morris","Murphy","Nelson","Parker","Perez",
        "Peterson","Phillips","Powell","Price","Ramirez",
        "Reed","Richardson","Rivera","Roberts","Robinson",
        "Rodriguez","Rogers","Ross","Russell","Sanders",
        "Scott","Smith","Stewart","Taylor","Thomas",
        "Thompson","Turner","Walker","Ward","Watson",
        "White","Williams","Wilson","Wood","Wright",
        "Young"

    ]

};

/* ==========================================================
    RANDOM FIRST NAME
========================================================== */

function randomFirstName(){

    return NameEngine.firstNames[

        Math.floor(

            Math.random() *

            NameEngine.firstNames.length

        )

    ];

}

/* ==========================================================
    RANDOM LAST NAME
========================================================== */

function randomLastName(){

    return NameEngine.lastNames[

        Math.floor(

            Math.random() *

            NameEngine.lastNames.length

        )

    ];

}

/* ==========================================================
    FULL NAME
========================================================== */

function generateCitizenName(){

    return {

        first: randomFirstName(),

        last: randomLastName()

    };

}

/* ==========================================================
    DISPLAY NAME
========================================================== */

function getCitizenDisplayName(citizen){

    return

        citizen.identity.first +

        " " +

        citizen.identity.last;

}

/* ==========================================================
    FIND CITIZEN
========================================================== */

function findCitizenByName(name){

    return citizens.find(citizen=>{

        return (

            citizen.identity.first +

            " " +

            citizen.identity.last

        )===name;

    });

}

/* ==========================================================
    UNIQUE NAME
========================================================== */

function generateUniqueCitizenName(){

    let name;

    do{

        name = generateCitizenName();

    }

    while(

        citizens.some(c=>

            c.identity.first===name.first &&

            c.identity.last===name.last

        )

    );

    return name;

}
