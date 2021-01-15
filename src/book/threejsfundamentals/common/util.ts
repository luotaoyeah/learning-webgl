import '../../../../node_modules/three/build/three.js';
import '../../../../node_modules/three/examples/js/controls/TrackballControls.js';
import * as THREE_T from '../../../../node_modules/@types/three';
import Stats from '../../../../node_modules/stats.js/src/Stats.js';
import type { TrackballControls as _TrackballControls } from '../../../../node_modules/@types/three/examples/jsm/controls/TrackballControls';

declare namespace THREE_ {
  export class TrackballControls extends _TrackballControls {}
}

// @ts-ignore
const THREE = window.THREE as typeof THREE_T & typeof THREE_;

/**
 * 加载 stats.js
 *
 * @returns {Stats} stats
 */
function initStats(): Stats {
  const stats = new Stats();

  stats.showPanel(0);
  document.body.appendChild(stats.dom);

  return stats;
}

/**
 * Initialize trackball controls to control the scene
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
