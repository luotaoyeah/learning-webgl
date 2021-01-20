import { dat, initStats, initTrackballControls, THREE } from '../../../../common/util.js';

function main() {
  const canvas = document.getElementById('c');
  const renderer = new THREE.WebGLRenderer({ canvas });
  const stats = initStats();

  const camera = new THREE.PerspectiveCamera(40, 2, 0.1, 1000);
  camera.position.set(0, 50, 0);
  camera.up.set(0, 0, 1);
  camera.lookAt(0, 0, 0);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const trackballControls = initTrackballControls(camera, renderer);

  const objects: Array<THREE.Object3D> = [];

  const gui = new dat.GUI();

  {
    const pointLight = new THREE.PointLight(0xffffff, 3);
    scene.add(pointLight);
  }

  {
    const sphereGeometry = new THREE.SphereGeometry(1, 8, 8);

    const solarSystem = new THREE.Object3D();
    scene.add(solarSystem);
    objects.push(solarSystem);

    const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    sunMesh.scale.set(5, 5, 5);
    solarSystem.add(sunMesh);
    objects.push(sunMesh);

    const earthOrbit = new THREE.Object3D();
    earthOrbit.position.x = 10;
    solarSystem.add(earthOrbit);
    objects.push(earthOrbit);

    const earthMaterial = new THREE.MeshPhongMaterial({ color: 0x2233ff, emissive: 0x112244 });
    const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
    earthOrbit.add(earthMesh);
    objects.push(earthMesh);

    const moonOrbit = new THREE.Object3D();
    moonOrbit.position.x = 2;
    moonOrbit.scale.set(0.5, 0.5, 0.5);
    earthOrbit.add(moonOrbit);
    objects.push(moonOrbit);

    const moonMaterial = new THREE.MeshPhongMaterial({ color: 0x888888, emissive: 0x222222 });
    const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
    moonOrbit.add(moonMesh);
    objects.push(moonMesh);

    makeAxisGridHelper(solarSystem, 'solarSystem');
    makeAxisGridHelper(sunMesh, 'sunMesh');
    makeAxisGridHelper(earthOrbit, 'earthOrbit');
    makeAxisGridHelper(earthMesh, 'earthMesh');
    makeAxisGridHelper(moonOrbit, 'moonOrbit');
    makeAxisGridHelper(moonMesh, 'moonMesh');

    function makeAxisGridHelper(node: THREE.Object3D, name: string): void {
      const axisGridHelper = new AxisGridHelper(node);
      gui.add(axisGridHelper, 'visible').name(name);
    }
  }

  function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer): boolean {
    if (renderer.domElement.width !== renderer.domElement.clientWidth || renderer.domElement.height !== renderer.domElement.clientHeight) {
      const dpr = window.devicePixelRatio | 0;
      renderer.setSize(renderer.domElement.clientWidth * dpr, renderer.domElement.clientHeight * dpr, false);
      return true;
    }
    return false;
  }

  requestAnimationFrame(render);

  function render(time: number): void {
    stats.update();
    trackballControls.update();

    if (resizeRendererToDisplaySize(renderer)) {
      camera.aspect = renderer.domElement.clientWidth / renderer.domElement.clientHeight;
      camera.updateProjectionMatrix();
    }

    {
      const second = time / 1000 / 2;

      objects.forEach((obj) => {
        obj.rotation.y = second;
      });
    }

    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}

class AxisGridHelper {
  public grid: THREE.GridHelper;
  public axes: THREE.AxesHelper;

  public constructor(node: THREE.Object3D) {
    const gridHelper = new THREE.GridHelper(10, 10);
    (gridHelper.material as THREE.Material).depthTest = false;
    gridHelper.renderOrder = 1;
    gridHelper.visible = false;
    this.grid = gridHelper;
    node.add(gridHelper);

    const axesHelper = new THREE.AxesHelper();
    (axesHelper.material as THREE.Material).depthTest = false;
    axesHelper.renderOrder = 1;
    axesHelper.visible = false;
    this.axes = axesHelper;
    node.add(axesHelper);
  }

  private _visible: boolean = false;

  public get visible(): boolean {
    return this._visible;
  }

  public set visible(value: boolean) {
    this._visible = value;
    this.grid.visible = value;
    this.axes.visible = value;
  }
}

main();
