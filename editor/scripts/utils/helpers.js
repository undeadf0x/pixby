import { drawingCanvas } from "../canvas/setup.js";

export function inCanvas(x, y) {
  return (
    drawingCanvas.offsetLeft < x &&
    x < drawingCanvas.offsetLeft + drawingCanvas.offsetWidth &&
    drawingCanvas.offsetTop < y &&
    y < drawingCanvas.offsetTop + drawingCanvas.offsetHeight
  );
}

export function screenToCanvas(x, y) {
  const dx = drawingCanvas.offsetLeft;
  const dy = drawingCanvas.offsetTop;
  const w = drawingCanvas.offsetWidth;
  const h = drawingCanvas.offsetHeight;
  return [
    Math.floor(((x - dx) / w) * drawingCanvas.width),
    Math.floor(((y - dy) / h) * drawingCanvas.height),
  ];
}

export function windowCenter() {
  return [window.innerWidth / 2, window.innerHeight / 2];
}

export function range(start, end) {
  const result = [];
  if (start > end) {
    for (let i = start; i >= end; i--) result.push(i);
  } else {
    for (let i = start; i <= end; i++) result.push(i);
  }
  return result;
}

export function transferBmp(source, dest) {
    dest.getContext("2d").drawImage(source, 0, 0);
  }
  