/* ==========================================================
   Hokage Infinity Engine
   renderer.js
   Engine Alpha 1.1
========================================================== */

"use strict";

/* ==========================================================
    RENDERER
========================================================== */

const Renderer = {

    canvas: null,
    ctx: null,

    tileSize: 24,

    camera: {

        x: 0,
        y: 0,

        zoom: 1,

        width: 0,
        height: 0

    },

    colors: {

        grass: "#6dbb55",

        grid: "#5ca34d",

        citizen: "#ffffff",

        selected: "#00e5ff",

        tree: "#2e7d32",

        stone: "#888888",

        house: "#8d6e63"

    }

};

/* ==========================================================
    INITIALIZE
========================================================== */

function initializeRenderer() {

    Renderer.canvas =
        document.getElementById("worldCanvas");

    if (!Renderer.canvas) {

        console.error(
            "Canvas not found."
        );

        return;

    }

    Renderer.ctx =
        Renderer.canvas.getContext("2d");

    resizeCanvas();

    window.addEventListener(

        "resize",

        resizeCanvas

    );

    requestAnimationFrame(

        renderLoop

    );

}

/* ==========================================================
    RESIZE
========================================================== */

function resizeCanvas() {

    Renderer.canvas.width =
        Renderer.canvas.clientWidth;

    Renderer.canvas.height =
        Renderer.canvas.clientHeight;

    Renderer.camera.width =
        Renderer.canvas.width;

    Renderer.camera.height =
        Renderer.canvas.height;

}

/* ==========================================================
    LOOP
========================================================== */

function renderLoop() {

    drawFrame();

    requestAnimationFrame(

        renderLoop

    );

}

/* ==========================================================
    DRAW FRAME
========================================================== */

function drawFrame() {

    clearCanvas();

    drawTerrain();

    drawGrid();

    drawResources();

    drawBuildings();

    drawCitizens();

    drawSelection();

}

/* ==========================================================
    CLEAR
========================================================== */

function clearCanvas() {

    Renderer.ctx.fillStyle =
        Renderer.colors.grass;

    Renderer.ctx.fillRect(

        0,

        0,

        Renderer.canvas.width,

        Renderer.canvas.height

    );

}

/* ==========================================================
    TERRAIN
========================================================== */

function drawTerrain() {

    // Placeholder

}

/* ==========================================================
    GRID
========================================================== */

function drawGrid() {

    const ctx = Renderer.ctx;

    const size =
        Renderer.tileSize *
        Renderer.camera.zoom;

    ctx.strokeStyle =
        Renderer.colors.grid;

    ctx.lineWidth = 1;

    for (

        let x = 0;

        x <= Renderer.canvas.width;

        x += size

    ) {

        ctx.beginPath();

        ctx.moveTo(x,0);

        ctx.lineTo(

            x,

            Renderer.canvas.height

        );

        ctx.stroke();

    }

    for (

        let y = 0;

        y <= Renderer.canvas.height;

        y += size

    ) {

        ctx.beginPath();

        ctx.moveTo(0,y);

        ctx.lineTo(

            Renderer.canvas.width,

            y

        );

        ctx.stroke();

    }

}

/* ==========================================================
    RESOURCES
========================================================== */

function drawResources() {

    if (

        !World.resources.nodes

    )

        return;

    const ctx =
        Renderer.ctx;

    const size =
        Renderer.tileSize;

    World.resources.nodes.forEach(

        node => {

            let color =
                Renderer.colors.tree;

            if (

                node.type === "stone"

            )

                color =
                Renderer.colors.stone;

            ctx.fillStyle =
                color;

            ctx.beginPath();

            ctx.arc(

                node.x * size +

                size/2,

                node.y * size +

                size/2,

                size/4,

                0,

                Math.PI*2

            );

            ctx.fill();

        }

    );

}

/* ==========================================================
    BUILDINGS
========================================================== */

function drawBuildings() {

    if (

        !World.buildings

    )

        return;

    const ctx =
        Renderer.ctx;

    const size =
        Renderer.tileSize;

    World.buildings.forEach(

        building => {

            ctx.fillStyle =
                Renderer.colors.house;

            ctx.fillRect(

                building.x * size,

                building.y * size,

                size,

                size

            );

        }

    );

}
/* ==========================================================
    CITIZENS
========================================================== */

