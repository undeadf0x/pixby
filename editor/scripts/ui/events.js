import { appState } from "../appState.js";
import { tools } from "../canvas/tools.js";
import { setPrimaryColor, setSecondaryColor } from "../appState.js";
import { setCameraPosition, setCameraScale } from "../canvas/camera.js";
import { windowCenter, inCanvas } from "../utils/helpers.js";
import { drawingCanvas, toolButtons } from "../canvas/setup.js";

function handlePointerMove(e) {
    [appState.cursor.pX,appState.cursor.pY] = [appState.cursor.x,appState.cursor.y];
    [appState.cursor.x,appState.cursor.y] = [e.x,e.y];
    if (appState.cursor.wheelDown) {
        setCameraPosition(appState.cursor.x - appState.cursor.pX, appState.cursor.y - appState.cursor.pY, true);
        return;
    }
    tools[appState.tool].handlers.mouseMove(e);
}

function handlePointerDown() {appState.cursor.leftDown = true};
function handlePointerUp() {appState.cursor.leftDown = false};

function handleWheel(e) {
    setCameraScale(1 + -Math.sign(e.deltaY)*.1, appState.cursor.x,appState.cursor.y);
}

function handleMouseDown(e) {
    appState.cursor.leftDown = e.button === 0;
    appState.cursor.wheelDown = e.button === 1;
    appState.cursor.rightDown = e.button === 2;

    tools[appState.tool].handlers.mouseDown(e);
    
    if (appState.cursor.wheelDown) {
        drawingCanvas.style.cursor = `url("../assets/cursor_movement.png"), auto`;
    }
    
    if (inCanvas(e.x, e.y)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    };
}

function handleMouseUp(e) {
    if (e.button === 0) appState.cursor.leftDown = false;
    if (e.button === 1) appState.cursor.wheelDown = false;
    if (e.button === 2) appState.cursor.rightDown = false;
    if (!appState.cursor.wheelDown) {
        drawingCanvas.style.cursor = `url("../assets/cursor_${tools[appState.tool].cursor}.png") ${tools[appState.tool].offset[0]} ${tools[appState.tool].offset[1]}, auto`;
    }
    tools[appState.tool].handlers.mouseUp(e);
}

function handleKeyDown(e) {
    if (appState.keysPressed.includes(e.key)) appState.keysPressed.push(e.key)
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

function handleKeyUp(e) {
    if (appState.keysPressed.includes(e.key)) appState.keysPressed.splice(appState.keysPressed.indexOf(e.key), 1)
}

function handleContextMenu(e) {
    if (inCanvas(e.x,e.y)) {
        e.preventDefault();
    }
}

window.addEventListener("pointermove", handlePointerMove);
window.addEventListener("pointerdown", handlePointerDown);
window.addEventListener("pointerup", handlePointerUp);

window.addEventListener("mousedown", handleMouseDown);
window.addEventListener("mouseup", handleMouseUp);

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);
window.addEventListener("wheel", handleWheel);

window.addEventListener("contextmenu", handleContextMenu);

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