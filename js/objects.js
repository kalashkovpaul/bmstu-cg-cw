import * as THREE from '/build/three.module.js'

export class Cube {
    constructor(material, name) {
        this.material = material;
        this.name = name;
    }

    get(params) {
        this.geom = new THREE.BoxGeometry(
            params.width,
            params.height,
            params.depth);
            if (this.object == null) {
                this.object = new THREE.Mesh(this.geom, this.material);
                this.object.rotation.order = "ZYX";
            }
            return this.object;
    }
    configure(globConfig) {
        let config = globConfig[this.name];
        this.object.position.set(config.pos.PositionX, config.pos.PositionY, config.pos.PositionZ);
        this.object.rotation.set(config.rotation.RotationX, config.rotation.RotationY, config.rotation.RotationZ);
        this.object.scale.set(config.scale, config.scale, config.scale);
        return;
    }
}

export class Sphere {
    constructor(material, name) {
        this.material = material;
        this.name = name;
    }

    get(params) {
        this.geom =  new THREE.SphereGeometry(
            params.radius,
            params.widthSegments,
            params.heightSegements);


            if (this.object == null) {
                this.object = new THREE.Mesh(this.geom, this.material);
                this.object.rotation.order = "ZYX";
            }
            return this.object;
    }

    configure(globConfig) {
        let config = globConfig[this.name];
        this.object.position.set(config.pos.PositionX, config.pos.PositionY, config.pos.PositionZ);
        this.object.scale.set(config.scale, config.scale, config.scale);
        this.object.rotation.set(config.rotation.RotationX, config.rotation.RotationY, config.rotation.RotationZ);
        return;

    }
}


export class Cylinder {
    constructor(material, name) {
        this.material = material;
        this.name = name;
    }

    get(params) {
        this.geom =  new THREE.CylinderGeometry(
            params.rTop, params.rBottom,
            params.height, params.radialSegments,
            params.heightSegments, params.openEnded);


        if (this.object == null) {
            this.object = new THREE.Mesh(this.geom, this.material);
            this.object.rotation.order = "ZYX";
        }

        return this.object;
    }

    configure(globConfig) {
        let config = globConfig[this.name];
        this.object.position.set(config.pos.PositionX, config.pos.PositionY, config.pos.PositionZ);
        this.object.rotation.set(config.rotation.RotationX, config.rotation.RotationY, config.rotation.RotationZ);
        this.object.scale.set(config.scale, config.scale, config.scale);
        return;
    }
}

export class Torus {
    constructor(material, name) {
        this.material = material;
        this.name = name;
    }

    get(params) {
        this.geom =  new THREE.TorusGeometry(
            params.radius, params.tube,
            params.radialSegments, params.tubularSegments,
        );


        if (this.object == null) {
            this.object = new THREE.Mesh(this.geom, this.material);
            this.object.rotation.order = "ZYX";
        }

        return this.object;
    }

    configure(globConfig) {
        let config = globConfig[this.name];
        this.object.position.set(config.pos.PositionX, config.pos.PositionY, config.pos.PositionZ);
        this.object.rotation.set(config.rotation.RotationX, config.rotation.RotationY, config.rotation.RotationZ);
        this.object.scale.set(config.scale, config.scale, config.scale);
        return;
    }
}
