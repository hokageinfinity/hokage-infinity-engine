/* ==========================================================
   Hokage Infinity Engine
   terrainRenderer.js
   Version 4.0
========================================================== */

"use strict";

function renderTerrain(ctx){

    if(typeof TerrainEngine === "undefined")
        return;

    const tileSize = WorldRenderer.tileSize * Camera.zoom;

    for(let y = 0; y < TerrainEngine.height; y++){

        for(let x = 0; x < TerrainEngine.width; x++){

            const tile = getTile(x,y);

            if(!tile)
                continue;

            const screenX =
                (x * WorldRenderer.tileSize - Camera.x) *
                Camera.zoom;

            const screenY =
                (y * WorldRenderer.tileSize - Camera.y) *
                Camera.zoom;

            switch(tile.type){

                case TileTypes.GRASS:
                    ctx.fillStyle="#6DBF4B";
                    break;

                case TileTypes.FOREST:
                    ctx.fillStyle="#2E8B57";
                    break;

                case TileTypes.WATER:
                    ctx.fillStyle="#3B82F6";
                    break;

                case TileTypes.MOUNTAIN:
                    ctx.fillStyle="#8A8A8A";
                    break;

                case TileTypes.STONE:
                    ctx.fillStyle="#707070";
                    break;

                case TileTypes.GOLD:
                    ctx.fillStyle="#FFD54A";
                    break;

                case TileTypes.SAND:
                    ctx.fillStyle="#E9D28C";
                    break;

                default:
                    ctx.fillStyle="#444444";

            }

            ctx.fillRect(

                screenX,

                screenY,

                tileSize,

                tileSize

            );

        }

    }

}
