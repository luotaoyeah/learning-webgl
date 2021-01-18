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
    const mtlLoader = new THREE.MTLLoader();
    mtlLoader.load('../../common/assets/windmill.mtl', (mtl) => {
      mtl.preload();

      const objLoader = new THREE.OBJLoader();
      objLoader.setMaterials(mtl);
      objLoader.load('../../common/assets/windmill.obj', (obj) => {
        scene.add(obj);
      });
    });
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
