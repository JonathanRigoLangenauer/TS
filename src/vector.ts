export class Vector {
    x: number
    y: number
 
    constructor(x:number,y:number) {
            this.x = x
            this.y = y
           

    }


    rotateDeg(degrees: number) {
        const radians = degrees*Math.PI/180
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);

        let xx = this.x * cos - this.y * sin
        let yy = this.x * sin + this.y * cos
        
        this.x = xx
        this.y = yy
    }

    normalize(){
        let magnitude = this.magnitude();
        if (magnitude > 0) {
            this.x /= magnitude;
            this.y /= magnitude;
        }
        return this;
    }

    add(other: Vector) {
        this.x += other.x;
        this.y += other.y;
    }

    scale(scalar: number) {
        this.x *= scalar;
        this.y *= scalar;
    }



    magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }





}