import { data, objects, operations, types, wireObjects } from "../index.js";
import { config } from "./config.js";
import { maxObjects, obj_params, operationsValues, typesValues } from "./constants.js";
import { folders, gui } from "./gui.js";
import { material, wireframeScene } from "./init-raymarching.js";
import { Cube, Cylinder, Sphere, Torus } from "./objects.js";
import * as THREE from '/build/three.module.js'


export function createAddButton() {
    let addObjectButton = document.createElement('div');
    addObjectButton.classList.add("add-object-btn");
    addObjectButton.textContent = "Добавить объект";
    addObjectButton.addEventListener("click", addObject);
    document.body.appendChild(addObjectButton);
}

export function createDeleteButton() {
    let deleteButton = document.createElement('div');
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Удалить последний объект";
    deleteButton.addEventListener("click", deleteObject);
    document.body.appendChild(deleteButton);
}

let cubeAmount = 1;
let cylinderAmount = 0;
let sphereAmount = 0;
let torusAmount = 0;

function addObject() {
    if (objects.length == maxObjects) {
        alert("Создано максимальное число объектов!");
        return
    }
    let type = prompt("Введите номер создаваемого объекта: \
        \n 1 - Куб \n 2 - Цилиндр \n 3 - Сфера \n 4 - Тор", "2");
    if (!(["1", "2", "3", "4"].includes(type))) {
        alert("Такого варианта нет");
        return;
    }
    let operation = prompt("Введите номер операции для данного объекта:\
        \n 1 - Пересечение с итоговым объектом \
        \n 2 - Объединение с итоговым объектом \
        \n 3 - Вычитание из итогового объекта \
        \n 4 - Вычитание итогового объекта", "1");
    if (!(["1", "2", "3", "4"].includes(operation))) {
        alert("Такого варианта нет");
        return;
    }
    switch(type) {
        case "1":
            addCube();
            break;
        case "2":
            addCylinder();
            break;
        case "3":
            addSphere();
            break;
        case "4":
            addTorus();
            break;
    }
    operations[objects.length - 2] = new Number(operation);
    if (objects.length == 2) {
        createDeleteButton();
    }
}

function addCube() {
    let name = "cube" + cubeAmount;
    cubeAmount++;
    let cube = new Cube(material, name);
    types[objects.length] = new Number(typesValues.cube);
    let wireModel = cube.get(obj_params.cube);
    wireObjects.push(wireModel);
    wireframeScene.add(wireModel);
    objects.push(cube);
    config[name] = JSON.parse(JSON.stringify(config.cube));
    config[name].delete = false;
    let cubeFolder = gui.addFolder('Куб ' + cubeAmount);
    cubeFolder.add(config[name], 'scale', 0.5, 2).name('Масштаб');
    cubeFolder.add(config[name].pos, 'PositionX', -2, 2).name('Координата X');
    cubeFolder.add(config[name].pos, 'PositionY', -2, 2).name('Координата Y');
    cubeFolder.add(config[name].pos, 'PositionZ', -2, 2).name('Координата Z');
    cubeFolder.add(config[name].rotation, 'RotationX', -Math.PI/2, Math.PI/2)
        .name('Вращение, X');
    cubeFolder.add(config[name].rotation, 'RotationY', -Math.PI/2, Math.PI/2)
        .name('Вращение, Y');
    cubeFolder.add(config[name].rotation, 'RotationZ', -Math.PI/2, Math.PI/2)
        .name('Вращение, Z');
    // cubeFolder.add(config[name], 'delete').name('Удалить');
    folders.push(cubeFolder);
}

