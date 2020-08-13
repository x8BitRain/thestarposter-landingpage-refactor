import {
  IConstellation,
  ICartestianConstellation
} from "@/provider/starsProvider";
import { ICartesianCoords } from "@/starmap-math";
import { getOutOfScreenShadowOffsetX } from "./getOutOfScreenShadowOffsetX";
import { Shapes } from "@/posterTypes";

export default function drawMilkyWay(
  ctx: CanvasRenderingContext2D,
  milkyWay: ICartestianConstellation[],
  width: number,
  color: string,
  opacity: number,
  shape: Shapes
) {
  ctx.globalAlpha = opacity;
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 0; // (5 / 1024) * width;
  // we draw the actual polygon off-screen so that only the blurred shadow is visible
  ctx.shadowOffsetX = getOutOfScreenShadowOffsetX(width, shape);
  for (const polygon of milkyWay) {
    ctx.beginPath();
    const endPoints: ICartesianCoords[] = [];
    for (const path of polygon.paths) {
      ctx.moveTo(path[0].x * width - width, path[0].y * width);
      for (let pathIndex = 1; pathIndex < path.length; pathIndex++) {
        ctx.lineTo(
          path[pathIndex].x * width - width,
          path[pathIndex].y * width
        );
      }
    }
    ctx.fill("evenodd");
  }
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
  ctx.shadowColor = "white";
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.fillStyle = "white";
}
