export class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    rotateDeg(degrees) {
        const radians = degrees * Math.PI / 180;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        let xx = this.x * cos - this.y * sin;
        let yy = this.x * sin + this.y * cos;
        this.x = xx;
        this.y = yy;
    }
    normalize() {
        let magnitude = this.magnitude();
        if (magnitude > 0) {
            this.x /= magnitude;
            this.y /= magnitude;
        }
        return this;
    }
    add(other) {
        this.x += other.x;
        this.y += other.y;
    }
    scale(scalar) {
        this.x *= scalar;
        this.y *= scalar;
    }
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}
//# sourceMappingURL=vector.js.map