import { appState } from "../appState.js";
import { tools } from "../canvas/tools.js";
import { setPrimaryColor, setSecondaryColor } from "../appState.js";
import { setCameraPosition, setCameraScale } from "../canvas/camera.js";

function handlePointerMove(e) {
    [appState.cursor.pX,appState.cursor.pY] = [appState.cursor.x,appState.cursor.y];
    [appState.cursor.x,appState.cursor.y] = [e.x,e.y];
    if (appState.cursor.wheelDown) {
        setCameraPosition(appState.cursor.x - appState.cursor.pX, appState.cursor.y - appState.cursor.pY, true);
        return;
    }
    
    tools[appState.tool].handlers.pointerMove(e);
}

function handlePointerDown() {appState.cursor.leftDown = true};
function handlePointerUp() {appState.cursor.leftDown = false};

function handleKeyDown(e) {
    switch (e.key) {
        case "=":
            setCameraScale(1.1, appState.cursor.x, appState.cursor.y, false);
            break;
        case "-":
            setCameraScale(.9, ...windowCenter(), true);
            break;
        case "x":
            let tempColors = appState.selectedColors.slice(); // Slicing to create a shallow copy of the array, otherwise they sync up
            setPrimaryColor(tempColors[1]);
            setSecondaryColor(tempColors[0]);
    }
}

function handleWheel(e) {
    setCameraScale(1 + -Math.sign(e.deltaY)*.1, appState.cursor.x,appState.cursor.y);
}

function handleMouseDown(e) {
    if (e.button === 1) appState.cursor.wheelDown = true;
}

function handleMouseUp(e) {
    if (e.button === 1) appState.cursor.wheelDown = false;
}

window.addEventListener("pointermove", handlePointerMove);
window.addEventListener("pointerdown", handlePointerDown);
window.addEventListener("pointerup", handlePointerUp);

window.addEventListener("mousedown", handleMouseDown);
window.addEventListener("mouseup", handleMouseUp);

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("wheel", handleWheel);

function handleColorPickerInputEvent(e) {
    switch(e.currentTarget.id) {
        case "primaryColorPicker":
            setPrimaryColor(e.target.value);
            break;
        case "secondaryColorPicker":
            setSecondaryColor(e.target.value)
            break;
    }
}

[primaryColorPicker, secondaryColorPicker].forEach(picker => picker.addEventListener("change", handleColorPickerInputEvent));