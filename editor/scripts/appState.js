export const appState = {
    camera: {
        x: 0,
        y: 0,
        scale: 1
    },
    canvas: {
        width: undefined,
        height: undefined },
    selectedColors: [
        chroma("#fff"),
        chroma("#000")
    ],
    tool: "pen",
    palette: {
        title: undefined,
        colors: undefined
    },
    keysPressed: [],
    cursor: {
        pX: 0,
        pY: 0,
        x: 0,
        y: 0,
        
        leftDown: false,
        rightDown: false,
        wheelDown: false,

        inCanvas: false,
        previousInCanvas: false,
    },
    checkerboardColors: [
        chroma("#444"),
        chroma("#777")
    ],
    gridEnabled: true,
    checkerEnabled: true,
};

export function setPrimaryColor(color) {
    appState.selectedColors[0] = chroma(color);
    document.querySelector("#primaryColorPicker").value = chroma(color);
}

export function setSecondaryColor(color) {
    appState.selectedColors[1] = chroma(color);
    document.querySelector("#secondaryColorPicker").value = chroma(color);
}

export class Palette extends Array {
    constructor(title, colors) {
        super(...colors.map(c => chroma(c)));
        this.title = title;
    }
    push(color) {
        if (!(color instanceof chroma.constructor)) color = chroma(color);
        super.push(color);
        return this;
    }
}

export function setPalette(palette) {
    if (palette instanceof Palette) {
        appState.palette = palette;
    } else {
        throw new TypeError("Expected Palette instance");
    }
}