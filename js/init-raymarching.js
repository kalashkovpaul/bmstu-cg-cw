import {initGui} from '/js/gui.js'
import {config, getRaymarchingMaterial, updateRaymarchingMaterial} from '/js/config.js'
import {Cube, Sphere, Cylinder, Torus} from '/js/objects.js'
import {obj_params} from '/js/constants.js'
import { objects, operations, types } from '../index.js';
import { operationsValues, typesValues } from './constants.js';



let renderer, wireframeScene, controls;
let raymarchingMaterial, raymarchingScreen;
let raymarchingScene;
let camera;

// var stats = new Stats();
// stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
// document.body.appendChild( stats.dom );

export function initRenderer(fshader, vshader) {
  renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
  renderer.autoClearColor = false;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild( renderer.domElement );

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  camera.position.z = 5;

  controls = new THREE.OrbitControls( camera, renderer.domElement );

  initGui(config);
  let objects = initObjects();
  initRaymarching(fshader, vshader);

  return objects;

}
function initObjects() {
  wireframeScene = new THREE.Scene();

  var color = new THREE.Color(1, 1, 1);
  color.alpha = 0.5;
  var material = new THREE.MeshBasicMaterial({color: color, wireframe:true, transparent:true, opacity:0.2});

  let cube = new Cube(material);
  types[0] = new Number(typesValues.cube);
  wireframeScene.add(cube.get(obj_params.cube));
  objects.push(cube);

  let cylinder = new Cylinder(material);
  types[1] = new Number(typesValues.cylinder);
  wireframeScene.add(cylinder.get(obj_params.cylinder));
  objects.push(cylinder);

  let sphere = new Sphere(material);
  types[2] = new Number(typesValues.sphere);
  wireframeScene.add(sphere.get(obj_params.sphere));
  objects.push(sphere);

  let torus = new Torus(material);
  types[3] = new Number(typesValues.torus);
  wireframeScene.add(torus.get(obj_params.torus));
  objects.push(torus);

  operations[0] = new Number(operationsValues.union);
  operations[1] = new Number(operationsValues.union);
  operations[2] = new Number(operationsValues.union);
}

function initRaymarching(fshader, vshader) {
  let geometry = new THREE.PlaneBufferGeometry(2.0, 2.0);
  // Создаём свои шейдеры и прокидываем туда параметры

  raymarchingMaterial = getRaymarchingMaterial(camera, fshader, vshader)
  raymarchingScreen = new THREE.Mesh(geometry, raymarchingMaterial);
  raymarchingScreen.frustumCulled = false;

  raymarchingScene = new THREE.Scene();
  raymarchingScene.add(raymarchingScreen);
  // raymarchingMaterial = updateRaymarchingMaterial(raymarchingMaterial, config, objects);
}

export function render() {
  // stats.begin();
  requestAnimationFrame( () => {render(objects)} );

  controls.update();

  objects.forEach(element => {
    element.configure(config);
  });

  raymarchingMaterial = updateRaymarchingMaterial(raymarchingMaterial, config, objects);

  renderer.clear();
  renderer.render(raymarchingScene, camera);
  if (config.wireframe) {
    renderer.render(wireframeScene, camera);
  }
  // stats.end();
};
