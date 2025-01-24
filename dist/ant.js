import { ctx } from "./index.js";
export class Ant {
    constructor(x, y, vec, size, strength, color) {
        this.x = 0;
        this.y = 0;
        this.name = "Bob";
        this.x = x;
        this.y = y;
        this.vec = vec;
        this.size = size;
        this.strength = strength;
        this.color = color;
    }
    draw() {
        ctx.fillStyle = this.color.toString();
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
    step() {
        this.x += this.vec.x * this.vec.speed;
        this.y += this.vec.y * this.vec.speed;
    }
    rotate() {
        if (Math.random() < 0.01) {
            this.vec.rotate(Math.random() * 180 * 2 - 90);
        }
    }
}
//# sourceMappingURL=ant.js.map