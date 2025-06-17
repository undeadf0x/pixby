import { appState } from "../appState.js";
import { setCameraPosition, setCanvasDimensions, setCameraScale } from "./camera.js";
import { windowCenter } from "../utils/helpers.js";
import { setPrimaryColor, setSecondaryColor, setPalette, Palette } from "../appState.js";
import { setBackgroundCheckerColors } from "../ui/ui.js";
import { setTool } from "./tools.js";

export const drawingCanvas = document.querySelector("#drawingCanvas");
export const bufferDrawingCanvas = document.createElement("canvas");
export const backgroundCanvas = document.querySelector("#backgroundCanvas");

export const drawCtx = drawingCanvas.getContext("2d");
export const bufferDrawCtx = bufferDrawingCanvas.getContext("2d");
export const bgCtx = backgroundCanvas.getContext("2d");

export const leftPanel = document.querySelector("#ui#left")
export const rightPanel = document.querySelector("#ui#right")


export const toolButtons = document.querySelector("#toolButtons").children;
for (let i = 0; i < toolButtons.length; i++) {
    let toolButton = toolButtons.item(i);
    toolButton.addEventListener("click", event => {
        setTool(toolButton.dataset.tool)
        for (let i = 0; i < toolButtons.length; i++) {
          toolButtons[i].classList.remove("active");
        }
        toolButton.classList.add("active");
    })
}

export function updateBackground() {
  backgroundCanvas.style.width = `${drawingCanvas.offsetWidth}px`;
  backgroundCanvas.style.left = `${drawingCanvas.offsetLeft}px`;
  backgroundCanvas.style.top = `${drawingCanvas.offsetTop}px`;
}

export function setup() {
  setTool(appState.tool)
  setCanvasDimensions(16, 16);
  setCameraPosition(...windowCenter().map((component) => {return component - 8}));

  setCameraScale(10, ...windowCenter());
  setPrimaryColor(appState.selectedColors[0]);
  setSecondaryColor(appState.selectedColors[1]);
  let defaultPalette = new Palette("PICO-8", ["000000", "1D2B53", "7E2553", "008751", "AB5236", "5F574F", "C2C3C7", "FFF1E8", "FF004D", "FFA300", "FFEC27", "00E436", "29ADFF", "83769C", "FF77A8", "FFCCAA"]);
  setPalette(defaultPalette);
  setBackgroundCheckerColors(...appState.checkerboardColors)
}