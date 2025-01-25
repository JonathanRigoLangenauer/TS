export class Vector {
    constructor(speed, degrees) {
        let angle = degrees;
        this.x = Math.cos(angle);
        this.y = Math.sin(angle);
        this.speed = speed;
        this.degrees = degrees;
    }
    rotate(degrees) {
        const radians = degrees * (Math.PI / 180);
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        let xx = this.x * cos - this.y * sin;
        let yy = this.x * sin + this.y * cos;
        this.x = xx;
        this.y = yy;
    }
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}
//# sourceMappingURL=vector.js.map