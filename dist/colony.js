import { Ant } from "./ant.js";
import { ctx } from "./index.js";
import { Terrain } from "./terrain.js";
import { Scent } from "./scent.js";
import { MyVector } from "./vector.js";
export class Colony {
    constructor(x, y, initialAnts, color) {
        this.scent = new Scent();
        this.terrain = new Terrain();
        this.x = x;
        this.y = y;
        this.initialAnts = initialAnts;
        this.ants = [];
        for (let i = 0; i < initialAnts; i++) {
            this.ants.push(new Ant(x, y, new MyVector(1), 4, 0, color, this));
        }
        this.color = color;
    }
    update() {
        //
        this.terrain.draw();
        //
        this.scent.draw();
        //Draw colony
        ctx.fillStyle = this.color.toString();
        ctx.fillRect(this.x - 5, this.y - 5, 10, 10);
        this.ants.forEach(item => {
            item.draw();
            item.step();
            item.makeScent();
            item.rotate();
        });
    }
}
//# sourceMappingURL=colony.js.map