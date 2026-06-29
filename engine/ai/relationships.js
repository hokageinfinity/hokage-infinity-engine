/* ==========================================================
   Hokage Infinity Engine
   relationships.js
   Engine Alpha 1.2
========================================================== */

"use strict";

/* ==========================================================
    RELATIONSHIP ENGINE
========================================================== */

const RelationshipEngine = {

    relationships: new Map()

};

/* ==========================================================
    INITIALIZE
========================================================== */

function initializeRelationships() {

    citizens.forEach(citizen => {

        RelationshipEngine.relationships.set(

            citizen.identity.id,

            new Map()

        );

    });

}

/* ==========================================================
    CREATE RELATIONSHIP
========================================================== */

function createRelationship(id1, id2) {

    if (id1 === id2) return;

    const person1 =
        RelationshipEngine.relationships.get(id1);

    if (!person1.has(id2)) {

        person1.set(id2, {

            friendship: 0,

            trust: 50,

            respect: 50,

            romance: 0,

            rivalry: 0,

            family: false,

            spouse: false,

            parent: false,

            child: false,

            sibling: false,

            memories: []

        });

    }

}

/* ==========================================================
    GET
========================================================== */

function getRelationship(id1, id2) {

    const person =

        RelationshipEngine.relationships.get(id1);

    if (!person) return null;

    return person.get(id2);

}

/* ==========================================================
    CHANGE FRIENDSHIP
========================================================== */

function changeFriendship(id1, id2, amount) {

    const rel =

        getRelationship(id1,id2);

    if (!rel) return;

    rel.friendship += amount;

    rel.friendship =

        Math.max(

            -100,

            Math.min(

                100,

                rel.friendship

            )

        );

}

/* ==========================================================
    CHANGE TRUST
========================================================== */

function changeTrust(id1,id2,amount){

    const rel =

        getRelationship(id1,id2);

    if(!rel) return;

    rel.trust += amount;

    rel.trust =

        Math.max(

            0,

            Math.min(

                100,

                rel.trust

            )

        );

}

/* ==========================================================
    CHANGE ROMANCE
========================================================== */

function changeRomance(id1,id2,amount){

    const rel=

        getRelationship(id1,id2);

    if(!rel)return;

    rel.romance+=amount;

    rel.romance=

        Math.max(

            0,

            Math.min(

                100,

                rel.romance

            )

        );

}

/* ==========================================================
    CHANGE RIVALRY
========================================================== */

function changeRivalry(id1,id2,amount){

    const rel=

        getRelationship(id1,id2);

    if(!rel)return;

    rel.rivalry+=amount;

    rel.rivalry=

        Math.max(

            0,

            Math.min(

                100,

                rel.rivalry

            )

        );

}

/* ==========================================================
    MEMORY
========================================================== */

function addRelationshipMemory(

    id1,

    id2,

    text

){

    const rel=

        getRelationship(id1,id2);

    if(!rel)return;

    rel.memories.unshift({

        year:World.time.year,

        day:World.time.day,

        text

    });

    if(rel.memories.length>50)

        rel.memories.pop();

}

/* ==========================================================
    GET FRIENDS
========================================================== */

function getFriends(id){

    const list=[];

    const person=

        RelationshipEngine.relationships.get(id);

    if(!person)return list;

    person.forEach((rel,key)=>{

        if(rel.friendship>=60)

            list.push(key);

    });

    return list;

}

/* ==========================================================
    GET ENEMIES
========================================================== */

function getEnemies(id){

    const list=[];

    const person=

        RelationshipEngine.relationships.get(id);

    if(!person)return list;

    person.forEach((rel,key)=>{

        if(rel.friendship<=-60)

            list.push(key);

    });

    return list;

}

/* ==========================================================
    WORLD STARTUP
========================================================== */

function buildInitialRelationships(){

    citizens.forEach(a=>{

        citizens.forEach(b=>{

            if(a.identity.id!==b.identity.id){

                createRelationship(

                    a.identity.id,

                    b.identity.id

                );

            }

        });

    });

}
