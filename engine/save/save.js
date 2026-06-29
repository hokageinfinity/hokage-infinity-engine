/* ==========================================================
   Hokage Infinity Engine
   save.js
   Engine Alpha 1.2
========================================================== */

"use strict";

/* ==========================================================
    SAVE ENGINE
========================================================== */

const SaveEngine = {

    version: "1.2",

    saveName: "hokage_infinity_world"

};

/* ==========================================================
    BUILD SAVE DATA
========================================================== */

function buildSaveData() {

    return {

        version: SaveEngine.version,

        timestamp: Date.now(),

        world: World,

        citizens: citizens,

        buildings: BuildingEngine.buildings,

        resources: ResourceEngine.resources,

        resourceNodes: ResourceEngine.nodes,

        relationships: serializeRelationships(),

        history: StoryEngine.history,

        publicConversations:
            ConversationEngine.publicConversations,

        privateConversations:
            ConversationEngine.privateConversations,

        thoughts:
            ConversationEngine.thoughts,

        events:
            EventEngine.activeEvents,

        completedEvents:
            EventEngine.completedEvents,

        promptHistory:
            PromptEngine.history

    };

}

/* ==========================================================
    SAVE WORLD
========================================================== */

function saveWorld() {

    const save = buildSaveData();

    localStorage.setItem(

        SaveEngine.saveName,

        JSON.stringify(save)

    );

    console.log("World Saved");

}

/* ==========================================================
    LOAD WORLD
========================================================== */

function loadWorld() {

    const data = localStorage.getItem(

        SaveEngine.saveName

    );

    if (!data) {

        console.log("No Save Found");

        return false;

    }

    const save = JSON.parse(data);

    World = save.world;

    citizens = save.citizens;

    BuildingEngine.buildings =
        save.buildings;

    ResourceEngine.resources =
        save.resources;

    ResourceEngine.nodes =
        save.resourceNodes;

    StoryEngine.history =
        save.history;

    ConversationEngine.publicConversations =
        save.publicConversations;

    ConversationEngine.privateConversations =
        save.privateConversations;

    ConversationEngine.thoughts =
        save.thoughts;

    EventEngine.activeEvents =
        save.events;

    EventEngine.completedEvents =
        save.completedEvents;

    PromptEngine.history =
        save.promptHistory;

    deserializeRelationships(

        save.relationships

    );

    console.log("World Loaded");

    return true;

}

/* ==========================================================
    RESET
========================================================== */

function resetWorld() {

    localStorage.removeItem(

        SaveEngine.saveName

    );

    location.reload();

}

/* ==========================================================
    EXPORT
========================================================== */

function exportSave() {

    return JSON.stringify(

        buildSaveData(),

        null,

        2

    );

}

/* ==========================================================
    IMPORT
========================================================== */

function importSave(json) {

    try {

        localStorage.setItem(

            SaveEngine.saveName,

            json

        );

        loadWorld();

    }

    catch (error) {

        console.error(error);

    }

}

/* ==========================================================
    SERIALIZE RELATIONSHIPS
========================================================== */

function serializeRelationships() {

    const output = {};

    RelationshipEngine.relationships.forEach(

        (value, key) => {

            output[key] =
                Array.from(

                    value.entries()

                );

        }

    );

    return output;

}

/* ==========================================================
    DESERIALIZE RELATIONSHIPS
========================================================== */

function deserializeRelationships(data) {

    RelationshipEngine.relationships =

        new Map();

    Object.keys(data).forEach(key => {

        RelationshipEngine.relationships.set(

            key,

            new Map(data[key])

        );

    });

}

/* ==========================================================
    AUTOSAVE
========================================================== */

function startAutosave() {

    setInterval(

        saveWorld,

        60000

    );

}

/* ==========================================================
    INITIALIZE
========================================================== */

function initializeSaveSystem() {

    startAutosave();

}
