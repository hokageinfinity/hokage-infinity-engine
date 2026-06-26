/* ==========================================================
   Hokage Infinity Engine
   citizens.js
   Engine Alpha 1
========================================================== */

const citizens = [];

/* ==========================================================
    ID GENERATOR
========================================================== */

let citizenCounter = 1;

function generateCitizenID() {

    const id = String(citizenCounter).padStart(6, "0");

    citizenCounter++;

    return "citizen-" + id;

}

/* ==========================================================
    RANDOM HELPERS
========================================================== */

function randomNumber(min, max) {

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;

}

function randomChoice(array) {

    return array[
        randomNumber(0, array.length - 1)
    ];

}

/* ==========================================================
    NAME HELPERS
========================================================== */

const firstNames = [

    "Kai",
    "Aiko",
    "Ren",
    "Mina",
    "Akira",
    "Hana",
    "Leo",
    "Sora",
    "Noah",
    "Luna",
    "Atlas",
    "Nova",
    "Riku",
    "Yuki",
    "Asher",
    "Emma"

];

const lastNames = [

    "Tanaka",
    "Ravens",
    "Walker",
    "Stone",
    "Black",
    "River",
    "Ash",
    "Storm",
    "Frost",
    "Vale",
    "Hollow",
    "Knight"

];

/* ==========================================================
    TRAITS
========================================================== */

const personalityTraits = [

    "Brave",
    "Curious",
    "Kind",
    "Greedy",
    "Patient",
    "Creative",
    "Loyal",
    "Stubborn",
    "Calm",
    "Optimistic",
    "Pessimistic",
    "Honest",
    "Quiet",
    "Leader"

];

/* ==========================================================
    JOBS
========================================================== */

const jobs = [

    "Farmer",

    "Builder",

    "Miner",

    "Hunter",

    "Gatherer",

    "Blacksmith",

    "Merchant",

    "Scientist"

];

/* ==========================================================
    CREATE CITIZEN
========================================================== */

function createCitizen() {

    const citizen = {

        /* ==========================
            IDENTITY
        ========================== */

        identity: {

            id: generateCitizenID(),

            firstName: randomChoice(firstNames),

            lastName: randomChoice(lastNames),

            gender:

                Math.random() > 0.5

                ? "Male"

                : "Female",

            age: randomNumber(18,45)

        },

        /* ==========================
            POSITION
        ========================== */

        position: {

            x: randomNumber(

                0,

                World.settings.width-1

            ),

            y: randomNumber(

                0,

                World.settings.height-1

            )

        },

        /* ==========================
            MIND
        ========================== */

        mind: {

            currentThought:

            "Exploring the world.",

            goals: [],

            memories: [],

            dreams: [],

            beliefs: []

        },

        /* ==========================
            PERSONALITY
        ========================== */

        personality: {

            traitOne:

            randomChoice(personalityTraits),

            traitTwo:

            randomChoice(personalityTraits),

            curiosity:

            randomNumber(1,100),

            bravery:

            randomNumber(1,100),

            kindness:

            randomNumber(1,100),

            ambition:

            randomNumber(1,100)

        },

        /* ==========================
            EMOTIONS
        ========================== */

        emotions: {

            happiness: 75,

            stress: 5,

            fear: 0,

            anger: 0,

            loneliness: 10

        },

        /* ==========================
            JOB
        ========================== */

        job: {

            title:

            randomChoice(jobs),

            skill:

            randomNumber(1,20)

        },

        /* ==========================
            INVENTORY
        ========================== */

        inventory: {

            food:0,

            wood:0,

            stone:0,

            gold:0

        },

        /* ==========================
            RELATIONSHIPS
        ========================== */

        relationships: {

            friends:[],

            family:[],

            rivals:[],

            spouse:null

        },

        /* ==========================
            LIFE
        ========================== */

        life:{

            alive:true,

            birthday:

            randomNumber(1,90),

            accomplishments:[]

        }

    };

    citizens.push(citizen);

    World.population.total++;

    return citizen;

}

/* ==========================================================
    SPAWN STARTING POPULATION
========================================================== */

function createStartingPopulation(amount){

    for(

        let i=0;

        i<amount;

        i++

    ){

        createCitizen();

    }

    addWorldStory(

        amount +

        " settlers founded the first civilization."

    );
  

}
/* ==========================================================
    FIND CITIZEN
========================================================== */

