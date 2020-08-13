import { ICartesianStar } from "@/provider/starsProvider";
import { getOutOfScreenShadowOffsetX } from "./getOutOfScreenShadowOffsetX";
import { Shapes } from "@/posterTypes";

export default function drawStars(
  ctx: CanvasRenderingContext2D,
  stars: ICartesianStar[],
  width: number,
  shape: Shapes
) {
  ctx.beginPath();
  ctx.shadowBlur = 0;

  const starbase = 10; // size in pixels
  const linearSizer = mag => (starbase * (7.5 - mag)) / 16;
  for (const star of stars) {
    const scaledStar = {
      x: star.x * width,
      y: star.y * width,
      size: (linearSizer(star.magnitude) * width) / 1024
    };
    ctx.moveTo(scaledStar.x, scaledStar.y);
    ctx.arc(scaledStar.x, scaledStar.y, scaledStar.size, 0, Math.PI * 2);
  }
  ctx.fill();

  // draw shadow blur
  ctx.shadowBlur = (5 / 1024) * width;
  ctx.shadowOffsetX = getOutOfScreenShadowOffsetX(width, shape);
  const normalizerStrength = 0.33;
  for (const star of stars) {
    const scaledStar = {
      x: star.x * width,
      y: star.y * width,
      size:
        (linearSizer(
          3 * normalizerStrength + star.magnitude * (1 - normalizerStrength)
        ) *
          width) /
        1024
    };
    ctx.moveTo(scaledStar.x - width, scaledStar.y);
    ctx.arc(
      scaledStar.x - width,
      scaledStar.y,
      scaledStar.size,
      0,
      Math.PI * 2
    );
  }
  ctx.fill();
  ctx.shadowBlur = 500;
}
