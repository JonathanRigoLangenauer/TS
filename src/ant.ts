import { Colony } from "./colony.js";
import { Color } from "./color.js";
import { canvas, ctx } from "./index.js";
import { Scent } from "./scent.js";
import { MyVector } from "./vector.js";


export class Ant {
    x: number;
    y: number;
    vec: MyVector
    size: number
    strength: number
    name: string = "Bob"
    color: Color;

    owner: Colony;

    goHome: boolean = false
    findFood: boolean = true

    constructor(x: number, y: number, vec: MyVector, size: number, strength: number, color: Color, owner: Colony) {
        this.x = x
        this.y = y
        this.vec = vec
        this.size = size
        this.strength = strength
        this.color = color
        this.owner = owner
    }

    draw() {

        ctx.fillStyle = this.color.toString()
        ctx.fillRect(this.x, this.y, this.size, this.size)

    }


    step() {
        //Movement 
        this.x += this.vec.x * this.vec.speed
        this.y += this.vec.y * this.vec.speed

        //locate where the ant is in the grid
        let gridX = Math.floor(this.x / canvas.width * Scent.gridSize)
        let gridY = Math.floor(this.y / canvas.width * Scent.gridSize)

        if (this.findFood == true) {

            this.owner.scent.home[gridX][gridY] += .01

        } else if (this.goHome == true) {
            this.owner.scent.food[gridX][gridY] += .01
        }
    }

    rotate() {
        if (Math.random() < 0.01) {
            this.vec.rotate(Math.random() * 180 * 2 - 90)
        }

    }


}