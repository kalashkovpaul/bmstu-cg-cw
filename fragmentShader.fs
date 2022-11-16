precision highp float;

uniform vec2 resolution;

uniform mat4 viewMatrix;
uniform vec3 cameraPosition;

uniform mat4 cameraWorldMatrix;
uniform mat4 cameraProjectionMatrixInverse;

uniform bool colored;
uniform bool internalEdge;
uniform bool outline;

// uniform vec3 spherePosition;
// uniform vec3 sphereRotation;
// uniform float sphereScale;
// uniform vec3 cubePosition;
// uniform vec3 cubeRotation;
// uniform float cubeScale;
// uniform vec3 cylinderPosition;
// uniform vec3 cylinderRotation;
// uniform float cylinderScale;
// uniform vec3 conePosition;
// uniform vec3 coneRotation;
// uniform float coneScale;
// uniform vec3 torusPosition;
// uniform vec3 torusRotation;
// uniform float torusScale;

const int maxData = 12;
uniform vec3 data[maxData];
const int maxTypes = 4;
uniform int types[maxTypes];
const int maxOperation = 3;
uniform int operations[maxOperation];

uniform vec3 va[3];

const float PI = 3.14159265359;
const float EPS = 0.001;
const float OFFSET = EPS * 100.0;
const vec3 light1Dir = normalize(vec3(0.5, 1, 0.8));
const vec3 light2Dir = -light1Dir;

// CSG
float intersect(float distA, float distB) {
  return max(distA, distB);
}

float sdfUnion(float distA, float distB) {
  return min(distA, distB);
}

float difference(float distA, float distB) {
  return max(distA, -distB);
}

vec3 translate(vec3 p, vec3 v) {
  return p - v;
}

vec3 rotate(vec3 p, vec3 rad) {
  float x = rad.x;
  float y = rad.y;
  float z = rad.z;
  mat3 m = mat3(
    cos(y)*cos(z),
    sin(x)*sin(y)*cos(z) - cos(x)*sin(z),
    cos(x)*sin(y)*cos(z) + sin(x)*sin(z),

    cos(y)*sin(z),
    sin(x)*sin(y)*sin(z) + cos(x)*cos(z),
    cos(x)*sin(y)*sin(z) - sin(x)*cos(z),

    -sin(y),
    sin(x)*cos(y),
    cos(x)*cos(y)
  );
  return m * p;
}

// basic distance functions
// http://iquilezles.org/www/articles/distfunctions/distfunctions.htm
float sphereDist(vec3 p, float r) {
  return length(p) - r;
}

float boxDist(vec3 p, vec3 size) {
  vec3 d = abs(p) - size / 2.0;
  return length(max(d,0.0)) + min(max(d.x,max(d.y,d.z)),0.0);
}

float cylinderDist(vec3 p, float radius, float height) {
  vec2 d = vec2( length(p.xz)-radius, abs(p.y) - height / 2.0);
  return min(max(d.x,d.y),0.0) + length(max(d,0.0));
}

float coneDist(vec3 p, vec2 c) {
  float q = length(p.xz);
  vec2 l = vec2(q,p.y);
  return (c.x * l.x) + (c.y * l.y);
}

float torusDist(vec3 p, vec2 t) {
  vec2 q = vec2(length(p.xy)-t.x,p.z);
  return length(q)-t.y;
}

