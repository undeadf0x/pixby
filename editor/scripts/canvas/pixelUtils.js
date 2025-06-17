import { drawCtx } from "./setup.js";

export function setPixel(ctx, x, y, color, alpha = 255) {
  if (ctx.constructor === CanvasRenderingContext2D) {
    const arr = new Uint8ClampedArray([...color.rgb(), alpha]);
    const data = new ImageData(arr, 1);
    ctx.putImageData(data, x, y);
  }
}

export function getPixel(ctx, x, y) {
  const data = ctx.getImageData(x, y, 1, 1).data;
  return "#" + Array.from(data.slice(0, 3)).map(n => n.toString(16).padStart(2, "0")).join("");
}

export function linePoints(x0, y0, x1, y1) {
  const points = [];
  const dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
  const sx = Math.sign(x1 - x0), sy = Math.sign(y1 - y0);
  let err = dx - dy;

  while (true) {
    points.push({ x: x0, y: y0 });
    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * err;
    if (e2 > -dy) { err -= dy; x0 += sx; }
    if (e2 < dx) { err += dx; y0 += sy; }
  }
  return points;
}
