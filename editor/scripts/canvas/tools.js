import { appState } from "../appState.js";
import { linePoints, setPixel } from "./pixelUtils.js";
import { screenToCanvas, transferBmp, inCanvas } from "../utils/helpers.js";
import { bufferDrawingCanvas, bufferDrawCtx, drawingCanvas, toolButtons, drawCtx } from "./setup.js";

export const tools = {
    "pen": {
        cursor: "pen",
        offset: [0,0],
        handlers: {
            mouseDown: (event) => {
                setPixel(drawCtx, ...screenToCanvas(appState.cursor.x, appState.cursor.y), appState.selectedColors[appState.cursor.leftDown === true ? 0 : 1]);
            },

            mouseUp: (event) => {/* Does nothing */},

            mouseMove: (event) => {
                if (appState.cursor.leftDown || appState.cursor.rightDown) {
                    for (let point of linePoints(...screenToCanvas(appState.cursor.pX, appState.cursor.pY), ...screenToCanvas(event.x,event.y))) {
                        setPixel(bufferDrawCtx, point.x,point.y, appState.selectedColors[appState.cursor.leftDown === true ? 0 : 1]);
                    }
                    drawCtx.putImageData(bufferDrawCtx.getImageData(0,0, appState.canvas.width, appState.canvas.height), 0,0);
                }
            }
        }
    },
    "eraser": {
        cursor: "eraser",
        offset: [0,16],
        handlers: {
            mouseDown: (event) => {
                setPixel(drawCtx, ...screenToCanvas(appState.cursor.x, appState.cursor.y), chroma("#fff"), 0);
            },

            mouseUp: (event) => {/* Does nothing */},

            mouseMove: (event) => {
                if (appState.cursor.leftDown || appState.cursor.rightDown) {
                    for (let point of linePoints(...screenToCanvas(appState.cursor.pX, appState.cursor.pY), ...screenToCanvas(event.x,event.y))) {
                        setPixel(bufferDrawCtx, point.x,point.y, appState.selectedColors[appState.cursor.leftDown === true ? 0 : 1], 0);
                    }
                    drawCtx.putImageData(bufferDrawCtx.getImageData(0,0, appState.canvas.width, appState.canvas.height), 0,0);
                }
            }
        }
    },
    "box-select": {
        cursor: "crosshair",
        offset: [0,16],
        handlers: {
            mouseDown: (event) => {
                setPixel(drawCtx, event.x, event.y, chroma("#fff"), 0);
            },

            mouseUp: (event) => {/* Does nothing */},

            mouseMove: (event) => {
                if (appState.cursor.leftDown || appState.cursor.rightDown) {
                    for (let point of linePoints(...screenToCanvas(appState.cursor.pX, appState.cursor.pY), ...screenToCanvas(event.x,event.y))) {
                        setPixel(bufferDrawCtx, point.x,point.y, appState.selectedColors[appState.cursor.leftDown === true ? 0 : 1], 0);
                    }
                    drawCtx.putImageData(bufferDrawCtx.getImageData(0,0, appState.canvas.width, appState.canvas.height), 0,0);
                }
            }
        }
    }
}

export function setTool(toolID) {
    if (toolID in tools) {
        appState.tool = toolID;
        drawingCanvas.style.cursor = `url("../assets/${toolID}_cursor.png") ${tools[toolID].offset[0]} ${tools[toolID].offset[1]}, auto`
    }
}