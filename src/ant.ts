import { Color } from "./color.js";
import { ctx } from "./index.js";
import { MyVector } from "./vector.js";


export class Ant{
x:number = 0;
y:number = 0;
vec:MyVector
size:number
strength:number
name :string = "Bob"
color: Color;

   constructor(x:number,y:number,vec:MyVector,size:number,strength:number,color:Color){
    this.x = x
    this.y = y
    this.vec = vec
    this.size = size
    this.strength = strength
    this.color = color
   }

   draw(){

    ctx.fillStyle = this.color.toString()
    ctx.fillRect(this.x,this.y,this.size,this.size)

   }


   step(){
   
    this.x+=this.vec.x*this.vec.speed
    this.y+=this.vec.y*this.vec.speed
   }

   rotate(){
if(Math.random()<0.01){
    this.vec.rotate(Math.random()*180*2-90)}

   }


}