function addCylinder() {
    let name = "cylinder" + cylinderAmount;
    cylinderAmount++;
    let cylinder = new Cylinder(material, name);
    types[objects.length] = new Number(typesValues.cylinder);
    let wireModel = cylinder.get(obj_params.cylinder);
    wireObjects.push(wireModel);
    wireframeScene.add(wireModel);
    objects.push(cylinder);
    config[name] = JSON.parse(JSON.stringify(config.cylinder));
    config[name].delete = false;
    let cylinderFolder = gui.addFolder('Цилиндр ' + cubeAmount);
    cylinderFolder.add(config[name], 'scale', 0.5, 2).name('Масштаб');
    cylinderFolder.add(config[name].pos, 'PositionX', -2, 2).name('Координата X');
    cylinderFolder.add(config[name].pos, 'PositionY', -2, 2).name('Координата Y');
    cylinderFolder.add(config[name].pos, 'PositionZ', -2, 2).name('Координата Z');
    cylinderFolder.add(config[name].rotation, 'RotationX', -Math.PI/2, Math.PI/2)
        .name('Вращение, X');
    cylinderFolder.add(config[name].rotation, 'RotationY', -Math.PI/2, Math.PI/2)
        .name('Вращение, Y');
    cylinderFolder.add(config[name].rotation, 'RotationZ', -Math.PI/2, Math.PI/2)
        .name('Вращение, Z');
    // cylinderFolder.add(config[name], 'delete').name('Удалить');
    folders.push(cylinderFolder);
}

function addSphere() {
    let name = "sphere" + sphereAmount;
    sphereAmount++;
    let sphere = new Sphere(material, name);
    types[objects.length] = new Number(typesValues.sphere);
    let wireModel =sphere.get(obj_params.sphere)
    wireframeScene.add(wireModel);
    wireObjects.push(wireModel);
    objects.push(sphere);
    config[name] = JSON.parse(JSON.stringify(config.sphere));
    config[name].delete = false;
    let sphereFolder = gui.addFolder('Cфера ' + sphereAmount);
    sphereFolder.add(config[name], 'scale', 0.5, 2).name('Масштаб');
    sphereFolder.add(config[name].pos, 'PositionX', -2, 2).name('Координата X');
    sphereFolder.add(config[name].pos, 'PositionY', -2, 2).name('Координата Y');
    sphereFolder.add(config[name].pos, 'PositionZ', -2, 2).name('Координата Z');
    // sphereFolder.add(config[name], 'delete').name('Удалить');
    folders.push(sphereFolder);
}

function addTorus() {
    let name = "torus" + torusAmount;
    torusAmount++;
    let torus = new Torus(material, name);
    types[objects.length] = new Number(typesValues.torus);
    let wireModel = torus.get(obj_params.torus)
    wireframeScene.add(wireModel);
    wireObjects.push(wireModel);
    objects.push(torus);
    config[name] = JSON.parse(JSON.stringify(config.torus));
    config[name].delete = false;
    let torusFolder = gui.addFolder('Тор ' + torusAmount);
    torusFolder.add(config[name], 'scale', 0.5, 2).name('Масштаб');
    torusFolder.add(config[name].pos, 'PositionX', -2, 2).name('Координата X');
    torusFolder.add(config[name].pos, 'PositionY', -2, 2).name('Координата Y');
    torusFolder.add(config[name].pos, 'PositionZ', -2, 2).name('Координата Z');
    torusFolder.add(config[name].rotation, 'RotationX', -Math.PI/2, Math.PI/2)
        .name('Вращение, X');
    torusFolder.add(config[name].rotation, 'RotationY', -Math.PI/2, Math.PI/2)
        .name('Вращение, Y');
    torusFolder.add(config[name].rotation, 'RotationZ', -Math.PI/2, Math.PI/2)
        .name('Вращение, Z');
    // torusFolder.add(config[name], 'delete').name('Удалить');
    folders.push(torusFolder)
}

export function deleteObject() {
    if (objects.length > 1) {
        operations[objects.length - 2] = new Number(0);
        types[objects.length - 1] = new Number(0);
        objects.pop();
        wireframeScene.remove(wireObjects.pop());
        data.fill(new THREE.Vector3(0, 0, 0));
        let folders = document.getElementsByClassName("folder");
        folders[folders.length - 1].remove();
        if (objects.length == 1) {
            let deleteBtn = document.getElementsByClassName("delete-btn")[0];
            deleteBtn.remove();
        }
    }
}
