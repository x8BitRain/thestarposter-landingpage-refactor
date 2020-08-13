import { HEART_SCALING_FACTOR } from "./getOutOfScreenShadowOffsetX";

const drawHeart = (ctx, width) => {
  const p = new Path2D(
    "M20 134a70 70 0 010-99c27-27 71-27 98 0l10 10 10-10c27-27 71-27 98 0 27 28 27 72 0 99L128 242 20 134z"
  );
  ctx.beginPath();
  ctx.scale((3.96 / 1024) * width, (4.1 / 1024) * width);
  ctx.translate(1, 6);
  ctx.clip(p);
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  // we scale everything that we draw afterwards a bit bigger
  ctx.translate(width / 2, width / 2);
  ctx.scale(HEART_SCALING_FACTOR, HEART_SCALING_FACTOR);
  ctx.translate(-width / 2, -width / 2);
};

export default drawHeart;
