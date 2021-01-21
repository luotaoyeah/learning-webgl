import '../../node_modules/three/build/three.js';
import '../../node_modules/three/examples/js/math/ConvexHull.js';
import '../../node_modules/three/examples/js/controls/TrackballControls.js';
import '../../node_modules/three/examples/js/controls/OrbitControls.js';
import '../../node_modules/three/examples/js/loaders/FontLoader.js';
import '../../node_modules/three/examples/js/loaders/OBJLoader.js';
import '../../node_modules/three/examples/js/loaders/MTLLoader.js';
import '../../node_modules/three/examples/js/loaders/GLTFLoader.js';
import '../../node_modules/three/examples/js/loaders/DRACOLoader.js';
import '../../node_modules/three/examples/js/loaders/KTX2Loader.js';
import '../../node_modules/three/examples/js/utils/WorkerPool.js';
import '../../node_modules/three/examples/js/utils/SceneUtils.js';
import '../../node_modules/three/examples/js/geometries/TextGeometry.js';
import '../../node_modules/three/examples/js/geometries/ConvexGeometry.js';
import '../../node_modules/three/examples/js/geometries/ParametricGeometry.js';
import '../../node_modules/three/examples/js/geometries/ParametricGeometries.js';
import '../../node_modules/three/examples/js/helpers/RectAreaLightHelper.js';
import '../../node_modules/three/examples/js/objects/Lensflare.js';

import Stats from '../../node_modules/stats.js/src/Stats.js';
import * as _dat from '../../node_modules/dat.gui/build/dat.gui.module.js';

