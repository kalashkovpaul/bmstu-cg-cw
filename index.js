import { maxDatas, maxOperations, maxTypes } from "./js/constants.js";
import {initRenderer, render} from "/js/init-raymarching.js";
import * as THREE from '/build/three.module.js'

var sceneObjects = [];
export var objects = [];
export var data = new Array(maxDatas).fill(new THREE.Vector3(0, 0, 0));
export var operations = new Array(maxOperations).fill(new Number(0));
export var types = new Array(maxTypes).fill(new Number(0));
(async function startServer() {
  let resp = await fetch("./fragmentShader.fs");
  let fshader = await resp.text();
  resp = await fetch("./vertexShader.vs");
  let vshader = await resp.text();
  initRenderer(fshader, vshader);
  sceneObjects.concat(objects);
  render(sceneObjects);
})()