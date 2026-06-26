/* ==========================================================
   Hokage Infinity Engine
   renderer.js
   Engine Alpha 1
========================================================== */

const canvas = document.getElementById("worldCanvas");
const ctx = canvas.getContext("2d");

/* ==========================================================
    CAMERA
========================================================== */

const Camera = {

    x: 0,

    y: 0,

    zoom: 1,

    followCitizen: null

};

/* ==========================================================
    DRAW WORLD
========================================================== */

function renderWorld() {

    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawTerrain();

    drawResources();

    drawCitizens();

}

/* ==========================================================
    TERRAIN
========================================================== */

function drawTerrain(){

    const tile = World.settings.tileSize;

    for(let y=0;y<World.settings.height;y++){

        for(let x=0;x<World.settings.width;x++){

            const worldTile = World.map[y][x];

            let color="#4caf50";

            switch(worldTile.terrain){

                case "grass":

                    color="#4caf50";

                    break;

                case "water":

                    color="#2196f3";

                    break;

                case "sand":

                    color="#f7d26a";

                    break;

            }

            ctx.fillStyle=color;

            ctx.fillRect(

                x*tile,

                y*tile,

                tile,

                tile

            );

        }

    }

}

/* ==========================================================
    RESOURCES
========================================================== */

function drawResources(){

    const tile=World.settings.tileSize;

    for(let y=0;y<World.settings.height;y++){

        for(let x=0;x<World.settings.width;x++){

            const worldTile=World.map[y][x];

            if(!worldTile.resource) continue;

            switch(worldTile.resource){

                case "tree":

                    ctx.fillStyle="#0b6e18";

                    break;

                case "stone":

                    ctx.fillStyle="#888";

                    break;

                case "berries":

                    ctx.fillStyle="#ff3366";

                    break;

            }

            ctx.beginPath();

            ctx.arc(

                x*tile+tile/2,

                y*tile+tile/2,

                tile/4,

                0,

                Math.PI*2

            );

            ctx.fill();

        }

    }

}

/* ==========================================================
    CITIZENS
========================================================== */

function drawCitizens(){

    if(typeof citizens==="undefined") return;

    const tile=World.settings.tileSize;

    citizens.forEach(c=>{

        ctx.fillStyle="#ffffff";

        ctx.beginPath();

        ctx.arc(

            c.position.x*tile+tile/2,

            c.position.y*tile+tile/2,

            tile/5,

            0,

            Math.PI*2

        );

        ctx.fill();

    });

}

/* ==========================================================
    ENGINE LOOP
========================================================== */

function renderLoop(){

    renderWorld();

    requestAnimationFrame(renderLoop);

}

renderLoop();
