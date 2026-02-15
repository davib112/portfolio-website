import { Vector2 } from "./Vector2";
import LineStyle from "./draw.module.css"





export function drawLine(start: Vector2, end: Vector2, color: string = "white", width: number = 4) {
    return (
        <svg className={`${LineStyle.drawSVG}`} width="100%" height="100%" preserveAspectRatio="none">
            <line
                x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke={color} stroke-width={width} />
        </svg>
    )

}

export function drawCircle(center: Vector2, color: string = "white", radius: number = 4) {
    return (
        <svg className={`${LineStyle.drawSVG}`} width="100%" height="100%" preserveAspectRatio="none">
            <circle cx={center.x} cy={center.y} r={radius} fill={color} />
        </svg>
    )

}