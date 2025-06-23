import { setPixel } from "../canvas/pixelUtils.js"
import { bgCtx } from "../canvas/setup.js"

export function setBackgroundCheckerColors(color1, color2) {
    for (let y = 0; y < backgroundCanvas.height; y++) {
        for (let x = 0; x < backgroundCanvas.width; x++) {
            if (x % 2 == y % 2) {
                setPixel(bgCtx, x, y, color1)
            } else {
                setPixel(bgCtx, x, y, color2)
            }
        }
    }
}

export function drawOutline(data, x, y, w, h) {

}

export const fileMenuBar = [
    {
        name: "File",
        contents: [
            {
                name: "Save project",
                id: "save-project",
                onClick: openSaveProjectMenu
            }, {
                name: "Upload",
                id: "upload",
                onClick: openUploadMenu
            }, {
                name: "Export",
                id: "export",
                onClick: openExportMenu
            }
        ]
    }, {
        name: "Edit",
        contents: [
            {
                name: "Undo",
                id: "undo",
                disabled: true
                // onClick: historyStack.undo
            }, {
                name: "Redo",
                id: "redo",
                // onClick: historyStack.redo
                disabled: true
            }
        ]
    }
]

function openSaveProjectMenu() {
    createPopup();
}
function openUploadMenu() {
    alert("Upload menu");
}
function openExportMenu() {
    alert("Export menu");
}

export function createPopup(w, h, allowClose) {
    let popup = document.createElement("dialog");
    popup.classList.add("popup");
    document.body.append(popup);
    popup.showModal();
}

export function setupFileMenuBar() {
    let menuBar = document.querySelector("#menuBar")
    for (let item of fileMenuBar) {
        let itemElement = document.createElement("div");
        itemElement.innerText = item.name;
        itemElement.classList.add("menuItem");

        itemElement.addEventListener("click", e => {
            if (!e.target.classList.contains("menuItem")) return;
            if (document.querySelector(".menuItem.open") != null) {
                document.querySelectorAll(".menuItem.open").forEach(el => {
                    if (el != e.currentTarget) el.classList.remove("open")
                })
            }
            e.currentTarget.classList.toggle("open");
        })
        itemElement.addEventListener("mouseenter", e => {
            if (Boolean(document.querySelector(".menuItem.open"))) {
                document.querySelectorAll(".menuItem.open").forEach(el => {
                    if (el != e.currentTarget) el.classList.remove("open")
                })
                e.currentTarget.classList.toggle("open");
            }
        })

        let itemContentsElement = document.createElement("div");
        itemContentsElement.classList.add("itemContents");

        itemElement.append(itemContentsElement)

        for (let subItem of item.contents) {
            let subItemElement = document.createElement("div");
            subItemElement.classList.add("subMenuItem");
            subItemElement.innerText = subItem.name;
            subItemElement.addEventListener("click", () => {
                subItem.onClick();
                if (document.querySelector(".menuItem.open") != null) {
                    document.querySelectorAll(".menuItem.open").forEach(el => {
                        el.classList.remove("open");
                    })
                }
            })
            if (subItem.disabled) subItemElement.setAttribute("disabled", true)
            itemContentsElement.append(subItemElement);
        }
        menuBar.append(itemElement);
    }
    window.addEventListener("click", (e) => {
        if (!Boolean(e.target.closest(".menuItem"))) {
            if (document.querySelector(".menuItem.open") != null) {
                document.querySelectorAll(".menuItem.open").forEach(el => {
                    el.classList.remove("open");
                })
            }
        }
    })
}