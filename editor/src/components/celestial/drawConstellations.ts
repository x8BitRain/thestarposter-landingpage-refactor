import {
  IConstellation,
  ICartestianConstellation
} from "@/provider/starsProvider";

export default function drawConstellations(
  ctx: CanvasRenderingContext2D,
  constellations: ICartestianConstellation[],
  width: number,
  color: string
) {
  ctx.globalAlpha = 0.6;
  ctx.lineWidth = (1.5 / 1024) * width;
  ctx.strokeStyle = color;
  ctx.beginPath();
  for (const constellation of constellations) {
    for (const path of constellation.paths) {
      ctx.moveTo(path[0].x * width, path[0].y * width);
      for (const point of path) {
        ctx.lineTo(point.x * width, point.y * width);
      }
    }
  }
  ctx.stroke();
}
