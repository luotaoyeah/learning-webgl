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
import type { ParametricGeometries as OriginalParametricGeometries } from 'three/examples/jsm/geometries/ParametricGeometries';
import type { SceneUtils as _SceneUtils } from 'three/examples/jsm/utils/SceneUtils';

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

export { THREE, initStats, initTrackballControls, initOrbitControls, dat };
