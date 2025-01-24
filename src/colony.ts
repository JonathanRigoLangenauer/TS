import { Ant } from "./ant.js";
import { Color } from "./color.js";
import { ctx } from "./index.js";
import { Scent } from "./scent.js";
import { MyVector } from "./vector.js";

export class Colony {
    x: number;
    y: number;
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
            this.ants.push(new Ant(x, y, new MyVector(1), 4, 0, color,this))
        }

       
        this.color = color;
    } 

    update(){

        this.scent.draw()
        ctx.fillStyle = this.color.toString()
        ctx.fillRect(this.x-5, this.y-5, 10,10)

        
        this.ants.forEach(item => {
            item.draw()
            item.step()
            item.rotate()
        })


    }

}