// Тут можно экспериментировать с разными композициями
float distance(vec3 p) {
  float result = 0.0;
  float current = 0.0;
  for (int i = 0; i < maxTypes; i++) {
    vec3 position = data[i*3];
    vec3 rotation = data[i*3 + 1];
    float scale = data[i*3 + 2].x;

    if (types[i] == 1) { // box
      current = boxDist(rotate(translate(p, position), rotation), vec3(scale * 2., scale * 2., scale * 2.));
    } else if (types[i] == 2) { // cylinder
      current = cylinderDist(rotate(translate(p, position), rotation), scale * 0.5, scale * 4.0);
    } else if (types[i] == 3) { //sphere
      current = sphereDist(translate(p, position), scale * 1.);
    } else if (types[i] == 4) { // torus
      current = torusDist(rotate(translate(p, position), rotation), vec2(scale * 1.0, scale * 0.25));
    } else {
      current = result;
    }
    if (i > 0 && i <= maxOperation + 1) {
      if (operations[i - 1] == 1) { // intersect
        result = intersect(result, current);
      } else if (operations[i - 1] == 2) { // union
        result = sdfUnion(result, current);
      } else if (operations[i - 1] == 3) { // diff
        result = difference(result, current);
      } else if (operations[i - 1] == 4) { // diff from
        result = difference(current, result);
      } else {
        result = current;
      }
    } else {
      result = current;
    }
  }
  return result;

  // float cube = boxDist(rotate(translate(p, cubePosition), cubeRotation), vec3(cubeScale * 2., cubeScale * 2., cubeScale * 2.));
  // return cube;
  // float cube2 = boxDist(rotate(translate(p, cubePosition+ vec3(1, 1, 1)), cubeRotation), vec3(cubeScale * 2., cubeScale * 2., cubeScale * 2.));
  // float cube3 = boxDist(rotate(translate(p, cubePosition+ vec3(2, 2, 2)), cubeRotation), vec3(cubeScale * 2., cubeScale * 2., cubeScale * 2.));
  // float cube4 = boxDist(rotate(translate(p, cubePosition+ vec3(3, 3, 3)), cubeRotation), vec3(cubeScale * 2., cubeScale * 2., cubeScale * 2.));

  // float cylinder = cylinderDist(rotate(translate(p, cylinderPosition), cylinderRotation), cylinderScale * 0.5, cylinderScale * 4.0);
  // float sphere = sphereDist(translate(p, spherePosition), sphereScale * 1. * va[0][0]);
  // float sphere = sphereDist(translate(p, spherePosition), sphereScale * 1.);
  // float sphere2 = sphereDist(translate(p, spherePosition + vec3(1, 1, 1)), sphereScale * 1.);

  // float cone = cylinderDist(rotate(translate(p, cylinderPosition), cylinderRotation), cylinderScale * 0.5, cylinderScale * 4.0);
  // float cone = coneDist(rotate(translate(p, conePosition), coneRotation), vec2(coneScale * 1.0, coneScale * 0.25)); // ????

  // float torus = torusDist(rotate(translate(p, torusPosition), torusRotation), vec2(1.0 * torusScale, 0.25 * torusScale));

  // float tmp = intersect(cube, cube2);

  // return difference(sdfUnion(cylinder, cube), difference(sphere, sphere2));
  // return sdfUnion(intersect(sdfUnion(cube, sphere), cylinder), torus);
  // return torus;
}

float sceneDist(vec3 p) {
  return distance(p);
}

