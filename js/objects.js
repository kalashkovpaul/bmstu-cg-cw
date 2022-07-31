import * as THREE from '/build/three.module.js'

export class Cube {
    constructor(material) {
        this.material = material;
    }

    get(params) {
        this.geom = new THREE.BoxGeometry(
            params.width,
            params.height,
            params.depth);
            if (this.cube == null) {
                this.cube = new THREE.Mesh(this.geom, this.material);
                this.cube.rotation.order = "ZYX";
            }
            return this.cube;
    }
    configure(config) {
        this.cube.position.set(config.pos.PositionX, config.pos.PositionY, config.pos.PositionZ);
        this.cube.rotation.set(config.rotation.RotationX, config.rotation.RotationY, config.rotation.RotationZ);
        this.cube.scale.set(config.scale, config.scale, config.scale);
        return;
    }
}

export class Sphere {
    constructor(material) {
        this.material = material;
    }

    get(params) {
        this.geom =  new THREE.SphereGeometry(
            params.radius,
            params.widthSegments,
            params.heightSegements);


            if (this.sphere == null) {
                this.sphere = new THREE.Mesh(this.geom, this.material);
                this.sphere.rotation.order = "ZYX";
            }
            return this.sphere;
    }
    configure(config) {
        this.sphere.position.set(config.pos.PositionX, config.pos.PositionY, config.pos.PositionZ);
        this.sphere.scale.set(config.scale, config.scale, config.scale);
        return;

    }
}


export class Cylinder {
    constructor(material) {
        this.material = material;
    }

    get(params) {
        this.geom =  new THREE.CylinderGeometry(
            params.rTop, params.rBottom,
            params.height, params.radialSegments,
            params.heightSegments, params.openEnded);


        if (this.cylinder == null) {
            this.cylinder = new THREE.Mesh(this.geom, this.material);
            this.cylinder.rotation.order = "ZYX";
        }

        return this.cylinder;
    }
    configure(config) {
        this.cylinder.position.set(config.pos.PositionX, config.pos.PositionY, config.pos.PositionZ);
        this.cylinder.rotation.set(config.rotation.RotationX, config.rotation.RotationY, config.rotation.RotationZ);
        this.cylinder.scale.set(config.scale, config.scale, config.scale);
        return;
    }
}

export class Cone {
    constructor(material) {
        this.material = material;
    }

    get(params) {
        this.geom =  new THREE.ConeGeometry(
            params.radius, params.height, params.radialSegments,
            params.heightSegements, params.openEnd
        );


        if (this.cone == null) {
            this.cone = new THREE.Mesh(this.geom, this.material);
            this.cone.rotation.order = "ZYX";
        }

        return this.cone;
    }
    configure(config) {
        this.cone.position.set(config.pos.PositionX, config.pos.PositionY, config.pos.PositionZ);
        this.cone.rotation.set(config.rotation.RotationX, config.rotation.RotationY, config.rotation.RotationZ);
        this.cone.scale.set(config.scale, config.scale, config.scale);
        return;
    }
}

export class Torus {
    constructor(material) {
        this.material = material;
    }

    get(params) {
        this.geom =  new THREE.ConeGeometry(
            params.radius, params.tube,
            params.radialSegments, params.tubularSegments,
        );


        if (this.torus == null) {
            this.torus = new THREE.Mesh(this.geom, this.material);
            this.torus.rotation.order = "ZYX";
        }

        return this.torus;
    }
    configure(config) {
        this.torus.position.set(config.pos.PositionX, config.pos.PositionY, config.pos.PositionZ);
        this.torus.rotation.set(config.rotation.RotationX, config.rotation.RotationY, config.rotation.RotationZ);
        this.torus.scale.set(config.scale, config.scale, config.scale);
        return;
    }
}
