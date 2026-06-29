/* ==========================================================
   Hokage Infinity Engine
   conversations.js
   Engine Alpha 1.2
========================================================== */

"use strict";

/* ==========================================================
    CONVERSATION ENGINE
========================================================== */

const ConversationEngine = {

    publicConversations: [],

    privateConversations: [],

    thoughts: [],

    maxConversations: 5000,

    maxThoughts: 10000

};

/* ==========================================================
    PUBLIC CONVERSATION
========================================================== */

function addPublicConversation(

    speaker,

    message

){

    const conversation={

        id:crypto.randomUUID(),

        speaker,

        message,

        year:World.time.year,

        day:World.time.day,

        hour:World.time.hour,

        minute:World.time.minute

    };

    ConversationEngine.publicConversations.unshift(

        conversation

    );

    if(

        ConversationEngine.publicConversations.length>

        ConversationEngine.maxConversations

    ){

        ConversationEngine.publicConversations.pop();

    }

}

/* ==========================================================
    PRIVATE CONVERSATION
========================================================== */

function addPrivateConversation(

    speaker,

    listener,

    message

){

    const conversation={

        id:crypto.randomUUID(),

        speaker,

        listener,

        message,

        year:World.time.year,

        day:World.time.day,

        hour:World.time.hour,

        minute:World.time.minute

    };

    ConversationEngine.privateConversations.unshift(

        conversation

    );

    if(

        ConversationEngine.privateConversations.length>

        ConversationEngine.maxConversations

    ){

        ConversationEngine.privateConversations.pop();

    }

}

/* ==========================================================
    INTERNAL THOUGHT
========================================================== */

function addThought(

    citizen,

    thought

){

    const entry={

        id:crypto.randomUUID(),

        citizen,

        thought,

        year:World.time.year,

        day:World.time.day,

        hour:World.time.hour,

        minute:World.time.minute

    };

    ConversationEngine.thoughts.unshift(entry);

    if(

        ConversationEngine.thoughts.length>

        ConversationEngine.maxThoughts

    ){

        ConversationEngine.thoughts.pop();

    }

}

/* ==========================================================
    GET PUBLIC
========================================================== */

function getPublicConversations(){

    return ConversationEngine.publicConversations;

}

/* ==========================================================
    GET PRIVATE
========================================================== */

function getPrivateConversations(id){

    return ConversationEngine.privateConversations.filter(

        c=>

        c.speaker===id||

        c.listener===id

    );

}

/* ==========================================================
    GET THOUGHTS
========================================================== */

function getCitizenThoughts(id){

    return ConversationEngine.thoughts.filter(

        t=>t.citizen===id

    );

}

/* ==========================================================
    AUTO THOUGHTS
========================================================== */

function generateThought(citizen){

    const mood=overallMood(citizen);

    if(mood==="Happy"){

        addThought(

            citizen.identity.id,

            "Today feels like a good day."

        );

    }

    else if(mood==="Unhappy"){

        addThought(

            citizen.identity.id,

            "Something feels wrong."

        );

    }

    else{

        addThought(

            citizen.identity.id,

            "I wonder what tomorrow will bring."

        );

    }

}

/* ==========================================================
    RANDOM CHAT
========================================================== */

function generateConversation(a,b){

    const mood=

        overallMood(a);

    let text="Hello.";

    if(mood==="Happy")

        text="It's a beautiful day.";

    if(mood==="Unhappy")

        text="Things have been difficult lately.";

    addPublicConversation(

        a.identity.id,

        text

    );

}

/* ==========================================================
    UPDATE
========================================================== */

function conversationTick(){

    citizens.forEach(citizen=>{

        if(Math.random()<0.005){

            generateThought(citizen);

        }

    });

}
