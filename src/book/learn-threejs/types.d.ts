import * as three from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { ConvexGeometry as OriginalConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';
import { ParametricGeometry as OriginalParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry';
import { ParametricGeometries as OriginalParametricGeometries } from 'three/examples/jsm/geometries/ParametricGeometries';
import { SceneUtils as OriginalSceneUtils } from 'three/examples/jsm/utils/SceneUtils';
import { ConvexHull as OriginalConvexHull } from 'three/examples/jsm/math/ConvexHull';

declare global {
  export namespace THREE {
    export class ConvexGeometry extends OriginalConvexGeometry {}

    export class ParametricGeometry extends OriginalParametricGeometry {}

    export class ConvexHull extends OriginalConvexHull {}

    export const SceneUtils: typeof OriginalSceneUtils;
    export const ParametricGeometries: typeof OriginalParametricGeometries;
  }

  export function initStats(type?: string | number): Stats;

  export function initTrackballControls(camera: three.Camera, renderer: three.WebGLRenderer): TrackballControls;
}
