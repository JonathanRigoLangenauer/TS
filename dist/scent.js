import { canvas, ctx } from "./index.js";
export class Scent {
    constructor() {
        this.home = []; // scent lead to home.
        this.food = []; // scent lead to food.
        this.rectangles = [];
        Scent.size = Math.floor(canvas.width / Scent.gridSize);
        this.x = Math.floor(canvas.width / canvas.width * Scent.gridSize);
        this.y = Math.floor(canvas.height / canvas.width * Scent.gridSize);
        console.log(Scent.size);
        // Create empty grid for home and food.
        this.home = Array.from({ length: this.x }, () => Array(this.y).fill('0'));
        this.food = Array.from({ length: this.x }, () => Array(this.y).fill('0'));
        console.log(this.home, this.food);
    }
    draw() {
        for (let i = 0; i < this.x; i++) {
            for (let j = 0; j < this.y; j++) {
                if (this.home[i][j] > 0) {
                    this.home[i][j] -= 0.001;
                }
                if (this.food[i][j] < 0) {
                    this.food[i][j] -= 0.001;
                }
            }
        }
    }
    addRectangle(x, y, width) {
        this.rectangles.push([x, y, width]);
    }
    batchDraw() {
        ctx.beginPath();
        this.rectangles.forEach(rect => {
            ctx.rect(rect[0], rect[1], rect[2], rect[2]);
        });
        ctx.fill();
    }
}
Scent.gridSize = 2000;
//# sourceMappingURL=scent.js.map