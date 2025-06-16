import { setup } from "./canvas/setup.js";
import { refreshLoop } from "./ui/fps.js";
import "./ui/events.js"; // handles bindings inside
refreshLoop();
setup();
