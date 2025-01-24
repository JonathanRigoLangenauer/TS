import { Ant } from "./ant.js";
import { Color } from "./color.js";
import { MyVector } from "./vector.js";
var canvas = document.getElementById("canvas");
export var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ants = [];
for (let i = 0; i < 10000; i++) {
    ants.push(new Ant(canvas.width / 2, canvas.height / 2, new MyVector(1), 2, 0, new Color(255, 255, 255, 1)));
}
let background = new Color(0, 10, 0, 1);
update();
function update() {
    ctx.fillStyle = background.toString();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ants.forEach(item => {
        item.draw();
        item.step();
        item.rotate();
    });
    window.requestAnimationFrame(update);
}
//# sourceMappingURL=index.js.map