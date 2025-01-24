import { Colony } from "./colony.js";
import { Color } from "./color.js";
export var canvas = document.getElementById("canvas");
export var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let col = new Colony(canvas.width / 2, canvas.height / 2, 1000, new Color(255, 0, 0, 1));
let background = new Color(0, 10, 0, 1);
update();
function update() {
    ctx.fillStyle = background.toString();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    col.update();
    window.requestAnimationFrame(update);
}
//# sourceMappingURL=index.js.map