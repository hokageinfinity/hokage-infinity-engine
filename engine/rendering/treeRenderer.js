"use strict";

function renderTrees(ctx){

    const size=WorldRenderer.tileSize*Camera.zoom;

    ForestEngine.trees.forEach(tree=>{

        if(!tree.alive)
            return;

        const x=

            (tree.x*

            WorldRenderer.tileSize-

            Camera.x)*

            Camera.zoom;

        const y=

            (tree.y*

            WorldRenderer.tileSize-

            Camera.y)*

            Camera.zoom;

        ctx.fillStyle="#145A32";

        ctx.beginPath();

        ctx.arc(

            x+size/2,

            y+size/2,

            size/3,

            0,

            Math.PI*2

        );

        ctx.fill();

        ctx.fillStyle="#6E4B1F";

        ctx.fillRect(

            x+size*0.45,

            y+size*0.55,

            size*0.1,

            size*0.3

        );

    });

}
