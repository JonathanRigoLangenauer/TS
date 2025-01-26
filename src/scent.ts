import { Color } from "./color.js";
import { canvas, ctx } from "./index.js";
export class Scent {
    x: number;
    y: number;
    home: number[][] = []; // scent lead to home.
    food: number[][] = []; // scent lead to food.
    static gridSize: number
    static size: number

    constructor() {
        Scent.gridSize = canvas.width-1
        Scent.size = Math.floor(canvas.width / Scent.gridSize)
        this.x = Math.floor(canvas.width / canvas.width * Scent.gridSize)
        this.y = Math.floor(canvas.height / canvas.width * Scent.gridSize)
      


        // Create empty grid for home and food.
        this.home = Array.from({ length: this.x }, () =>
            Array(this.y).fill(0)
        );
        this.food = Array.from({ length: this.x }, () =>
            Array(this.y).fill(0)
        );




    }

    draw() {

        let id = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let pixels = id.data;





        for (let i = 0; i < this.x; i++) {

            for (let j = 0; j < this.y; j++) {

                



                if (this.home[i][j] > 0) {
                    this.home[i][j] *= 0.99
                }



                if (this.food[i][j] > 0) {
                    this.food[i][j] *= 0.99
                }

                
                if(this.home[i][j] > .01||this.food[i][j]>0.01) {
                let off = (j * id.width + i) * 4;
                
                pixels[off] = 255*this.food[i][j]*.10;     // Red 
                pixels[off + 1] = 0; // Green
                pixels[off + 2] = 255*this.home[i][j]*.510; // Blue value (0-255)
                pixels[off + 3] =255; // Alpha/opacity (0-255)
                }
                


            }
        }

        ctx.putImageData(id, 0, 0);
    }
}