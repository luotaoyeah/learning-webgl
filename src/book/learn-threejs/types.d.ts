import * as three from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { ConvexGeometry as OriginalConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';
import { ParametricGeometry as OriginalParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry';
import { ParametricGeometries as OriginalParametricGeometries } from 'three/examples/jsm/geometries/ParametricGeometries';
import { SceneUtils as OriginalSceneUtils } from 'three/examples/jsm/utils/SceneUtils';
import { ConvexHull as OriginalConvexHull } from 'three/examples/jsm/math/ConvexHull';
import { RectAreaLightHelper as OriginalRectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { WebGLRendererParameters } from 'three/src/renderers/WebGLRenderer';

declare global {
  export namespace THREE {
    export class ConvexGeometry extends OriginalConvexGeometry {}

    export class ParametricGeometry extends OriginalParametricGeometry {}

    export class RectAreaLightHelper extends OriginalRectAreaLightHelper {}

    export class ConvexHull extends OriginalConvexHull {}

    export const SceneUtils: typeof OriginalSceneUtils;
    export const ParametricGeometries: typeof OriginalParametricGeometries;
  }

  export function initStats(type?: string | number): Stats;

  export function initRenderer(parameters?: WebGLRendererParameters): three.WebGLRenderer;

  export function initCamera(position?: three.Vector3): three.PerspectiveCamera;

  export function addHouseAndTree(scene: three.Scene): void;

  export function addDefaultCubeAndSphere(scene: three.Scene): { cube: three.Mesh; sphere: three.Mesh };

  export function addGroundPlane(scene: three.Scene): three.Mesh;

  export function initTrackballControls(camera: three.Camera, renderer: three.WebGLRenderer): TrackballControls;
}
