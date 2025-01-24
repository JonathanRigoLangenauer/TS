import { canvas, ctx } from "./index.js";
import { Scent } from "./scent.js";
export class Ant {
    constructor(x, y, vec, size, strength, color, owner) {
        this.name = "Bob";
        this.goHome = false;
        this.findFood = true;
        this.x = x;
        this.y = y;
        this.vec = vec;
        this.size = size;
        this.strength = strength;
        this.color = color;
        this.owner = owner;
    }
    draw() {
        ctx.fillStyle = this.color.toString();
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
    step() {
        //Movement 
        this.x += this.vec.x * this.vec.speed;
        this.y += this.vec.y * this.vec.speed;
        //locate where the ant is in the grid
        let gridX = Math.floor(this.x / canvas.width * Scent.gridSize);
        let gridY = Math.floor(this.y / canvas.width * Scent.gridSize);
        if (this.findFood == true) {
            this.owner.scent.home[gridX][gridY] += 1;
        }
        else if (this.goHome == true) {
            this.owner.scent.food[gridX][gridY] += .1;
        }
    }
    rotate() {
        if (Math.random() < 0.01) {
            this.vec.rotate(Math.random() * 180 * 2 - 90);
        }
    }
}
//# sourceMappingURL=ant.js.map