vec3 hsvToRGB(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec4 sceneColor(vec3 p) {
  return vec4(hsvToRGB(vec3((p.z + p.x) / 9.0, 1.0, 1.0)), distance(p));
}

vec3 getNormal(vec3 p) {
  return normalize(vec3(
    sceneDist(p + vec3(EPS, 0.0, 0.0)) - sceneDist(p + vec3(-EPS, 0.0, 0.0)),
    sceneDist(p + vec3(0.0, EPS, 0.0)) - sceneDist(p + vec3(0.0, -EPS, 0.0)),
    sceneDist(p + vec3(0.0, 0.0, EPS)) - sceneDist(p + vec3(0.0, 0.0, -EPS))
 ));
}

float getShadow(vec3 ro, vec3 rd) {
  float h = 0.0;
  float c = 0.0;
  float r = 1.0;
  float shadowCoef = 0.5;

  for (float t = 0.0; t < 50.0; t++) {
    h = sceneDist(ro + rd * c);
    if (h < EPS) return shadowCoef;
    r = min(r, h * 16.0 / c);
    c += h;
  }
  return 1.0 - shadowCoef + r * shadowCoef;
}

vec3 getLightColor(vec3 lightDir, vec3 ray, vec3 pos, vec3 normal) {
  float diffuse = clamp(dot(lightDir, normal), 0.1, 1.0);
  float specular = pow(clamp(dot(reflect(lightDir, normal), ray), 0.0, 1.0), 10.0);
  float shadow = getShadow(pos + normal * OFFSET, lightDir);
  return (sceneColor(pos).rgb * diffuse + vec3(0.8) * specular) * max(0.5, shadow);
}

float getDistance(vec3 rayOrigin, vec3 rayDirection, out vec3 rayPosition, out vec3 normal, out bool hit) {
  // marching loop
  float dist;
  float depth = 0.0;
  rayPosition = rayOrigin;

  for (int i = 0; i < 64; i++){
    dist = sceneDist(rayPosition);
    if (abs(dist) < EPS) {
      hit = true;
      break;
    }

    depth += dist;
    rayPosition = rayOrigin + depth * rayDirection;
  }
  return depth;
}

bool isEdge(vec3 p) {
  float eps = 7. * EPS;
  float th = 0.99;

  vec3 np = getNormal(p);

  vec3 dns[6];
  dns[0] = vec3(1.0, 0.0, 0.0);
  dns[1] = vec3(0.0, 1.0, 0.0);
  dns[2] = vec3(0.0, 0.0, 1.0);
  dns[3] = vec3(-1.0, 0.0, 0.0);
  dns[4] = vec3(0.0, -1.0, 0.0);
  dns[5] = vec3(0.0, 0.0, -1.0);
  for (int i=0; i < 6; i++) {
    vec3 n = getNormal(p + eps * normalize(dns[i]));
    if (dot(np, n) < th) {
      return true;
    }
  }
  return false;
}

bool isOutline(vec3 rayOrigin, vec3 rayDirection) {
  bool hit;
  vec3 rayPosition, normal;
  float eps = 15. * EPS;
  float th = 0.2;

  float dp = getDistance(rayOrigin, rayDirection, rayPosition, normal, hit);

  vec3 dns[7];
  dns[0] = vec3(1.0, 0.0, 0.0);
  dns[1] = vec3(0.0, 1.0, 0.0);
  dns[2] = vec3(0.0, 0.0, 1.0);
  dns[3] = vec3(-1.0, 0.0, 0.0);
  dns[4] = vec3(0.0, -1.0, 0.0);
  dns[5] = vec3(0.0, 0.0, -1.0);
  dns[6] = getNormal(rayOrigin);
  for (int i=0; i < 7; i++) {
    vec3 n = normalize(dns[i]);
    float dn = getDistance(rayOrigin + eps * n, rayDirection, rayPosition, normal, hit);
    if (!hit || th < abs(dp - dn)) {
      return true;
    }
  }

  return false;
}

vec3 getRayColor(vec3 rayOrigin, vec3 rayDirection, out vec3 rayPosition, out vec3 normal, out bool hit) {
  float depth = getDistance(rayOrigin, rayDirection, rayPosition, normal, hit);

  if (!hit) {
    // return vec3(1.);
    return vec3(0.3);
  }

  if (internalEdge && isEdge(rayPosition)) {
    return vec3(0.3);
  }

  if (isOutline(rayPosition, rayDirection)) {
    return vec3(0.3);
  }

  if (colored) {
    normal = getNormal(rayPosition);
    vec3 color = getLightColor(light1Dir, rayDirection, rayPosition, normal)
      + getLightColor(light2Dir, rayDirection, rayPosition, normal);
    return color - pow(clamp(0.05 * depth, 0.0, 0.6), 2.0);
  } else {
    return vec3(1.);
  }
}

//
void main(void) {
  // позиция на экране
  vec2 screenPos = (gl_FragCoord.xy * 2.0 - resolution) / resolution;

  // направление луча - нормализованное
  vec4 ndcRay = vec4(screenPos.xy, 1.0, 1.0);

  // перевод луча из нормализованной системы координат в мировую
  // convert ray direction from normalized device coordinate to world coordinate
  vec3 rayDirection = (cameraWorldMatrix * cameraProjectionMatrixInverse * ndcRay).xyz;
  rayDirection = normalize(rayDirection);

  // будем бросать лучи из камеры
  vec3 rayOrigin = cameraPosition;

  // бросаем лучи
  vec3 color = vec3(0.0);
  vec3 nextRayPos, normal;
  bool hit;
  float alpha = 1.0;

  // маршируем
  for (int i = 0; i < 1; i++) {
    color += alpha * getRayColor(rayOrigin, rayDirection, nextRayPos, normal, hit);

    if (!hit) {
      break;
    }

    alpha *= 0.3;
    rayDirection = normalize(reflect(rayDirection, normal));
    rayOrigin = nextRayPos + normal * OFFSET;
  }
  gl_FragColor = vec4(color, 2.0);
}
