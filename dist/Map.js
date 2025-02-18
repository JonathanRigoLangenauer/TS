import { canvas, ctx } from "./index.js";
export class Terrain {
    constructor() {
        this.grid = []; // scent lead to home.
        this.id = ctx.getImageData(0, 0, canvas.width, canvas.height);
        this.pixels = this.id.data;
        Terrain.gridSize = canvas.width;
        Terrain.size = Math.floor(canvas.width / Terrain.gridSize);
        this.x = Math.floor(canvas.width / canvas.width * Terrain.gridSize);
        this.y = Math.floor(canvas.height / canvas.width * Terrain.gridSize);
        let id = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let pixels = id.data;
        // Create empty grid 
        this.grid = Array.from({ length: this.x }, () => Array(this.y).fill('0'));
    }
    addBlocks(centerX, centerY, radius) {
        for (let i = centerX - radius; i <= centerX + radius; i++) {
            for (let j = centerY - radius; j <= centerY + radius; j++) {
                // Check if point is within circle using distance formula
                if (Math.sqrt((i - centerX) ** 2 + (j - centerY) ** 2) <= radius) {
                    let off = (j * this.id.width + i) * 4;
                    this.pixels[off] = 100; // Red 
                    this.pixels[off + 1] = 100; // Green
                    this.pixels[off + 2] = 100; // Blue value (0-255)
                    this.pixels[off + 3] = 255; // Alpha/opacity (0-255)
                    this.grid[i][j] = Terrain.block;
                }
            }
        }
    }
    draw() {
        ctx.putImageData(this.id, 0, 0);
    }
}
Terrain.air = 0;
Terrain.block = 1;
Terrain.food = 2;
//# sourceMappingURL=Map.js.map