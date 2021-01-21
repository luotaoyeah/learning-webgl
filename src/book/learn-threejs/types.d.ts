import * as three from 'three';
import * as dat from 'dat.gui';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { ConvexGeometry as OriginalConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';
import { ParametricGeometry as OriginalParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry';
import { ParametricGeometries as OriginalParametricGeometries } from 'three/examples/jsm/geometries/ParametricGeometries';
import { SceneUtils as OriginalSceneUtils } from 'three/examples/jsm/utils/SceneUtils';
import { ConvexHull as OriginalConvexHull } from 'three/examples/jsm/math/ConvexHull';
import { RectAreaLightHelper as OriginalRectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import {
  Lensflare as OriginalLensflare,
  LensflareElement as OriginalLensflareElement,
} from 'three/examples/jsm/objects/Lensflare';
import { OBJLoader as OriginalOBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

declare global {
  export namespace THREE {
    export class ConvexGeometry extends OriginalConvexGeometry {}

    export class ParametricGeometry extends OriginalParametricGeometry {}

    export class RectAreaLightHelper extends OriginalRectAreaLightHelper {}

    export class Lensflare extends OriginalLensflare {}

    export class LensflareElement extends OriginalLensflareElement {}

    export class OBJLoader extends OriginalOBJLoader {}

    export class ConvexHull extends OriginalConvexHull {}

    export const SceneUtils: typeof OriginalSceneUtils;
    export const ParametricGeometries: typeof OriginalParametricGeometries;
  }

  export function initStats(type?: string | number): Stats;

  export function addHouseAndTree(scene: three.Scene): void;

  export function initTrackballControls(camera: three.Camera, renderer: three.WebGLRenderer): TrackballControls;

  export function addBasicMaterialSettings(gui: dat.GUI, controls: object, material: three.Material, name?: string): dat.GUI;
}
