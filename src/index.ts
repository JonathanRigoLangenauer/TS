import { Ant } from "./ant.js";
import { Color } from "./color.js";
import { MyVector } from "./vector.js";
import { A } from "./class.js";



var canvas = <HTMLCanvasElement>document.getElementById("canvas");
export var ctx = canvas.getContext("2d")!;
var v = new A
v.cluck()
v.cluck()
v.cluck()
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let color = [0,0,0,1]
ctx.fillStyle = `rgba(${color})`;
ctx.fillRect(0,0,canvas.width,canvas.height)



color = [0,255,0,1]
ctx.fillStyle = `rgba(${color})`;
ctx.fillRect(100,100,100,100)

let ants: Ant[] = []
for(let i = 0;i<1000;i++){
ants.push(new Ant(canvas.width/2,canvas.height/2,new MyVector(1),10,0,new Color(255,255,255,1)))
}
update()

function update(){
color = [0,0,0,1]
ctx.fillStyle = `rgba(${color})`;
ctx.fillRect(0,0,canvas.width,canvas.height)


ants.forEach(item =>{
    item.draw()
    item.step()
    item.rotate()
})


window.requestAnimationFrame(update)

}

