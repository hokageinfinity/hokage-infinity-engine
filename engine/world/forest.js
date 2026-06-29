/* ==========================================================
   Hokage Infinity Engine
   forest.js
========================================================== */

"use strict";

const ForestEngine = {

    trees: []

};

/* ==========================================================
    TREE
========================================================== */

class Tree{

    constructor(x,y){

        this.id=crypto.randomUUID();

        this.x=x;

        this.y=y;

        this.health=100;

        this.maxHealth=100;

        this.wood=25;

        this.alive=true;

        this.age=Math.floor(Math.random()*80);

    }

}

/* ==========================================================
    GENERATE
========================================================== */

function generateForest(){

    ForestEngine.trees=[];

    for(let y=0;y<TerrainEngine.height;y++){

        for(let x=0;x<TerrainEngine.width;x++){

            const tile=getTile(x,y);

            if(tile.type!==TileTypes.FOREST)
                continue;

            if(Math.random()<0.55){

                ForestEngine.trees.push(

                    new Tree(x,y)

                );

            }

        }

    }

}

/* ==========================================================
    UPDATE
========================================================== */

function updateForest(){

    ForestEngine.trees.forEach(tree=>{

        if(!tree.alive)
            return;

        tree.age+=0.001;

    });

}

/* ==========================================================
    CHOP
========================================================== */

function chopTree(tree,amount){

    if(!tree.alive)
        return;

    tree.health-=amount;

    if(tree.health<=0){

        tree.alive=false;

        World.resources.wood+=tree.wood;

    }

}
