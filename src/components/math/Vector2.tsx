export class Vector2 {
    constructor(
        public x: number,
        public y: number,
    ) { }

    add(v: Vector2) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }
    minus(v: Vector2) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }

    times(m: number) {
        return new Vector2(this.x * m, this.y * m);
    }

    GetLength() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}