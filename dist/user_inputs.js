import { canvas, simu } from "./index.js";
let isDragging = false;
let startX, startY;
let addBlockType = "block";
canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.offsetX;
    startY = e.offsetY;
});
canvas.addEventListener('mousemove', (e) => {
    if (!isDragging)
        return;
    let currentX = e.offsetX;
    let currentY = e.offsetY;
    //Is badly programed for multiple colonies
    simu.terrain.paint(currentX, currentY, 25, addBlockType);
    console.log(currentX, currentY);
});
canvas.addEventListener('mouseup', () => {
    isDragging = false;
});
window.addEventListener('keydown', (e) => {
    console.log(e.key);
    if (e.key == '1') {
        addBlockType = "block";
    }
    else if (e.key == '2') {
        addBlockType = "food";
    }
    else if (e.key == '3') {
        addBlockType = "air";
    }
    else if (e.key == '4') {
        addBlockType = "homeScent";
    }
    else if (e.key == '5') {
        addBlockType = "foodScent";
    }
    console.log(e.key);
    if (e.key == " ") {
        simu.pause = !simu.pause;
    }
});
//# sourceMappingURL=user_inputs.js.map