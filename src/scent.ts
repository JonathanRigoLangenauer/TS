import { Color } from "./color.js";
import { canvas, ctx } from "./index.js";
export class Scent {
    x: number;
    y: number;
    home: number[][] = []; // scent lead to home.
    food: number[][] = []; // scent lead to food.
    static gridSize: number = 200
    static size: number

    constructor() {
        Scent.size = Math.floor(canvas.width / Scent.gridSize)
        this.x = Math.floor(canvas.width / canvas.width * Scent.gridSize)
        this.y = Math.floor(canvas.height / canvas.width * Scent.gridSize)
        console.log(Scent.size)


        // Create empty grid for home and food.
        this.home = Array.from({ length: this.x }, () =>
            Array(this.y).fill('0')
        );
        this.food = Array.from({ length: this.x }, () =>
            Array(this.y).fill('0')
        );

        console.log(this.home, this.food)


    }

    draw() {


        for (let i = 0; i < this.x; i++) {

            for (let j = 0; j < this.y; j++) {


                ctx.fillStyle = `rgba(0, 0, 255, ${this.home[i][j]})`;
                ctx.fillRect(i / Scent.gridSize * canvas.width, j / Scent.gridSize * canvas.width, Scent.size, Scent.size);
                
                if (this.home[i][j] > 0) {
                    this.home[i][j] -= 0.001
                }
                ctx.fillStyle = `rgba(255, 0, 0, ${this.food[i][j]})`;
                ctx.fillRect(i / Scent.gridSize * canvas.width, j / Scent.gridSize * canvas.width, Scent.size, Scent.size);
                if (this.food[i][j] < 0) {
                    this.food[i][j] -= 0.001
                }
            }
        }
    }
}