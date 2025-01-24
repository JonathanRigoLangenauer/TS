export class MyVector {
    x: number
    y: number
    speed: number
    constructor(speed:number) {
        let angle   = (2*Math.random()-1)*2*Math.PI
        this.x = Math.cos(angle)
        this.y = Math.sin(angle)
        this.speed = speed
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