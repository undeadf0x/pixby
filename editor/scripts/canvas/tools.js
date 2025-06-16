import { appState } from "../appState.js";
import { linePoints, setPixel } from "./pixelUtils.js";
import { screenToCanvas, transferBmp } from "../utils/helpers.js";
import { bufferDrawingCanvas, bufferDrawCtx } from "./setup.js";

export const tools = {
    "pen": {
        handlers: {
            pointerDown: (event) => {/* Does nothing */},
            
            pointerUp: (event) => {/* Does nothing */},

            pointerMove: (event) => {
                if (appState.cursor.leftDown) {
                    for (let point of linePoints(...screenToCanvas(appState.cursor.pX, appState.cursor.pY), ...screenToCanvas(event.x,event.y))) {
                        setPixel(bufferDrawCtx, point.x,point.y, appState.selectedColors[0]);
                    }
                    transferBmp(bufferDrawingCanvas, drawingCanvas)
                }
            }
        }
    }
}