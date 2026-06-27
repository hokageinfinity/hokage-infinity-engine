/* ==========================================================
   Hokage Infinity Engine
   pathfinding.js
   Engine Alpha 1.2
========================================================== */

"use strict";

/* ==========================================================
    PATHFINDING ENGINE
========================================================== */

const PathfindingEngine = {

    width: 100,

    height: 100,

    blockedTiles: new Set()

};

/* ==========================================================
    TILE KEY
========================================================== */

function tileKey(x, y){

    return `${x},${y}`;

}

/* ==========================================================
    BLOCK TILE
========================================================== */

function blockTile(x,y){

    PathfindingEngine.blockedTiles.add(

        tileKey(x,y)

    );

}

/* ==========================================================
    UNBLOCK TILE
========================================================== */

function unblockTile(x,y){

    PathfindingEngine.blockedTiles.delete(

        tileKey(x,y)

    );

}

/* ==========================================================
    WALKABLE
========================================================== */

function isWalkable(x,y){

    if(x<0) return false;

    if(y<0) return false;

    if(x>=PathfindingEngine.width)

        return false;

    if(y>=PathfindingEngine.height)

        return false;

    return !PathfindingEngine.blockedTiles.has(

        tileKey(x,y)

    );

}

/* ==========================================================
    NEIGHBORS
========================================================== */

function getNeighbors(node){

    const neighbors=[];

    const dirs=[

        [1,0],

        [-1,0],

        [0,1],

        [0,-1]

    ];

    dirs.forEach(dir=>{

        const nx=node.x+dir[0];

        const ny=node.y+dir[1];

        if(isWalkable(nx,ny)){

            neighbors.push({

                x:nx,

                y:ny

            });

        }

    });

    return neighbors;

}

/* ==========================================================
    DISTANCE
========================================================== */

function heuristic(a,b){

    return Math.abs(a.x-b.x)+

           Math.abs(a.y-b.y);

}

/* ==========================================================
    SIMPLE PATH
========================================================== */

function findPath(start,end){

    const open=[];

    const visited=new Set();

    open.push({

        x:start.x,

        y:start.y,

        path:[]

    });

    while(open.length>0){

        const current=open.shift();

        const key=tileKey(

            current.x,

            current.y

        );

        if(visited.has(key))

            continue;

        visited.add(key);

        if(

            current.x===end.x &&

            current.y===end.y

        ){

            return current.path;

        }

        const neighbors=

            getNeighbors(current);

        neighbors.forEach(next=>{

            open.push({

                x:next.x,

                y:next.y,

                path:[

                    ...current.path,

                    {

                        x:next.x,

                        y:next.y

                    }

                ]

            });

        });

    }

    return [];

}

/* ==========================================================
    MOVE CITIZEN
========================================================== */

function moveCitizenTo(

    citizen,

    targetX,

    targetY

){

    citizen.path=

        findPath(

            citizen.position,

            {

                x:targetX,

                y:targetY

            }

        );

}

/* ==========================================================
    FOLLOW PATH
========================================================== */

function updateCitizenMovement(

    citizen

){

    if(

        !citizen.path ||

        citizen.path.length===0

    )

        return;

    const next=

        citizen.path.shift();

    citizen.position.x=next.x;

    citizen.position.y=next.y;

}

/* ==========================================================
    RANDOM WALK
========================================================== */

function randomDestination(){

    return{

        x:Math.floor(

            Math.random()*

            PathfindingEngine.width

        ),

        y:Math.floor(

            Math.random()*

            PathfindingEngine.height

        )

    };

}

/* ==========================================================
    AI MOVEMENT
========================================================== */

function updatePathfinding(){

    citizens.forEach(citizen=>{

        if(

            !citizen.path ||

            citizen.path.length===0

        ){

            const target=

                randomDestination();

            moveCitizenTo(

                citizen,

                target.x,

                target.y

            );

        }

        updateCitizenMovement(

            citizen

        );

    });

}

/* ==========================================================
    BUILDING COLLISION
========================================================== */

function rebuildBlockedTiles(){

    PathfindingEngine.blockedTiles.clear();

    BuildingEngine.buildings.forEach(

        building=>{

            blockTile(

                building.x,

                building.y

            );

        }

    );

}

/* ==========================================================
    INITIALIZE
========================================================== */

function initializePathfinding(){

    rebuildBlockedTiles();

}
