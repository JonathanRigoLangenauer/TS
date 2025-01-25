import { Ant } from "./ant.js";
import { Color } from "./color.js";
import { ctx } from "./index.js";
import { Terrain } from "./terrain.js";
import { Scent } from "./scent.js";
import { Vector } from "./vector.js";

export class Colony {
    x: number;
    y: number;
    sizes: number= 40;
    ants: Ant[];
    color:Color;
    initialAnts:number
    scent:Scent= new Scent();


    constructor(x: number, y: number, initialAnts: number, color: Color){ 
        this.x = x;
        this.y = y;


        this.initialAnts = initialAnts;
        this.ants=[];
        for (let i = 0; i < initialAnts; i++) {
            this.ants.push(new Ant(x, y, new Vector(1,(2*Math.random()-1)*2*Math.PI), 2, 0, color,this))
        }

       
        this.color = color;
    } 

    update(){
 
    
        //
        this.scent.draw()

        //Draw colony
        ctx.fillStyle = this.color.toString()
        ctx.fillRect(this.x-this.sizes/2, this.y-this.sizes/2, this.sizes,this.sizes)
        
        
        this.ants.forEach(item => {
            item.update()
        })


    }

}