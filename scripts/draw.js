import Color from "./libraries/color.js";

function alphaBlend(foreground, background) {
    
}

export function getPixel(context, x,y) {
    let pixel = context.getImageData(x,y,1,1).data;
    let color = new Color("srgb", pixel);
    return color;
}

export function setPixel(context, x,y, color) {
    let dataArray;
    let pixel;
    switch (color.alpha) {
        case 0:
            // The pixel we're trying to set is transparent, so we do nothing
            return;
        case 1:
            // No need to calculate any transparency stuff
            dataArray = new Uint8ClampedArray([...color.srgb.map((value) => value * 255), color.alpha * 255]);
            break;
        default:
            // Transparency not yet supported
            dataArray = new Uint8ClampedArray([...color.srgb.map((value) => value * 255), color.alpha * 255]);
            break;
    }
    pixel = new ImageData(dataArray, 1);
    context.putImageData(pixel, x,y);
}