import '../../../../node_modules/three/build/three.js';
import '../../../../node_modules/three/examples/js/controls/TrackballControls.js';
import '../../../../node_modules/three/examples/js/loaders/FontLoader.js';
import '../../../../node_modules/three/examples/js/geometries/TextGeometry.js';
import Stats from '../../../../node_modules/stats.js/src/Stats.js';

import * as THREE_T from '../../../../node_modules/@types/three';
import type { TrackballControls as _TrackballControls } from '../../../../node_modules/@types/three/examples/jsm/controls/TrackballControls';
import type {
  Font as _Font,
  FontLoader as _FontLoader,
} from '../../../../node_modules/@types/three/examples/jsm/loaders/FontLoader';
import type { TextGeometry as _TextGeometry } from '../../../../node_modules/@types/three/examples/jsm/geometries/TextGeometry';

declare namespace THREE_ {
  export class TrackballControls extends _TrackballControls {}

  export class FontLoader extends _FontLoader {}

  export class Font extends _Font {}

  export class TextGeometry extends _TextGeometry {}
}

// @ts-ignore
const THREE = window.THREE as typeof THREE_T & typeof THREE_;

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

export { THREE, initStats, initTrackballControls };
