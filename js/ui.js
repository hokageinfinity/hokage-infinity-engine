/* ==========================================================
   Hokage Infinity World
   ui.js
   Integrated Engine Version 1.0
========================================================== */

"use strict";

/* ==========================================================
    UI ENGINE
========================================================== */

const UI = {

    selectedCitizen: null,

    initialized: false

};

/* ==========================================================
    INITIALIZE
========================================================== */

function initializeUI(){

    if(UI.initialized) return;

    setupTabs();

    setupButtons();

    setupSearch();

    UI.initialized = true;

}

/* ==========================================================
    UPDATE EVERYTHING
========================================================== */

function updateAllUI(){

    updateWorldStats();

    updateCitizenList();

    updateHistory();

}

/* ==========================================================
    WORLD STATS
========================================================== */

function updateWorldStats(){

    setText("year",World.time.year);

    setText("day",World.time.day);

    setText("population",citizens.length);

    setText("food",getResource("food"));

    setText("wood",getResource("wood"));

    setText("stone",getResource("stone"));

    setText("gold",getResource("gold"));

}

/* ==========================================================
    CITIZEN LIST
========================================================== */

function updateCitizenList(){

    const list=document.getElementById("citizensList");

    if(!list) return;

    list.innerHTML="";

    citizens.forEach(citizen=>{

        const card=document.createElement("div");

        card.className="citizenCard";

        card.innerHTML=`

            <strong>${citizen.identity.first} ${citizen.identity.last}</strong><br>

            Age: ${citizen.identity.age}<br>

            Job: ${citizen.job.title}<br>

            Mood: ${overallMood(citizen)}<br>

            Goal: ${citizen.goal}<br>

        `;

        card.onclick=()=>{

            selectCitizen(citizen);

        };

        list.appendChild(card);

    });

}

/* ==========================================================
    HISTORY
========================================================== */

function updateHistory(){

    const history=document.getElementById("history");

    if(!history) return;

    history.innerHTML="";

    StoryEngine.history

        .slice(0,100)

        .forEach(entry=>{

            const div=document.createElement("div");

            div.textContent=

                `[Y${entry.year} D${entry.day}] ${entry.text}`;

            history.appendChild(div);

        });

}

/* ==========================================================
    SELECT CITIZEN
========================================================== */

function selectCitizen(citizen){

    UI.selectedCitizen=citizen;

    console.log(

        "Selected Citizen:",

        citizen.identity.first,

        citizen.identity.last

    );

}

/* ==========================================================
    SEARCH
========================================================== */

function setupSearch(){

    const input=document.getElementById(

        "citizenSearch"

    );

    if(!input) return;

    input.addEventListener(

        "input",

        ()=>{

            const value=

                input.value.toLowerCase();

            const cards=

                document.querySelectorAll(

                    ".citizenCard"

                );

            cards.forEach(card=>{

                if(

                    card.textContent

                    .toLowerCase()

                    .includes(value)

                ){

                    card.style.display="block";

                }

                else{

                    card.style.display="none";

                }

            });

        }

    );

}

/* ==========================================================
    BUTTONS
========================================================== */

function setupButtons(){

    const save=document.getElementById("saveBtn");

    const load=document.getElementById("loadBtn");

    const reset=document.getElementById("resetBtn");

    if(save) save.onclick=saveWorld;

    if(load) load.onclick=()=>{

        loadWorld();

        updateAllUI();

    };

    if(reset) reset.onclick=resetWorld;

}

/* ==========================================================
    TABS
========================================================== */

function setupTabs(){

    const buttons=document.querySelectorAll(".tabBtn");

    buttons.forEach(button=>{

        button.onclick=()=>{

            document

                .querySelectorAll(".tab")

                .forEach(tab=>{

                    tab.classList.remove("active");

                });

            buttons.forEach(b=>{

                b.classList.remove("active");

            });

            button.classList.add("active");

            document

                .getElementById(

                    button.dataset.tab

                )

                .classList.add("active");

        };

    });

}

/* ==========================================================
    HELPER
========================================================== */

function setText(id,value){

    const element=

        document.getElementById(id);

    if(element){

        element.textContent=value;

    }

}
