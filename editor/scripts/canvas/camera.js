import { appState } from "../appState.js";
import { drawingCanvas } from "./setup.js";
import { updateBackground } from "./setup.js";
import { bufferDrawingCanvas } from "./setup.js";

export function setCameraPosition(x, y, relative = false) {
  x = Math.floor(x);
  y = Math.floor(y);
  appState.camera.x = relative ? appState.camera.x + x : x;
  appState.camera.y = relative ? appState.camera.y + y : y;

  drawingCanvas.style.left = `${appState.camera.x}px`;
  drawingCanvas.style.top = `${appState.camera.y}px`;
  updateBackground();
}

export function setCameraScale(scale, cX, cY) {
  const pos1 = [drawingCanvas.offsetLeft, drawingCanvas.offsetTop];
  const pos2 = [pos1[0] + drawingCanvas.offsetWidth, pos1[1] + drawingCanvas.offsetHeight];

  [pos1, pos2].forEach(position => {
    position.forEach((_, index) => {
      position[index] -= [cX, cY][index];
      position[index] *= scale;
      position[index] += [cX, cY][index];
    });
  });

  setCameraPosition(...pos1);
  drawingCanvas.style.width = `${pos2[0] - pos1[0]}px`;
  drawingCanvas.style.height = `${pos2[1] - pos1[1]}px`;
  updateBackground();
}

export function setCanvasDimensions(width, height) {
  appState.canvas.width = width;
  appState.canvas.height = height;

  drawingCanvas.width = width;
  drawingCanvas.height = height;

  bufferDrawingCanvas.width = width;
  bufferDrawingCanvas.height = height;

  backgroundCanvas.width = width;
  backgroundCanvas.height = height;
}