function getCitizenByID(id) {

    return citizens.find(c => c.identity.id === id);

}

/* ==========================================================
    SELECTED CITIZEN
========================================================== */

let selectedCitizen = null;

function selectCitizen(id) {

    selectedCitizen = getCitizenByID(id);

    if (typeof updateCitizenProfile === "function") {

        updateCitizenProfile();

    }

}

/* ==========================================================
    MOVEMENT
========================================================== */

function moveCitizen(citizen) {

    const dx = randomNumber(-1, 1);
    const dy = randomNumber(-1, 1);

    citizen.position.x += dx;
    citizen.position.y += dy;

    citizen.position.x = Math.max(
        0,
        Math.min(
            citizen.position.x,
            World.settings.width - 1
        )
    );

    citizen.position.y = Math.max(
        0,
        Math.min(
            citizen.position.y,
            World.settings.height - 1
        )
    );

}

/* ==========================================================
    THINKING
========================================================== */

function updateCitizenThought(citizen) {

    const thoughts = [

        "Looking for food.",

        "Exploring.",

        "Thinking about the future.",

        "Working hard today.",

        "Watching nature.",

        "Gathering resources.",

        "Building something useful.",

        "Wondering what tomorrow brings."

    ];

    citizen.mind.currentThought =
        randomChoice(thoughts);

}

/* ==========================================================
    EMOTIONS
========================================================== */

function updateCitizenEmotion(citizen) {

    citizen.emotions.happiness += randomNumber(-2, 2);
    citizen.emotions.stress += randomNumber(-1, 2);

    citizen.emotions.happiness = Math.max(
        0,
        Math.min(
            100,
            citizen.emotions.happiness
        )
    );

    citizen.emotions.stress = Math.max(
        0,
        Math.min(
            100,
            citizen.emotions.stress
        )
    );

}

/* ==========================================================
    GOALS
========================================================== */

function updateCitizenGoals(citizen) {

    if (citizen.mind.goals.length > 0)
        return;

    const goals = [

        "Collect food",

        "Build a house",

        "Explore",

        "Make a friend",

        "Gather wood",

        "Mine stone",

        "Learn a new skill"

    ];

    citizen.mind.goals.push(
        randomChoice(goals)
    );

}

/* ==========================================================
    MEMORIES
========================================================== */

function addCitizenMemory(citizen, memory) {

    citizen.mind.memories.unshift({

        year: World.time.year,

        day: World.time.day,

        text: memory

    });

    if (citizen.mind.memories.length > 100) {

        citizen.mind.memories.pop();

    }

}

/* ==========================================================
    UPDATE ONE CITIZEN
========================================================== */

function updateCitizen(citizen) {

    moveCitizen(citizen);

    updateCitizenThought(citizen);

    updateCitizenEmotion(citizen);

    updateCitizenGoals(citizen);

}

/* ==========================================================
    UPDATE ALL
========================================================== */

function updateCitizens() {

    citizens.forEach(citizen => {

        updateCitizen(citizen);

    });

}

/* ==========================================================
    PROFILE TEXT
========================================================== */

function getCitizenProfile(citizen) {

    if (!citizen)
        return "Select a citizen.";

    return `

${citizen.identity.firstName} ${citizen.identity.lastName}

ID:
${citizen.identity.id}

Age:
${citizen.identity.age}

Gender:
${citizen.identity.gender}

Job:
${citizen.job.title}

Skill:
${citizen.job.skill}

Trait 1:
${citizen.personality.traitOne}

Trait 2:
${citizen.personality.traitTwo}

Thought:

${citizen.mind.currentThought}

Current Goal:

${citizen.mind.goals[0] || "None"}

Emotion

😊 Happiness:
${citizen.emotions.happiness}

😟 Stress:
${citizen.emotions.stress}

Friends:
${citizen.relationships.friends.length}

Family:
${citizen.relationships.family.length}

Memories:
${citizen.mind.memories.length}

`;

}

/* ==========================================================
    STARTING WORLD
========================================================== */

function initializeCitizens() {

    createStartingPopulation(100);

    console.log(
        "Created",
        citizens.length,
        "citizens."
    );

}
