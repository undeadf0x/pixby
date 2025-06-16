export function refreshLoop() {
    const times = [];
    let fps;
  
    function loop() {
      const now = performance.now();
      while (times.length && times[0] <= now - 1000) times.shift();
      times.push(now);
      fps = times.length;
      document.querySelector("#output").innerText = `FPS: ${fps}`;
      requestAnimationFrame(loop);
    }
  
    loop();
  }
  