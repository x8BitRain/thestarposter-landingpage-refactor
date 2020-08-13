import { Shapes } from "@/posterTypes";
/*
    We use the shadow offset to draw actual polynoms offscreen and only draw the shadow on screen. That works quite well, however the shadowOffsetX variable does not consider the scale. The heart is scaled, therefore we need to mutate the heart by the scaling factor
*/
export function getOutOfScreenShadowOffsetX(
  width: number,
  shape: Shapes
): number {
  if (shape === Shapes.HEART) {
    return width * HEART_SCALING_FACTOR;
  }
  return width;
}

export const HEART_SCALING_FACTOR = 1.1;
