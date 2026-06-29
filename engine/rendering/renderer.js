/* ==========================================================
   Hokage Infinity World
   renderer.js
   Integrated Engine Version 1.0
========================================================== */

"use strict";

/* ==========================================================
    RENDER ENGINE
========================================================== */

const Renderer={

    canvas:null,

    ctx:null,

    tileSize:20,

    width:100,

    height:100,

    cameraX:0,

    cameraY:0,

    initialized:false

};

/* ==========================================================
    INITIALIZE
========================================================== */

function initializeRenderer(){

    Renderer.canvas=document.getElementById("worldCanvas");

    if(!Renderer.canvas){

        Renderer.canvas=document.createElement("canvas");

        Renderer.canvas.id="worldCanvas";

        Renderer.canvas.width=800;

        Renderer.canvas.height=600;

        Renderer.canvas.style.width="100%";

        Renderer.canvas.style.border="2px solid #2f7cff";

        Renderer.canvas.style.background="#13202b";

        const worldTab=document.getElementById("worldTab");

        if(worldTab){

            worldTab.appendChild(Renderer.canvas);

        }

    }

    Renderer.ctx=

        Renderer.canvas.getContext("2d");

    Renderer.initialized=true;

}

/* ==========================================================
    UPDATE
========================================================== */

function updateRenderer(){

    if(!Renderer.initialized)

        return;

    drawWorld();

}

/* ==========================================================
    DRAW
========================================================== */

function drawWorld(){

    const ctx = Renderer.ctx;

    ctx.clearRect(

        0,

        0,

        Renderer.canvas.width,

        Renderer.canvas.height

    );

    /* ---------- Sky ---------- */

    if(typeof drawSky === "function"){

        drawSky();

    }

    /* ---------- Terrain ---------- */

    drawGrid();

    /* ---------- Forest ---------- */

    if(typeof renderTrees === "function"){

        renderTrees(ctx);

    }

    /* ---------- Resources ---------- */

    if(typeof drawResources === "function"){

        drawResources();

    }

    /* ---------- Buildings ---------- */

    drawBuildings();

    /* ---------- Citizens ---------- */

    drawCitizens();

    /* ---------- Effects ---------- */

    if(typeof drawEffects === "function"){

        drawEffects();

    }

    /* ---------- Weather ---------- */

    if(typeof drawWeather === "function"){

        drawWeather();

    }

    /* ---------- UI Overlay ---------- */

    if(typeof drawOverlay === "function"){

        drawOverlay();

    }

}
/* ==========================================================
    GRID
========================================================== */

function drawGrid(){

    const ctx=Renderer.ctx;

    const size=Renderer.tileSize;

    for(let x=0;x<Renderer.canvas.width;x+=size){

        ctx.beginPath();

        ctx.moveTo(x,0);

        ctx.lineTo(

            x,

            Renderer.canvas.height

        );

        ctx.strokeStyle="#203040";

        ctx.stroke();

    }

    for(let y=0;y<Renderer.canvas.height;y+=size){

        ctx.beginPath();

        ctx.moveTo(0,y);

        ctx.lineTo(

            Renderer.canvas.width,

            y

        );

        ctx.strokeStyle="#203040";

        ctx.stroke();

    }

}

/* ==========================================================
    BUILDINGS
========================================================== */

function drawBuildings(){

    const ctx=Renderer.ctx;

    BuildingEngine.buildings.forEach(

        building=>{

            ctx.fillStyle="#a67c52";

            ctx.fillRect(

                building.x*

                Renderer.tileSize,

                building.y*

                Renderer.tileSize,

                Renderer.tileSize,

                Renderer.tileSize

            );

        }

    );

}

/* ==========================================================
    CITIZENS
========================================================== */

function drawCitizens(){

    const ctx=Renderer.ctx;

    citizens.forEach(citizen=>{

        ctx.beginPath();

        ctx.arc(

            citizen.position.x*

            Renderer.tileSize+

            Renderer.tileSize/2,

            citizen.position.y*

            Renderer.tileSize+

            Renderer.tileSize/2,

            Renderer.tileSize/3,

            0,

            Math.PI*2

        );

        ctx.fillStyle="#4caf50";

        ctx.fill();

    });

}

/* ==========================================================
    CAMERA
========================================================== */

function centerCamera(x,y){

    Renderer.cameraX=x;

    Renderer.cameraY=y;

}

/* ==========================================================
    RESIZE
========================================================== */

window.addEventListener(

    "resize",

    ()=>{

        if(!Renderer.canvas)

            return;

        Renderer.canvas.width=

            Renderer.canvas.clientWidth;

    }

);
