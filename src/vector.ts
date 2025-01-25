export class Vector {
    x: number
    y: number
    speed: number
    degrees: number
    constructor(speed:number,degrees: number ) {
        let angle   = degrees
        this.x = Math.cos(angle)
        this.y = Math.sin(angle)
        this.speed = speed
        this.degrees = degrees
    }


    rotate(degrees: number) {
        const radians = degrees * (Math.PI / 180);
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);

        let xx = this.x * cos - this.y * sin
        let yy = this.x * sin + this.y * cos

        this.x = xx
        this.y = yy
    }





    magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }





}