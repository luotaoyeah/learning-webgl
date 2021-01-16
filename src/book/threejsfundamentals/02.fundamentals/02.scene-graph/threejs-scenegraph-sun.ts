import { initStats, initTrackballControls, THREE } from '../../common/util.js';

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

  const axesHelper = new THREE.AxesHelper(100);
  scene.add(axesHelper);

  const objects: Array<THREE.Object3D> = [];

  {
    const pointLight = new THREE.PointLight(0xffffff, 3);
    scene.add(pointLight);
  }

  {
    const sphereGeometry = new THREE.SphereGeometry(1, 6, 6);

    const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    sunMesh.scale.set(5, 5, 5);
    scene.add(sunMesh);
    objects.push(sunMesh);
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

      objects.forEach((cube, index) => {
        cube.rotation.y = second;
      });
    }

    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}

main();
