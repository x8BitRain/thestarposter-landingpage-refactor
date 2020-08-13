import { getCelestial, ICelestial } from "@/math";
import drawStars from "./drawStars";
import drawConstellations from "./drawConstellations";
import drawMilkyWay from "./drawMilkyWay";
import drawGraticule from "./drawGraticule";
import drawHeart from "./drawHeart";
import { IColor, Shapes } from "../../posterTypes";

export default function drawCelestial(
  ctx: CanvasRenderingContext2D,
  celestial: ICelestial,
  width: number,
  style: IColor,
  useShape: Shapes,
  showConstellations: boolean,
  showMilkyWay: boolean,
  showGraticule: boolean
): void {
  const { stars, constellations, milkyWay, graticule } = celestial;

  ctx.restore();
  ctx.clearRect(0, 0, width, width);
  ctx.save();
  if (useShape === Shapes.HEART) {
    drawHeart(ctx, width);
  } else {
    ctx.beginPath();
    ctx.arc(width / 2, width / 2, width / 2, 0, Math.PI * 2);
    ctx.clip();
  }
  ctx.fillStyle = style.mapColor;
  ctx.fillRect(0, 0, width, width);
  ctx.fillStyle = style.starColor;
  ctx.shadowColor = style.milkywayColor;

  drawStars(ctx, stars, width, useShape);

  if (showConstellations) {
    drawConstellations(ctx, constellations, width, style.starColor);
  }

  if (showMilkyWay) {
    drawMilkyWay(
      ctx,
      milkyWay,
      width,
      style.milkywayColor,
      style.milkywayOpacity,
      useShape
    );
  }

  if (showGraticule) {
    drawGraticule(style.starColor, ctx, graticule, width);
  }
}
