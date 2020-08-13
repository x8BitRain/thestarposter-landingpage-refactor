import { ICartesianCoords } from "@/starmap-math";

export default function drawGraticule(
  color: string,
  ctx: CanvasRenderingContext2D,
  grid: ICartesianCoords[][],
  width: number
) {
  ctx.lineWidth = 0.0008 * width;
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.8;
  for (const path of grid) {
    ctx.beginPath();
    ctx.moveTo(path[0].x * width, path[0].y * width);
    for (const point of path) {
      ctx.lineTo(point.x * width, point.y * width);
    }
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}
