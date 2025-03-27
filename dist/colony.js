import { Ant } from "./ant.js";
import { ctx } from "./index.js";
import { Scent } from "./scent.js";
import { Vector } from "./vector.js";
export class Colony {
    constructor(x, y, initialAnts, color) {
        this.sizes = 30;
        this.scent = new Scent();
        this.x = x;
        this.y = y;
        this.initialAnts = initialAnts;
        this.ants = [];
        for (let i = 0; i < initialAnts; i++) {
            let deg = Math.random() * 2 * Math.PI;
            let xAnt = Math.cos(deg) * 1;
            let yAnt = Math.sin(deg) * 1;
            this.ants.push(new Ant(x + this.sizes, y, new Vector(xAnt, yAnt), 2, 0, color, this));
        }
        this.color = color;
    }
    update() {
        //
        this.scent.draw();
        //Draw colony
        ctx.fillStyle = this.color.toString();
        ctx.fillRect(this.x - this.sizes / 2, this.y - this.sizes / 2, this.sizes, this.sizes);
        this.ants.forEach(item => {
            item.update();
        });
    }
}
//# sourceMappingURL=colony.js.map