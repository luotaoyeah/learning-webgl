import { initStats, THREE } from '../../common/util.js';

function main() {
  const canvas = document.querySelector<HTMLCanvasElement>('#c');
  const renderer = new THREE.WebGLRenderer({ canvas });

  const stats = initStats();

  const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 100);
  camera.position.set(0, 10, 20);

  const controls = new THREE.OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('black');

  {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('../../common/assets/checker.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    texture.repeat.set(20, 20);

    const planeGeometry = new THREE.PlaneGeometry(40, 40);
    const meshPhongMaterial = new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(planeGeometry, meshPhongMaterial);
    mesh.rotation.x = -90 * (Math.PI / 180);
    scene.add(mesh);
  }

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

  {
    const objLoader = new THREE.GLTFLoader();
    objLoader.load('../../common/assets/cartoon_lowpoly_small_city_free_pack/scene.gltf', (gltf) => {
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
    // compute a unit vector that points in the direction the camera is now
    // in the xz plane from the center of the box
    const direction = new THREE.Vector3().subVectors(camera.position, boxCenter).multiply(new THREE.Vector3(1, 0, 1)).normalize();

    // move the camera to a position distance units way from the center
    // in whatever direction the camera was from the center already
    camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));

    // pick some near and far values for the frustum that
    // will contain the box.
    camera.near = boxSize / 100;
    camera.far = boxSize * 100;

    camera.updateProjectionMatrix();

    // point the camera to look at the center of the box
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
