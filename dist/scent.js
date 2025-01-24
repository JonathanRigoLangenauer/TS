import { canvas, ctx } from "./index.js";
export class Scent {
    constructor() {
        this.home = []; // scent lead to home.
        this.food = []; // scent lead to food.
        Scent.size = Math.floor(canvas.width / Scent.gridSize);
        this.x = Math.floor(canvas.width / canvas.width * Scent.gridSize);
        this.y = Math.floor(canvas.height / canvas.width * Scent.gridSize);
        // Create empty grid for home and food.
        this.home = Array.from({ length: this.x }, () => Array(this.y).fill('0'));
        this.food = Array.from({ length: this.x }, () => Array(this.y).fill('0'));
    }
    draw() {
        for (let i = 0; i < this.x; i++) {
            for (let j = 0; j < this.y; j++) {
                ctx.fillStyle = `rgba(0, 0, 255, ${this.home[i][j]})`;
                ctx.fillRect(i * Scent.size, j * Scent.size, Scent.size, Scent.size);
                ctx.fillStyle = `rgba(255, 0, 0, ${this.food[i][j]})`;
                ctx.fillRect(i * Scent.size, j * Scent.size, Scent.size, Scent.size);
            }
        }
    }
}
Scent.gridSize = 100;
//# sourceMappingURL=scent.js.map