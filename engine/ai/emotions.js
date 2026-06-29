/* ==========================================================
   Hokage Infinity Engine
   emotions.js
   Engine Alpha 1.2
========================================================== */

"use strict";

/* ==========================================================
    EMOTION ENGINE
========================================================== */

const EmotionEngine = {

    emotions: [

        "joy",

        "sadness",

        "anger",

        "fear",

        "stress",

        "curiosity",

        "confidence",

        "loneliness",

        "affection",

        "fatigue"

    ]

};

/* ==========================================================
    INITIALIZE
========================================================== */

function initializeEmotions() {

    citizens.forEach(citizen => {

        citizen.emotions = {

            joy: randomEmotion(),

            sadness: randomEmotion(),

            anger: randomEmotion(),

            fear: randomEmotion(),

            stress: randomEmotion(),

            curiosity: randomEmotion(),

            confidence: randomEmotion(),

            loneliness: randomEmotion(),

            affection: randomEmotion(),

            fatigue: randomEmotion()

        };

    });

}

/* ==========================================================
    RANDOM
========================================================== */

function randomEmotion() {

    return Math.floor(

        Math.random() * 41

    ) + 30;

}

/* ==========================================================
    CHANGE
========================================================== */

function changeEmotion(

    citizen,

    emotion,

    amount

) {

    if (

        citizen.emotions[emotion] ===

        undefined

    )

        return;

    citizen.emotions[emotion] += amount;

    citizen.emotions[emotion] =

        Math.max(

            0,

            Math.min(

                100,

                citizen.emotions[emotion]

            )

        );

}

/* ==========================================================
    GET
========================================================== */

function getEmotion(

    citizen,

    emotion

) {

    return citizen.emotions[emotion];

}

/* ==========================================================
    DOMINANT
========================================================== */

function dominantEmotion(citizen) {

    let highest = "";

    let value = -1;

    EmotionEngine.emotions.forEach(

        emotion => {

            if (

                citizen.emotions[emotion] >

                value

            ) {

                value =

                    citizen.emotions[emotion];

                highest = emotion;

            }

        }

    );

    return highest;

}

/* ==========================================================
    EMOTION DECAY
========================================================== */

function updateEmotions() {

    citizens.forEach(citizen => {

        EmotionEngine.emotions.forEach(

            emotion => {

                const current =

                    citizen.emotions[emotion];

                const target = 50;

                if (current > target)

                    citizen.emotions[emotion]--;

                if (current < target)

                    citizen.emotions[emotion]++;

            }

        );

    });

}

/* ==========================================================
    NEEDS
========================================================== */

function updateNeedEmotions() {

    citizens.forEach(citizen => {

        if (

            citizen.needs.food < 30

        ) {

            changeEmotion(

                citizen,

                "stress",

                2

            );

            changeEmotion(

                citizen,

                "joy",

                -2

            );

        }

        if (

            citizen.needs.energy < 20

        ) {

            changeEmotion(

                citizen,

                "fatigue",

                3

            );

        }

    });

}

/* ==========================================================
    RELATIONSHIPS
========================================================== */

function updateRelationshipEmotions() {

    citizens.forEach(citizen => {

        const friends =

            getFriends(

                citizen.identity.id

            );

        if (

            friends.length === 0

        ) {

            changeEmotion(

                citizen,

                "loneliness",

                1

            );

        }

        else {

            changeEmotion(

                citizen,

                "joy",

                1

            );

        }

    });

}

/* ==========================================================
    OVERALL MOOD
========================================================== */

function overallMood(citizen) {

    const happy =

        citizen.emotions.joy +

        citizen.emotions.confidence +

        citizen.emotions.affection;

    const negative =

        citizen.emotions.anger +

        citizen.emotions.stress +

        citizen.emotions.sadness +

        citizen.emotions.fear;

    if (

        happy >

        negative + 50

    )

        return "Happy";

    if (

        negative >

        happy + 50

    )

        return "Unhappy";

    return "Neutral";

}

/* ==========================================================
    TICK
========================================================== */

function emotionTick() {

    updateEmotions();

    updateNeedEmotions();

    updateRelationshipEmotions();

}
