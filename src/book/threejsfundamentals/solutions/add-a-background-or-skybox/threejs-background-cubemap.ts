import { initStats, THREE } from '../../common/util.js';

function main() {
  const canvas = document.querySelector<HTMLCanvasElement>('#c');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

  const stats = initStats();

  const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 100);
  camera.position.set(0, 10, 20);

  const controls = new THREE.OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.update();

  const scene = new THREE.Scene();

  {
    const light = new THREE.HemisphereLight('#b1e1ff', '#b97a20', 1);
    scene.add(light);
  }

  {
    const light = new THREE.DirectionalLight('#ffffff', 1);
    light.position.set(0, 10, 0);
    light.target.position.set(-5, 0, 0);
    scene.add(light);
    scene.add(light.target);
  }

  const textureLoader = new THREE.CubeTextureLoader();
  const bgTexture = textureLoader.load([
    '../../common/assets/computer-history-museum/pos-x.jpg',
    '../../common/assets/computer-history-museum/neg-x.jpg',
    '../../common/assets/computer-history-museum/pos-y.jpg',
    '../../common/assets/computer-history-museum/neg-y.jpg',
    '../../common/assets/computer-history-museum/pos-z.jpg',
    '../../common/assets/computer-history-museum/neg-z.jpg',
  ]);
  scene.background = bgTexture;

  {
    const gltfLoader = new THREE.GLTFLoader();
    gltfLoader.load('../../common/assets/cartoon_lowpoly_small_city_free_pack/scene.gltf', (gltf) => {
      scene.add(gltf.scene);

      const box = new THREE.Box3().setFromObject(gltf.scene);
      const boxSize = box.getSize(new THREE.Vector3()).length();
      const boxCenter = box.getCenter(new THREE.Vector3());
      frameArea(boxSize * 1.2, boxSize, boxCenter, camera);

      controls.maxDistance = boxSize * 10;
      controls.target.copy(boxCenter);
      controls.update();
    });
  }

  function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
    const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
    const halfFovY = THREE.MathUtils.degToRad(camera.fov * 0.5);
    const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
    const direction = new THREE.Vector3().subVectors(camera.position, boxCenter).multiply(new THREE.Vector3(1, 0, 1)).normalize();

    camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));
    camera.near = boxSize / 100;
    camera.far = boxSize * 100;

    camera.updateProjectionMatrix();
    camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
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
    controls.update();

    if (resizeRendererToDisplaySize(renderer)) {
      camera.aspect = renderer.domElement.clientWidth / renderer.domElement.clientHeight;
      camera.updateProjectionMatrix();
    }

    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}

main();
