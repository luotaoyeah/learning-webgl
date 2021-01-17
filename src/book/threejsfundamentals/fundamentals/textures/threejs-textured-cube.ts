import { initStats, initTrackballControls, THREE } from '../../common/util.js';

function main() {
  const canvas = document.getElementById('c');
  const renderer = new THREE.WebGLRenderer({ canvas });
  const stats = initStats();

  const camera = new THREE.PerspectiveCamera(40, undefined, 0.1, 1000);
  camera.position.set(0, 0, 100);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const trackballControls = initTrackballControls(camera, renderer);

  const objects: Array<THREE.Object3D> = [];

  {
    const geometry = new THREE.BoxGeometry(16, 16, 16);
    const material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('../../common/wall.jpg') });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    objects.push(mesh);
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
        obj.rotation.x = second;
        obj.rotation.y = second;
      });
    }

    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}

main();
