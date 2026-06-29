/* ==========================================================
   Hokage Infinity Engine
   worldRenderer.js
========================================================== */

"use strict";

const WorldRenderer = {

    tileSize: 16,

    cameraX: 0,

    cameraY: 0,

    zoom: 1

};

/* ==========================================================
   DRAW WORLD
========================================================== */

function renderTerrain(ctx){

    const size = WorldRenderer.tileSize * WorldRenderer.zoom;

    for(let y=0; y<TerrainEngine.height; y++){

        for(let x=0; x<TerrainEngine.width; x++){

            const tile = getTile(x,y);

            if(!tile) continue;

            switch(tile.type){

                case TileTypes.GRASS:
                    ctx.fillStyle="#4CAF50";
                    break;

                case TileTypes.FOREST:
                    ctx.fillStyle="#2E7D32";
                    break;

                case TileTypes.WATER:
                    ctx.fillStyle="#2196F3";
                    break;

                case TileTypes.MOUNTAIN:
                    ctx.fillStyle="#757575";
                    break;

                case TileTypes.STONE:
                    ctx.fillStyle="#9E9E9E";
                    break;

                case TileTypes.GOLD:
                    ctx.fillStyle="#FFD700";
                    break;

                case TileTypes.SAND:
                    ctx.fillStyle="#EBCB8B";
                    break;

                default:
                    ctx.fillStyle="#000000";

            }

            ctx.fillRect(

                (x-WorldRenderer.cameraX)*size,

                (y-WorldRenderer.cameraY)*size,

                size,

                size

            );

        }

    }

}
