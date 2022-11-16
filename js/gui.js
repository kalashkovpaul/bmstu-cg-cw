export let gui;
export let folders = [];

export function initGui(config) {
    gui = new dat.GUI({name: 'Tralala'});
    gui.width = 415;
    let viewFolder = gui.addFolder('Вид');
    viewFolder.add(config, 'wireframe').name('Проволочный вид');
    viewFolder.add(config, 'colored').name('Цветой вид');
    // viewFolder.add(config, 'internalEdge').name('Закраска рёбер');
    // viewFolder.add(config, 'outline').name('Outline');
    let cubeFolder = gui.addFolder('Куб 1');
    cubeFolder.add(config.cube, 'scale', 0.5, 2).name('Масштаб');
    cubeFolder.add(config.cube.pos, 'PositionX', -2, 2).name('Координата X');
    cubeFolder.add(config.cube.pos, 'PositionY', -2, 2).name('Координата Y');
    cubeFolder.add(config.cube.pos, 'PositionZ', -2, 2).name('Координата Z');
    cubeFolder.add(config.cube.rotation, 'RotationX', -Math.PI/2, Math.PI/2)
        .name('Вращение, X');
    cubeFolder.add(config.cube.rotation, 'RotationY', -Math.PI/2, Math.PI/2)
        .name('Вращение, Y');
    cubeFolder.add(config.cube.rotation, 'RotationZ', -Math.PI/2, Math.PI/2)
        .name('Вращение, Z');
    folders.push(cubeFolder);
    // let cylinderFolder = gui.addFolder('Cylinder');
    // cylinderFolder.add(config.cylinder, 'scale', 0.5, 2);
    // cylinderFolder.add(config.cylinder.pos, 'PositionX', -2, 2);
    // cylinderFolder.add(config.cylinder.pos, 'PositionY', -2, 2);
    // cylinderFolder.add(config.cylinder.pos, 'PositionZ', -2, 2);
    // cylinderFolder.add(config.cylinder.rotation, 'RotationX', -Math.PI/2, Math.PI/2);
    // cylinderFolder.add(config.cylinder.rotation, 'RotationY', -Math.PI/2, Math.PI/2);
    // cylinderFolder.add(config.cylinder.rotation, 'RotationZ', -Math.PI/2, Math.PI/2);
    // let sphereFolder = gui.addFolder('Sphere');
    // sphereFolder.add(config.sphere, 'scale', 0.5, 2);
    // sphereFolder.add(config.sphere.pos, 'PositionX', -2, 2);
    // sphereFolder.add(config.sphere.pos, 'PositionY', -2, 2);
    // sphereFolder.add(config.sphere.pos, 'PositionZ', -2, 2);
    // let coneFolder = gui.addFolder('Cone');
    // coneFolder.add(config.cone, 'scale', 0.5, 2);
    // coneFolder.add(config.cone.pos, 'PositionX', -2, 2);
    // coneFolder.add(config.cone.pos, 'PositionY', -2, 2);
    // coneFolder.add(config.cone.pos, 'PositionZ', -2, 2);
    // coneFolder.add(config.cone.rotation, 'RotationX', -Math.PI/2, Math.PI/2);
    // coneFolder.add(config.cone.rotation, 'RotationY', -Math.PI/2, Math.PI/2);
    // coneFolder.add(config.cone.rotation, 'RotationZ', -Math.PI/2, Math.PI/2);
    // let torusFolder = gui.addFolder('Torus');
    // torusFolder.add(config.torus, 'scale', 0.5, 2);
    // torusFolder.add(config.torus.pos, 'PositionX', -2, 2);
    // torusFolder.add(config.torus.pos, 'PositionY', -2, 2);
    // torusFolder.add(config.torus.pos, 'PositionZ', -2, 2);
    // torusFolder.add(config.torus.rotation, 'RotationX', -Math.PI/2, Math.PI/2);
    // torusFolder.add(config.torus.rotation, 'RotationY', 0, Math.PI);
    // torusFolder.add(config.torus.rotation, 'RotationZ', -Math.PI/2, Math.PI/2);
}
