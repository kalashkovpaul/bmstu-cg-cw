
export var obj_params= {
    'cube': {
        color: (1, 1, 1),
        width: 2,
        height: 2,
        depth: 2,
    },
    'cylinder': {
        color: (1, 1, 1),
        rTop: 0.5,
        rBottom: 0.5,
        height: 4,
        radialSegments: 16,
        heightSegments: 1,
        openEnded: true,
    },
    'sphere': {
        radius: 1,
        widthSegments: 16,
        heightSegements: 8,
    },
    'cone': {
        color: (1, 1, 1),
        radius: 1,
        height: 1,
        radialSegments: 16,
        heightSegments: 1,
        openEnded: true,
    },
    'torus': {
        color: (1, 1, 1),
        radius: 1.0,
        tube: 0.25,
        radialSegments: 16,
        tubularSegments: 100,
    },
};

export const maxDatas = 12;
export const maxTypes = 4;
export const maxOperations = 3;

export const typesValues = {
    cube: 1,
    cylinder: 2,
    sphere: 3,
    torus: 4
};

export const operationsValues = {
    intersect: 1,
    union: 2,
    diff: 3,
    diffFrom: 4
};
