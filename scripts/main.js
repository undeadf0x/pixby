import Color from "./libraries/color.js"
import { setPixel, getPixel } from "./draw.js";

const drawingCanvas = document.querySelector("#drawingCanvas");
const dCtx = drawingCanvas.getContext("2d");

function overlay(color1,alpha1, color2,alpha2) {
    let result = [];
    for (let i=0; i < 4; i++) {
        result[i] = (color1.srgb[i] * alpha1) + (color2.srgb[i] * alpha2 * (1 - alpha1))
    }
    return new Color("srgb", result, Math.min(1,alpha1 + alpha2))
}

function setUp() {
    drawingCanvas.width = 16;
    drawingCanvas.height = 16;
    let red = new Color("#f00a");
    setPixel(dCtx, 5,5, red)
    getPixel(dCtx, 5,5)
}

setUp();