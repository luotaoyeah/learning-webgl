import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

declare global {
  export function initStats(type?: string | number): Stats;
  export function initTrackballControls(camera: THREE.Camera, renderer: THREE.WebGLRenderer): TrackballControls;
}
