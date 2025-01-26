import { Colony } from "./colony.js";
import { Color } from "./color.js";
import { canvas, ctx, simu } from "./index.js";
import { Scent } from "./scent.js";
import { Terrain } from "./terrain.js";
import { Vector } from "./vector.js";



export class Ant {
    x: number;
    y: number;
    vec: Vector
    size: number
    strength: number
    name: string = "Bob"
    color: Color;
    scentStrength = 1;

    owner: Colony;

    
    TfindFoodFGoHome: boolean = true

    constructor(x: number, y: number, vec: Vector, size: number, strength: number, color: Color, owner: Colony) {
        this.x = x
        this.y = y
        this.vec = vec
        this.size = size
        this.strength = strength
        this.color = color
        this.owner = owner
    }

    update() {
        this.draw()

        this.step()
        this.wallCheck()
        this.foodCheck()
        this.step()
        this.colonyCheck()
        this.makeScent()
        

    }

    draw() {

        ctx.fillStyle = this.color.toString()
        ctx.fillRect(this.x, this.y, this.size, this.size)

    }

    step() {


        this.followStrongestSmell()
        this.bounceCheck()
    }

    smell(smellVec: Vector) {


        
    

        let xx = Math.floor(smellVec.x+this.x)
        let yy = Math.floor(smellVec.y+this.y)

        let strength = 0
        if (this.TfindFoodFGoHome == false) {
            strength= this.owner.scent.home[xx][yy]
        } else {
            strength= this.owner.scent.food[xx][yy]
            if(simu.terrain.grid[xx][yy]==Terrain.food){
                strength+=1000
            }
        }

        smellVec.x*= strength
        smellVec.y*= strength


        return smellVec;
    }

    followStrongestSmell() {

        //Add all Vector togeter and weight them by their strength of smell.
        let smelsDeg :number[] = [90,60,30,20, 10,5, 0,-5, -10, -20,-30,-60,-90]
        
        let vecSum = new Vector((this.vec.x*0.0001)+(Math.random()-0.5)*0.0001,this.vec.y*0.0001+(Math.random()-0.5)*0.0001)

        
        for (let i = 0; i < smelsDeg.length; i++) {
                let rotVec:Vector = new Vector(this.vec.x*5,this.vec.y*5)
                rotVec.rotateDeg(smelsDeg[i])
                vecSum.add(this.smell(rotVec))

                }

      
    
        let speed =   this.vec.magnitude()
        this.vec = vecSum.normalize()
        this.vec.scale(speed)

      

 
        this.x += this.vec.x 
        this.y += this.vec.y 





    }
    bounceCheck() {
        // Bounce check
        if (this.x < 10) {
            this.x = 10;

        }
        if (this.x >= canvas.width - this.size - 10) {
            this.x = canvas.width - this.size - 10;

        }
        if (this.y < 10) {
            this.y = 10;

        }
        if (this.y >= canvas.height - this.size - 10) {
            this.y = canvas.height - this.size - 10;

        }


    }
    wallCheck() {


        let xx = Math.floor(this.x)
        let yy = Math.floor(this.y)
        if (simu.terrain.grid[xx][yy] == Terrain.block ||
            simu.terrain.grid[xx + this.size][yy] == Terrain.block ||
            simu.terrain.grid[xx][yy + this.size] == Terrain.block ||
            simu.terrain.grid[xx + this.size][yy + this.size] == Terrain.block



        ) {
            this.x -= this.vec.x
            this.y -= this.vec.y 
            this.vec.x *= -1
            this.vec.y *= -1
        

        }
    }

    foodCheck() {
        let xx = Math.floor(this.x)
        let yy = Math.floor(this.y)
        if (simu.terrain.grid[xx][yy] == Terrain.food ||
            simu.terrain.grid[xx + this.size][yy] == Terrain.food ||
            simu.terrain.grid[xx][yy + this.size] == Terrain.food ||
            simu.terrain.grid[xx + this.size][yy + this.size] == Terrain.food



        ) {

            this.TfindFoodFGoHome = false
          
            if(Math.random()<0.001){
            simu.terrain.addAir(xx, yy)
            simu.terrain.addAir(xx + this.size, yy)
            simu.terrain.addAir(xx, yy + this.size)
            simu.terrain.addAir(xx + this.size, yy + this.size)
            }
            this.vec.x *= -1
            this.vec.y *= -1

            this.scentStrength=1
  




        }
    }

    makeScent() {

        //locate where the ant is in the grid
        let gridX = Math.floor(this.x / canvas.width * Scent.gridSize)
        let gridY = Math.floor(this.y / canvas.width * Scent.gridSize)
        this.scentStrength*= 0.99

        if (this.TfindFoodFGoHome == true) {

            this.owner.scent.home[gridX][gridY] += .1*this.scentStrength

        } else  {
            
            this.owner.scent.food[gridX][gridY] += .1*this.scentStrength
        }
    }

    colonyCheck(){
        if(Math.abs(this.x-this.owner.x)<this.owner.sizes/2 &&Math.abs(this.y-this.owner.y)<this.owner.sizes/2){
       
            this.TfindFoodFGoHome = true
            this.vec.x *= -1
            this.vec.y *= -1
            this.scentStrength=1
   

        }
    }




}