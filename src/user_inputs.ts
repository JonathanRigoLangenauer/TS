import { canvas, col } from "./index.js";
import { Terrain } from "./terrain.js";

let isDragging = false;
let startX, startY;

canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.offsetX;
    startY = e.offsetY;
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    let currentX = e.offsetX;
    let currentY = e.offsetY;

    //Is badly programed for multiple colonies
    col.terrain.addBlocks(currentX, currentY,50)
    
    console.log(currentX, currentY);
    


});

canvas.addEventListener('mouseup', () => {
    isDragging = false;
});