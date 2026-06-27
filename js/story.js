/* ==========================================================
   Hokage Infinity Engine
   story.js
   Engine Alpha 1.2
========================================================== */

"use strict";

/* ==========================================================
    STORY ENGINE
========================================================== */

const StoryEngine = {

    history: [],

    maxHistory: 10000,

    categories: {

        WORLD: "World",

        CITIZEN: "Citizen",

        RELATIONSHIP: "Relationship",

        BUILDING: "Building",

        RESOURCE: "Resource",

        EVENT: "Event",

        GOD: "God"

    }

};

/* ==========================================================
    CREATE STORY ENTRY
========================================================== */

function addStory(category, message, data = {}) {

    const entry = {

        id: crypto.randomUUID(),

        year: World.time.year,

        season: World.time.season,

        day: World.time.day,

        hour: World.time.hour,

        minute: World.time.minute,

        category,

        message,

        data,

        timestamp: Date.now()

    };

    StoryEngine.history.unshift(entry);

    if (
        StoryEngine.history.length >
        StoryEngine.maxHistory
    ) {

        StoryEngine.history.pop();

    }

    updateStoryFeed();

}

/* ==========================================================
    GET HISTORY
========================================================== */

function getHistory() {

    return StoryEngine.history;

}

/* ==========================================================
    GET BY CATEGORY
========================================================== */

function getHistoryCategory(category) {

    return StoryEngine.history.filter(

        entry =>

        entry.category === category

    );

}

/* ==========================================================
    GET CITIZEN HISTORY
========================================================== */

function getCitizenHistory(citizenID) {

    return StoryEngine.history.filter(

        entry =>

        entry.data.citizenID ===

        citizenID

    );

}

/* ==========================================================
    GET LAST EVENT
========================================================== */

function getLatestStory() {

    if (

        StoryEngine.history.length === 0

    )

        return null;

    return StoryEngine.history[0];

}

/* ==========================================================
    CLEAR HISTORY
========================================================== */

function clearHistory() {

    StoryEngine.history = [];

    updateStoryFeed();

}
/* ==========================================================
    SEARCH
========================================================== */

function searchHistory(query) {

    query = query.toLowerCase();

    return StoryEngine.history.filter(entry =>

        entry.message
            .toLowerCase()
            .includes(query)

    );

}

/* ==========================================================
    TIMELINE
========================================================== */

function getTimeline() {

    const timeline = {};

    StoryEngine.history.forEach(entry => {

        const key =
            `Year ${entry.year}`;

        if (!timeline[key]) {

            timeline[key] = [];

        }

        timeline[key].push(entry);

    });

    return timeline;

}

/* ==========================================================
    EXPORT
========================================================== */

function exportHistory() {

    return JSON.stringify(

        StoryEngine.history,

        null,

        2

    );

}

/* ==========================================================
    IMPORT
========================================================== */

function importHistory(json) {

    try {

        StoryEngine.history =
            JSON.parse(json);

        updateStoryFeed();

    }

    catch (err) {

        console.error(err);

    }

}

/* ==========================================================
    STORY FEED
========================================================== */

function updateStoryFeed() {

    const container =
        document.getElementById(
            "storyFeed"
        );

    if (!container) return;

    container.innerHTML = "";

    StoryEngine.history.forEach(entry => {

        const card =
            document.createElement("div");

        card.className =
            "storyCard";

        card.innerHTML = `

        <strong>
        Year ${entry.year}
        Day ${entry.day}
        ${entry.hour.toString().padStart(2,"0")}:
        ${entry.minute.toString().padStart(2,"0")}
        </strong>

        <br>

        <span class="storyCategory">

        ${entry.category}

        </span>

        <br>

        ${entry.message}

        `;

        container.appendChild(card);

    });

}

/* ==========================================================
    INITIAL STORY
========================================================== */

function initializeStory() {

    addStory(

        StoryEngine.categories.WORLD,

        "The world has been created."

    );

}

/* ==========================================================
    AUTO EVENTS
========================================================== */

function storyYearChanged() {

    addStory(

        StoryEngine.categories.WORLD,

        "Year " +

        World.time.year +

        " has begun."

    );

}

function storySeasonChanged() {

    addStory(

        StoryEngine.categories.WORLD,

        "It is now " +

        World.time.season +

        "."

    );

}

/* ==========================================================
    FUTURE MEMORY HOOKS
========================================================== */

function citizenRemember(citizenID, message) {

    addStory(

        StoryEngine.categories.CITIZEN,

        message,

        {

            citizenID

        }

    );

}

/* ==========================================================
    FUTURE ACHIEVEMENTS
========================================================== */

function citizenAchievement(

    citizenID,

    achievement

) {

    addStory(

        StoryEngine.categories.CITIZEN,

        achievement,

        {

            citizenID,

            achievement: true

        }

    );

}
