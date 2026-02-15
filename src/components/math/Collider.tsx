import { Vector2 } from "@/components/math/Vector2";

export class Collider {
    constructor(
        public position: Vector2,
        public size: Vector2,
    ) { }
    GetLeft() {
        return this.position.x;
    }
    GetRight() {
        return this.position.x + this.size.x;
    }

    GetTop() {
        return this.position.y;
    }
    GetBottom() {
        return this.position.y + this.size.y;
    }

    GetTopLeft() {
        return this.position;
    }
    GetBottomRight() {
        return this.position.add(this.size);
    }

    GetCenter() {
        return new Vector2(this.position.x + this.size.x / 2, this.position.y + this.size.y / 2);
    }

    GetInfoString() {
        return (
            "Pos: (" +
            this.position.x +
            ", " +
            this.position.y +
            ") Size: (" +
            this.size.x +
            ", " +
            this.size.y +
            ")"
        );
    }
}