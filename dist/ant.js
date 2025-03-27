import { canvas, ctx, simu } from "./index.js";
import { Scent } from "./scent.js";
import { Terrain } from "./terrain.js";
import { Vector } from "./vector.js";
export class Ant {
    constructor(x, y, vec, size, strength, color, owner) {
        this.name = "Bob";
        this.scentStrength = 1;
        this.TfindFoodFGoHome = true;
        this.x = x;
        this.y = y;
        this.vec = vec;
        this.size = size;
        this.strength = strength;
        this.color = color;
        this.owner = owner;
    }
    update() {
        this.draw();
        this.step();
        this.wallCheck();
        this.foodCheck();
        this.step();
        this.colonyCheck();
        this.makeScent();
    }
    draw() {
        ctx.save();
        // blue rect
        ctx.fillStyle = "#0095DD";
        ctx.translate(this.x, this.y);
        ctx.rotate(this.vec.radian() + Math.PI / 2);
        // grey rect
        ctx.fillStyle = "#4D4E53";
        ctx.drawImage(Ant.image, -Ant.sizeX / 2, -Ant.sizeY / 2, Ant.sizeX, Ant.sizeY);
        //ctx.fillRect(0, 0, 200, 200);
        ctx.restore();
        ctx.fillStyle = this.color.toString();
        //ctx.fillRect(this.x, this.y, this.size, this.size);
    }
    step() {
        this.followStrongestSmell();
        this.bounceCheck();
    }
    smell(smellVec) {
        let xx = Math.floor(smellVec.x + this.x);
        let yy = Math.floor(smellVec.y + this.y);
        let strength = 0;
        if (this.TfindFoodFGoHome == false) {
            strength = this.owner.scent.home[xx][yy];
        }
        else {
            strength = this.owner.scent.food[xx][yy];
            if (simu.terrain.grid[xx][yy] == Terrain.food) {
                strength += 1000;
            }
        }
        smellVec.x *= strength;
        smellVec.y *= strength;
        return smellVec;
    }
    followStrongestSmell() {
        //Add all Vector togeter and weight them by their strength of smell.
        let smelsDeg = [
            30, 20, 10, 5, 0, -5, -10, -20, -30
        ];
        let vecSum = new Vector(this.vec.x * 0.0001 + (Math.random() - 0.5) * 0.00005, this.vec.y * 0.0001 + (Math.random() - 0.5) * 0.00005);
        for (let i = 0; i < smelsDeg.length; i++) {
            let rotVec = new Vector(this.vec.x * 5, this.vec.y * 5);
            rotVec.rotateDeg(smelsDeg[i]);
            vecSum.add(this.smell(rotVec));
        }
        let speed = this.vec.magnitude();
        this.vec = vecSum.normalize();
        this.vec.scale(speed);
        this.x += this.vec.x;
        this.y += this.vec.y;
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
        let xx = Math.floor(this.x);
        let yy = Math.floor(this.y);
        if (simu.terrain.grid[xx][yy] == Terrain.block ||
            simu.terrain.grid[xx + this.size][yy] == Terrain.block ||
            simu.terrain.grid[xx][yy + this.size] == Terrain.block ||
            simu.terrain.grid[xx + this.size][yy + this.size] == Terrain.block) {
            this.x -= this.vec.x;
            this.y -= this.vec.y;
            this.vec.x *= -1;
            this.vec.y *= -1;
        }
    }
    foodCheck() {
        let xx = Math.floor(this.x);
        let yy = Math.floor(this.y);
        if (simu.terrain.grid[xx][yy] == Terrain.food ||
            simu.terrain.grid[xx + this.size][yy] == Terrain.food ||
            simu.terrain.grid[xx][yy + this.size] == Terrain.food ||
            simu.terrain.grid[xx + this.size][yy + this.size] == Terrain.food) {
            this.TfindFoodFGoHome = false;
            if (Math.random() < 1) {
                simu.terrain.addAir(xx, yy);
                simu.terrain.addAir(xx + this.size, yy);
                simu.terrain.addAir(xx, yy + this.size);
                simu.terrain.addAir(xx + this.size, yy + this.size);
            }
            this.vec.x *= -1;
            this.vec.y *= -1;
            this.scentStrength = 1;
        }
    }
    makeScent() {
        //locate where the ant is in the grid
        let gridX = Math.floor((this.x / canvas.width) * Scent.gridSize);
        let gridY = Math.floor((this.y / canvas.width) * Scent.gridSize);
        this.scentStrength *= 0.99;
        if (this.TfindFoodFGoHome == true) {
            this.owner.scent.home[gridX][gridY] += 1 * this.scentStrength;
            this.owner.scent.home[gridX + 1][gridY] += 1 * this.scentStrength;
            this.owner.scent.home[gridX][gridY + 1] += 1 * this.scentStrength;
            this.owner.scent.home[gridX - 1][gridY] += 1 * this.scentStrength;
            this.owner.scent.home[gridX][gridY - 1] += 1 * this.scentStrength;
        }
        else {
            this.owner.scent.food[gridX][gridY] += 1 * this.scentStrength;
            this.owner.scent.food[gridX + 1][gridY] += 1 * this.scentStrength;
            this.owner.scent.food[gridX][gridY - 1] += 1 * this.scentStrength;
            this.owner.scent.food[gridX - 1][gridY] += 1 * this.scentStrength;
            this.owner.scent.food[gridX][gridY + 1] += 1 * this.scentStrength;
        }
    }
    colonyCheck() {
        if (Math.abs(this.x - this.owner.x) < this.owner.sizes / 2 &&
            Math.abs(this.y - this.owner.y) < this.owner.sizes / 2) {
            this.TfindFoodFGoHome = true;
            this.vec.x *= -1;
            this.vec.y *= -1;
            this.scentStrength = 1;
        }
    }
}
Ant.sizeX = 25;
Ant.sizeY = 40;
Ant.image = document.getElementById("ant");
//# sourceMappingURL=ant.js.map