function drawCitizens() {

    if (!citizens) return;

    const ctx = Renderer.ctx;
    const size = Renderer.tileSize;

    citizens.forEach(citizen => {

        const x =
            citizen.position.x * size;

        const y =
            citizen.position.y * size;

        // Body
        ctx.beginPath();
        ctx.fillStyle =
            Renderer.colors.citizen;

        ctx.arc(
            x + size / 2,
            y + size / 2,
            size * 0.28,
            0,
            Math.PI * 2
        );

        ctx.fill();

        // Job indicator
        ctx.fillStyle = "#222";

        ctx.font = "10px Arial";

        ctx.fillText(
            citizen.job.title.charAt(0),
            x + 6,
            y + 10
        );

    });

}

/* ==========================================================
    SELECTED CITIZEN
========================================================== */

function drawSelection() {

    if (!selectedCitizen)
        return;

    const ctx =
        Renderer.ctx;

    const size =
        Renderer.tileSize;

    const x =
        selectedCitizen.position.x *
        size;

    const y =
        selectedCitizen.position.y *
        size;

    ctx.strokeStyle =
        Renderer.colors.selected;

    ctx.lineWidth = 3;

    ctx.strokeRect(

        x,

        y,

        size,

        size

    );

}

/* ==========================================================
    SCREEN -> WORLD
========================================================== */

function screenToWorld(x, y) {

    const size =
        Renderer.tileSize *
        Renderer.camera.zoom;

    return {

        x: Math.floor(x / size),

        y: Math.floor(y / size)

    };

}

/* ==========================================================
    CAMERA
========================================================== */

function centerCameraOnCitizen(citizen) {

    Renderer.camera.x =

        citizen.position.x *
        Renderer.tileSize -

        Renderer.camera.width / 2;

    Renderer.camera.y =

        citizen.position.y *
        Renderer.tileSize -

        Renderer.camera.height / 2;

}

/* ==========================================================
    ZOOM
========================================================== */

function zoomIn() {

    Renderer.camera.zoom += 0.10;

    Renderer.camera.zoom =

        Math.min(

            Renderer.camera.zoom,

            4

        );

}

function zoomOut() {

    Renderer.camera.zoom -= 0.10;

    Renderer.camera.zoom =

        Math.max(

            Renderer.camera.zoom,

            0.40

        );

}

/* ==========================================================
    CLICK SELECTION
========================================================== */

function setupRendererInput() {

    Renderer.canvas.addEventListener(

        "click",

        event => {

            const rect =

                Renderer.canvas.getBoundingClientRect();

            const world =

                screenToWorld(

                    event.clientX - rect.left,

                    event.clientY - rect.top

                );

            let closest = null;

            citizens.forEach(citizen => {

                if (

                    citizen.position.x === world.x &&

                    citizen.position.y === world.y

                ) {

                    closest = citizen;

                }

            });

            if (closest) {

                selectCitizen(

                    closest.identity.id

                );

            }

        }

    );

}

/* ==========================================================
    DEBUG
========================================================== */

function drawDebug() {

    const ctx =
        Renderer.ctx;

    ctx.fillStyle = "white";

    ctx.font = "14px Arial";

    ctx.fillText(

        "Citizens: " +

        citizens.length,

        10,

        20

    );

    ctx.fillText(

        "FPS Target: 30",

        10,

        40

    );

    ctx.fillText(

        "Zoom: " +

        Renderer.camera.zoom.toFixed(2),

        10,

        60

    );

}

/* ==========================================================
    UPDATE DRAW FRAME
========================================================== */

const originalDrawFrame = drawFrame;

drawFrame = function () {

    clearCanvas();

    drawTerrain();

    drawGrid();

    drawResources();

    drawBuildings();

    drawCitizens();

    drawSelection();

    drawDebug();

};

/* ==========================================================
    STARTUP
========================================================== */

window.addEventListener("load", () => {

    initializeRenderer();

    setupRendererInput();

});
