import { setPixel } from "../canvas/pixelUtils.js"
import { bgCtx } from "../canvas/setup.js"

export function setBackgroundCheckerColors(color1, color2) {
    for (let y = 0; y < backgroundCanvas.height; y++) {
        for (let x = 0; x < backgroundCanvas.width; x++) {
            if (x%2 == y%2) {
                setPixel(bgCtx, x,y, color1)
            } else {
                setPixel(bgCtx, x,y, color2)
            }
        }
    }
}