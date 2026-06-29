/* ==========================================================
   Hokage Infinity Engine
   movement.js
========================================================== */

"use strict";

const MovementEngine = {

    walkingSpeed: 0.06,

    runningSpeed: 0.12

};

/* ==========================================================
   UPDATE
========================================================== */

function updateMovement(citizen){

    if(!citizen.destination)
        return;

    moveTowardDestination(citizen);

}

/* ==========================================================
   SET DESTINATION
========================================================== */

function setDestination(citizen,x,y){

    citizen.destination={

        x,

        y

    };

}

/* ==========================================================
   MOVE
========================================================== */

function moveTowardDestination(citizen){

    const dx=

        citizen.destination.x-

        citizen.position.x;

    const dy=

        citizen.destination.y-

        citizen.position.y;

    const distance=

        Math.sqrt(dx*dx+dy*dy);

    if(distance<0.05){

        citizen.position.x=

            citizen.destination.x;

        citizen.position.y=

            citizen.destination.y;

        citizen.destination=null;

        citizen.state="Idle";

        return;

    }

    citizen.state="Walking";

    citizen.position.x+=

        (dx/distance)*

        MovementEngine.walkingSpeed;

    citizen.position.y+=

        (dy/distance)*

        MovementEngine.walkingSpeed;

}
