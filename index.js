import {initRenderer, render} from "/js/init-raymarching.js"

(async function startServer() {
  let resp = await fetch("./fragmentShader.fs");
  let fshader = await resp.text();
  resp = await fetch("./vertexShader.vs");
  let vshader = await resp.text();
  let objects = initRenderer(fshader, vshader);
  render(...objects);
})()