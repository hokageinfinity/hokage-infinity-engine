/* ==========================================================
   Hokage Infinity Engine
   ui.js
   Engine Alpha 1
========================================================== */

"use strict";

/* ==========================================================
    ELEMENTS
========================================================== */

const citizensList =
    document.getElementById("citizensList");

const citizenProfile =
    document.getElementById("citizenProfile");

const storyFeed =
    document.getElementById("storyFeed");

const citizenSearch =
    document.getElementById("citizenSearch");

const worldPrompt =
    document.getElementById("worldPrompt");

const applyPromptBtn =
    document.getElementById("applyPromptBtn");

/* ==========================================================
    INITIALIZE UI
========================================================== */

function initializeUI() {

    updateCitizenList();

    updateCitizenPanel();

    updateStoryFeed();

    setupSearch();

    setupPromptButton();

}

/* ==========================================================
    CITIZEN LIST
========================================================== */

function updateCitizenList() {

    if (!citizensList) return;

    citizensList.innerHTML = "";

    let search = "";

    if (citizenSearch) {

        search = citizenSearch.value
            .toLowerCase()
            .trim();

    }

    citizens.forEach(citizen => {

        const fullName =
            citizen.identity.firstName +
            " " +
            citizen.identity.lastName;

        if (
            search &&
            !fullName.toLowerCase().includes(search)
        ) {
            return;
        }

        const card =
            document.createElement("div");

        card.className = "citizen";

        card.innerHTML = `
            <strong>${fullName}</strong><br>
            ${citizen.job.title}<br>
            Age ${citizen.identity.age}
        `;

        card.onclick = () => {

            selectCitizen(
                citizen.identity.id
            );

        };

        citizensList.appendChild(card);

    });

}

/* ==========================================================
    PROFILE
========================================================== */

function updateCitizenPanel() {

    if (!citizenProfile) return;

    citizenProfile.textContent =
        getCitizenProfile(
            selectedCitizen
        );

}

/* ==========================================================
    STORY FEED
========================================================== */

function updateStoryFeed() {

    if (!storyFeed) return;

    storyFeed.innerHTML = "";

    World.history.forEach(event => {

        const div =
            document.createElement("div");

        div.className =
            "storyEntry";

        div.innerHTML = `
            <strong>
            Year ${event.year}
            Day ${event.day}
            </strong><br>
            ${event.message}
        `;

        storyFeed.appendChild(div);

    });

}

/* ==========================================================
    SEARCH
========================================================== */

function setupSearch() {

    if (!citizenSearch) return;

    citizenSearch.addEventListener(

        "input",

        updateCitizenList

    );

}

/* ==========================================================
    GOD PROMPT
========================================================== */

function setupPromptButton() {

    if (!applyPromptBtn) return;

    applyPromptBtn.addEventListener(

        "click",

        () => {

            const prompt =
                worldPrompt.value.trim();

            if (!prompt) return;

            if (
                typeof applyWorldPrompt ===
                "function"
            ) {

                applyWorldPrompt(prompt);

            }
            else {

                addWorldStory(
                    "God: " + prompt
                );

            }

            worldPrompt.value = "";

            updateStoryFeed();

        }

    );

}
