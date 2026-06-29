/* ==========================================================
   Hokage Infinity Engine
   terrain.js
   Procedural Terrain Generator
========================================================== */

"use strict";

/* ==========================================================
   TERRAIN ENGINE
========================================================== */

const TerrainEngine = {

    width: 200,

    height: 200,

    tiles: [],

    seed: Math.floor(Math.random()*999999999)

};

/* ==========================================================
   TILE TYPES
========================================================== */

const TileTypes = {

    GRASS: "grass",

    FOREST: "forest",

    MOUNTAIN: "mountain",

    WATER: "water",

    STONE: "stone",

    GOLD: "gold",

    SAND: "sand"

};

/* ==========================================================
   CREATE MAP
========================================================== */

function generateTerrain(){

    TerrainEngine.tiles=[];

    for(let y=0;y<TerrainEngine.height;y++){

        const row=[];

        for(let x=0;x<TerrainEngine.width;x++){

            row.push(

                createTile(x,y)

            );

        }

        TerrainEngine.tiles.push(row);

    }

}

/* ==========================================================
   CREATE TILE
========================================================== */

function createTile(x,y){

    let random=Math.random();

    let type=TileTypes.GRASS;

    if(random<0.08){

        type=TileTypes.WATER;

    }

    else if(random<0.18){

        type=TileTypes.FOREST;

    }

    else if(random<0.24){

        type=TileTypes.MOUNTAIN;

    }

    else if(random<0.28){

        type=TileTypes.STONE;

    }

    else if(random<0.30){

        type=TileTypes.GOLD;

    }

    else if(random<0.34){

        type=TileTypes.SAND;

    }

    return{

        x,

        y,

        type,

        discovered:false,

        occupied:false,

        resourceAmount:100,

        building:null

    };

}

/* ==========================================================
   GET TILE
========================================================== */

function getTile(x,y){

    if(x<0||y<0)

        return null;

    if(y>=TerrainEngine.height)

        return null;

    if(x>=TerrainEngine.width)

        return null;

    return TerrainEngine.tiles[y][x];

}

/* ==========================================================
   RANDOM GRASS TILE
========================================================== */

function randomGrassTile(){

    while(true){

        const x=Math.floor(

            Math.random()*

            TerrainEngine.width

        );

        const y=Math.floor(

            Math.random()*

            TerrainEngine.height

        );

        const tile=getTile(x,y);

        if(tile.type==="grass")

            return tile;

    }

}