import type { GUI } from '../../node_modules/@types/dat.gui';
import * as _THREE from '../../node_modules/@types/three';
import type { TrackballControls as _TrackballControls } from '../../node_modules/@types/three/examples/jsm/controls/TrackballControls';
import type { OrbitControls as _OrbitControls } from '../../node_modules/@types/three/examples/jsm/controls/OrbitControls';
import type { OBJLoader as _OBJLoader } from '../../node_modules/@types/three/examples/jsm/loaders/OBJLoader';
import type { MTLLoader as _MTLLoader } from '../../node_modules/@types/three/examples/jsm/loaders/MTLLoader';
import type { GLTFLoader as _GLTFLoader } from '../../node_modules/@types/three/examples/jsm/loaders/GLTFLoader';
import type { DRACOLoader as _DRACOLoader } from '../../node_modules/@types/three/examples/jsm/loaders/DRACOLoader';
import type { KTX2Loader as _KTX2Loader } from '../../node_modules/@types/three/examples/jsm/loaders/KTX2Loader';
import type {
  Font as _Font,
  FontLoader as _FontLoader,
} from '../../node_modules/@types/three/examples/jsm/loaders/FontLoader';
import type { TextGeometry as _TextGeometry } from '../../node_modules/@types/three/examples/jsm/geometries/TextGeometry';
import type { ConvexGeometry as _ConvexGeometry } from '../../node_modules/@types/three/examples/jsm/geometries/ConvexGeometry';
import type { ParametricGeometry as _ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry';
import type { ParametricGeometries as OriginalParametricGeometries } from 'three/examples/jsm/geometries/ParametricGeometries';
import type { SceneUtils as _SceneUtils } from 'three/examples/jsm/utils/SceneUtils';
import type { RectAreaLightHelper as _RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import type {
  Lensflare as _Lensflare,
  LensflareElement as _LensflareElement,
} from 'three/examples/jsm/objects/Lensflare';

declare namespace THREE_ {
  export class TrackballControls extends _TrackballControls {}

  export class OrbitControls extends _OrbitControls {}

  export class FontLoader extends _FontLoader {}

  export class OBJLoader extends _OBJLoader {}

  export class MTLLoader extends _MTLLoader {}

  export class GLTFLoader extends _GLTFLoader {}

  export class DRACOLoader extends _DRACOLoader {}

  export class KTX2Loader extends _KTX2Loader {}

  export class Font extends _Font {}

  export class TextGeometry extends _TextGeometry {}

  export class ConvexGeometry extends _ConvexGeometry {}

  export class RectAreaLightHelper extends _RectAreaLightHelper {}

  export class ParametricGeometry extends _ParametricGeometry {}

  export class Lensflare extends _Lensflare {}

  export class LensflareElement extends _LensflareElement {}

  export const SceneUtils: typeof _SceneUtils;

  export const ParametricGeometries: typeof OriginalParametricGeometries;
}

const THREE = (window as any).THREE as typeof _THREE & typeof THREE_;
const dat = { GUI: _dat.GUI as typeof GUI };

/**
 * 加载 stats.js.
 *
 * @returns stats
 */
function initStats(): Stats {
  const stats = new Stats();

  stats.showPanel(0);
  document.body.appendChild(stats.dom);

  return stats;
}

/**
 * 加载 TrackballControls.
 *
 * @param camera
 * @param renderer
 */
function initTrackballControls(camera: THREE.Camera, renderer: THREE.WebGLRenderer) {
  const trackballControls = new THREE.TrackballControls(camera, renderer.domElement);
  trackballControls.rotateSpeed = 1.0;
  trackballControls.zoomSpeed = 1.2;
  trackballControls.panSpeed = 0.8;
  trackballControls.noZoom = false;
  trackballControls.noPan = false;
  trackballControls.staticMoving = true;
  trackballControls.dynamicDampingFactor = 0.3;
  trackballControls.keys = ['65', '83', '68'];

  return trackballControls;
}

/**
 * 加载 OrbitControls.
 *
 * @param camera
 * @param renderer
 */
function initOrbitControls(camera: THREE.Camera, renderer: THREE.WebGLRenderer) {
  const orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

  return orbitControls;
}

function addHouseAndTree(scene) {
  createBoundingWall(scene);
  createGroundPlane(scene);
  createHouse(scene);
  createTree(scene);

  function createBoundingWall(scene) {
    var wallLeft = new THREE.BoxGeometry(70, 2, 2);
    var wallRight = new THREE.BoxGeometry(70, 2, 2);
    var wallTop = new THREE.BoxGeometry(2, 2, 50);
    var wallBottom = new THREE.BoxGeometry(2, 2, 50);

    var wallMaterial = new THREE.MeshPhongMaterial({
      color: 0xa0522d,
    });

    var wallLeftMesh = new THREE.Mesh(wallLeft, wallMaterial);
    var wallRightMesh = new THREE.Mesh(wallRight, wallMaterial);
    var wallTopMesh = new THREE.Mesh(wallTop, wallMaterial);
    var wallBottomMesh = new THREE.Mesh(wallBottom, wallMaterial);

    wallLeftMesh.position.set(15, 1, -25);
    wallRightMesh.position.set(15, 1, 25);
    wallTopMesh.position.set(-19, 1, 0);
    wallBottomMesh.position.set(49, 1, 0);

    scene.add(wallLeftMesh);
    scene.add(wallRightMesh);
    scene.add(wallBottomMesh);
    scene.add(wallTopMesh);
  }

  function createGroundPlane(scene) {
    // create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(70, 50);
    var planeMaterial = new THREE.MeshPhongMaterial({
      color: 0x9acd32,
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    // rotate and position the plane
    plane.rotation.x = -((90 * Math.PI) / 180);
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;

    scene.add(plane);
  }

  function createHouse(scene) {
    var roof = new THREE.ConeGeometry(5, 4);
    var base = new THREE.CylinderGeometry(5, 5, 6);

    // create the mesh
    var roofMesh = new THREE.Mesh(
      roof,
      new THREE.MeshPhongMaterial({
        color: 0x8b7213,
      }),
    );
    var baseMesh = new THREE.Mesh(
      base,
      new THREE.MeshPhongMaterial({
        color: 0xffe4c4,
      }),
    );

    roofMesh.position.set(25, 8, 0);
    baseMesh.position.set(25, 3, 0);

    roofMesh.receiveShadow = true;
    baseMesh.receiveShadow = true;
    roofMesh.castShadow = true;
    baseMesh.castShadow = true;

    scene.add(roofMesh);
    scene.add(baseMesh);
  }

  /**
   * Add the tree to the scene
   * @param scene The scene to add the tree to
   */
  function createTree(scene) {
    var trunk = new THREE.BoxGeometry(1, 8, 1);
    var leaves = new THREE.SphereGeometry(4);

    // create the mesh
    var trunkMesh = new THREE.Mesh(
      trunk,
      new THREE.MeshPhongMaterial({
        color: 0x8b4513,
      }),
    );
    var leavesMesh = new THREE.Mesh(
      leaves,
      new THREE.MeshPhongMaterial({
        color: 0x00ff00,
      }),
    );

    // position the trunk. Set y to half of height of trunk
    trunkMesh.position.set(-10, 4, 0);
    leavesMesh.position.set(-10, 12, 0);

    trunkMesh.castShadow = true;
    trunkMesh.receiveShadow = true;
    leavesMesh.castShadow = true;
    leavesMesh.receiveShadow = true;

    scene.add(trunkMesh);
    scene.add(leavesMesh);
  }
}

/**
 * Add a folder to the gui containing the basic material properties.
 *
 * @param gui the gui to add to
 * @param controls the current controls object
 * @param material the material to control
 * @param name optionally the name to assign to the folder
 */
function addBasicMaterialSettings(gui, controls, material, name?: string) {
  var folderName = name || 'THREE.Material';

  controls.material = material;

  var folder = gui.addFolder(folderName);
  folder.add(controls.material, 'id');
  folder.add(controls.material, 'uuid');
  folder.add(controls.material, 'name');
  folder.add(controls.material, 'opacity', 0, 1, 0.01);
  folder.add(controls.material, 'transparent');
  folder.add(controls.material, 'visible');
  folder.add(controls.material, 'side', { FrontSide: 0, BackSide: 1, DoubleSide: 2 }).onChange(function (side) {
    controls.material.side = parseInt(side);
  });

  folder.add(controls.material, 'colorWrite');
  folder.add(controls.material, 'premultipliedAlpha');
  folder.add(controls.material, 'dithering');
  folder.add(controls.material, 'shadowSide', { FrontSide: 0, BackSide: 1, DoubleSide: 2 });
  folder.add(controls.material, 'vertexColors', {}).onChange(function (vertexColors) {
    material.vertexColors = parseInt(vertexColors);
  });
  folder.add(controls.material, 'fog');

  return folder;
}

function addSpecificMaterialSettings(gui, controls, material, name) {
  controls.material = material;

  var folderName = name !== undefined ? name : 'THREE.' + material.type;
  var folder = gui.addFolder(folderName);
  switch (material.type) {
    case 'MeshNormalMaterial':
      folder.add(controls.material, 'wireframe');
      return folder;

    case 'MeshPhongMaterial':
      controls.specular = material.specular.getStyle();
      folder.addColor(controls, 'specular').onChange(function (e) {
        material.specular.setStyle(e);
      });
      folder.add(material, 'shininess', 0, 100, 0.01);
      return folder;

    case 'MeshStandardMaterial':
      controls.color = material.color.getStyle();
      folder.addColor(controls, 'color').onChange(function (e) {
        material.color.setStyle(e);
      });
      controls.emissive = material.emissive.getStyle();
      folder.addColor(controls, 'emissive').onChange(function (e) {
        material.emissive.setStyle(e);
      });
      folder.add(material, 'metalness', 0, 1, 0.01);
      folder.add(material, 'roughness', 0, 1, 0.01);
      folder.add(material, 'wireframe');

      return folder;
  }
}

export { THREE, initStats, initTrackballControls, initOrbitControls, addHouseAndTree, dat, addSpecificMaterialSettings, addBasicMaterialSettings };
