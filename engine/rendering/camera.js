/* ==========================================================
   Hokage Infinity Engine
   camera.js
========================================================== */

"use strict";

const Camera = {

    x: 0,
    y: 0,

    zoom: 1,

    width: 1280,
    height: 720,

    followTarget: null,

    minZoom: 0.5,
    maxZoom: 4,

    speed: 16

};

/* ==========================================================
   UPDATE
========================================================== */

function updateCamera(){

    if(Camera.followTarget){

        Camera.x =
            Camera.followTarget.position.x -
            Camera.width / (2 * Camera.zoom);

        Camera.y =
            Camera.followTarget.position.y -
            Camera.height / (2 * Camera.zoom);

    }

}

/* ==========================================================
   FOLLOW
========================================================== */

function followCitizen(citizen){

    Camera.followTarget = citizen;

}

/* ==========================================================
   STOP FOLLOW
========================================================== */

function stopFollowing(){

    Camera.followTarget = null;

}

/* ==========================================================
   MOVE
========================================================== */

function moveCamera(dx,dy){

    Camera.x += dx;

    Camera.y += dy;

}

/* ==========================================================
   ZOOM
========================================================== */

function zoomIn(){

    Camera.zoom = Math.min(

        Camera.maxZoom,

        Camera.zoom + 0.1

    );

}

function zoomOut(){

    Camera.zoom = Math.max(

        Camera.minZoom,

        Camera.zoom - 0.1

    );

}
