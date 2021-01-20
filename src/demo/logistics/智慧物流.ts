import { THREE } from '../../common/util.js';

function main() {
  const canvas = document.querySelector<HTMLCanvasElement>('#c');
  const renderer = new THREE.WebGLRenderer({ canvas });

  const camera = new THREE.PerspectiveCamera(40, 2, 0.1, 100);
  camera.position.set(-400, 300, -400);
  camera.near = 5;
  camera.far = 42000;
  camera.updateProjectionMatrix();
  camera.lookAt(0, 0, 0);

  const controls = new THREE.OrbitControls(camera, canvas);
  controls.maxDistance = 1000;
  controls.maxPolarAngle = 75 * (Math.PI / 180);
  controls.target.set(-50, 1, 0);
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('rgb(49,54,98)');

  {
    const axesHelper = new THREE.AxesHelper(1000);
    scene.add(axesHelper);
  }

  {
    const light = new THREE.AmbientLight('#ffffff', 1);
    scene.add(light);
  }

  {
    const light = new THREE.DirectionalLight('#ffffff', 1);
    light.position.set(0.5, 0, 0.866);
    light.target.position.set(-5, 0, 0);
    scene.add(light);
    scene.add(light.target);
  }

  {
    const dracoLoader = new THREE.DRACOLoader().setDecoderPath(`../../../../../node_modules/three/examples/js/libs/draco/gltf/`);
    const KTX2_LOADER = new THREE.KTX2Loader().setTranscoderPath(`../../../../../node_modules/three/examples/js/libs/basis/`);
    const gltfLoader = new THREE.GLTFLoader().setDRACOLoader(dracoLoader).setKTX2Loader(KTX2_LOADER);

    [
      './resources/DiMian.glb',
      './resources/ChaChe.glb',
      './resources/ChanXianJia.glb',
      './resources/ChiXiang_D.glb',
      './resources/DianNao.glb',
      './resources/G01.glb',
      './resources/HuoJia.glb',
      './resources/JiaXiang.glb',
      './resources/JiQi01.glb',
      './resources/JiQi02.glb',
      './resources/JiQi03.glb',
      './resources/JiQi01.glb',
      './resources/Qiang.glb',
      './resources/Ren.glb',
      './resources/YingCang_Face.glb',
      './resources/ZhiXiang.glb',
      './resources/Zhou.glb',
      './resources/ZuoZi.glb',
    ].forEach((url) => {
      gltfLoader.load(url, (gltf) => {
        scene.add(gltf.scene);
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

  function render(): void {
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
