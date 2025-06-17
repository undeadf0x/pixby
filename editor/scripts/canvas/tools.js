import { appState } from "../appState.js";
import { linePoints, setPixel } from "./pixelUtils.js";
import { screenToCanvas, transferBmp, inCanvas } from "../utils/helpers.js";
import { bufferDrawingCanvas, bufferDrawCtx } from "./setup.js";

export const tools = {
    "pen": {
        cursor: "pen_cursor",
        handlers: {
            mouseDown: (event) => {/* Does nothing */},

            mouseUp: (event) => {/* Does nothing */},

            mouseMove: (event) => {
                if (appState.cursor.leftDown || appState.cursor.rightDown) {
                    for (let point of linePoints(...screenToCanvas(appState.cursor.pX, appState.cursor.pY), ...screenToCanvas(event.x,event.y))) {
                        setPixel(bufferDrawCtx, point.x,point.y, appState.selectedColors[appState.cursor.leftDown === true ? 0 : 1]);
                    }
                    transferBmp(bufferDrawingCanvas, drawingCanvas)
                }
            }
        }
    }
}

function setTool(toolID) {
    if (tools.includes(toolID)) {
        appState.tool = toolID;
    }
}