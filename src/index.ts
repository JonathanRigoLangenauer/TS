import { Colony } from "./colony.js";
import { Color } from "./color.js";
import { Terrain } from "./terrain.js";



export var canvas = <HTMLCanvasElement>document.getElementById("canvas");
export var ctx = canvas.getContext("2d")!;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export class Simulation{
    terrain = new Terrain()
    col = new Colony(canvas.width/2, canvas.height/2, 10000, new Color(255, 255, 0, 1))
     pause:boolean = false

    update(){
        this.terrain.draw()
        if(simu.pause==false){
        this.col.update()
    } 
    }
    
}


export var simu = new Simulation()

let background = new Color(0, 0, 0, 1)

update()

function update() {

    ctx.fillStyle = background.toString()
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    


    simu.update() 


    
    window.requestAnimationFrame(update)

}

