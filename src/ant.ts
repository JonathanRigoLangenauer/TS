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

    smell(degrees: number) {



        let smellVec = new Vector(this.vec.speed * 3, this.vec.degrees + degrees)

        let xx = Math.floor(this.x + smellVec.x)
        let yy = Math.floor(this.y + smellVec.y)


        if (this.TfindFoodFGoHome == false) {
            return this.owner.scent.home[xx][yy]
        } else {
            return this.owner.scent.food[xx][yy]
        }

    }

    followStrongestSmell() {


        let smelsDeg :number[] = [10, 5, 0, -5, -10]
        let smelsVal :number[] = [0, 0, 0, 0, 0]
        for (let i = 0; i < smelsDeg.length; i++) {
            smelsVal[i] = this.smell(smelsDeg[i])
        }

        let maxValue = Math.max(...smelsVal);


        //get the index of the max value
        let index =0;
        for(let i =0;i < smelsDeg.length; i++) {

            index =i
            if(smelsVal[i]==maxValue){
             break;
            }
            
        }
        



        if (maxValue < .001) {


        } else {

            this.vec.rotate(smelsDeg[index])

        }




        this.x += this.vec.x * this.vec.speed
        this.y += this.vec.y * this.vec.speed





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
            this.x -= this.vec.x * this.vec.speed
            this.y -= this.vec.y * this.vec.speed
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
          

            simu.terrain.addAir(xx, yy)
            simu.terrain.addAir(xx + this.size, yy)
            simu.terrain.addAir(xx, yy + this.size)
            simu.terrain.addAir(xx + this.size, yy + this.size)

            this.vec.x *= -1
            this.vec.y *= -1




        }
    }

    makeScent() {

        //locate where the ant is in the grid
        let gridX = Math.floor(this.x / canvas.width * Scent.gridSize)
        let gridY = Math.floor(this.y / canvas.width * Scent.gridSize)

        if (this.TfindFoodFGoHome == true) {

            this.owner.scent.home[gridX][gridY] += .1

        } else  {

            this.owner.scent.food[gridX][gridY] += .1
        }
    }

    colonyCheck(){
        if(Math.abs(this.x-this.owner.x)<this.owner.sizes/2 &&Math.abs(this.y-this.owner.y)<this.owner.sizes/2&& this.TfindFoodFGoHome==false ){
       
            this.TfindFoodFGoHome = true
            this.vec.x *= -1
            this.vec.y *= -1

        }
    }

    search() {

        if (Math.random() < 0.01) {
            this.vec.rotate(Math.random() * 180 * 2 - 90)
        }

    }


}