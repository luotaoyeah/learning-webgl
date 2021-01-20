import { dat, initStats, initTrackballControls, THREE } from '../../../../common/util.js';

function main() {
  const canvas = document.getElementById('c');
  const renderer = new THREE.WebGLRenderer({ canvas });
  const stats = initStats();

  const camera = new THREE.PerspectiveCamera(15, 2, 0.1, 1000);
  camera.position.set(0, 10, 50);
  camera.lookAt(0, 0, 0);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const orbitControls = initTrackballControls(camera, renderer);
  orbitControls.target.set(0, 5, 0);

  const axesHelper = new THREE.AxesHelper(100);
  scene.add(axesHelper);

  const cameraHelper = new THREE.CameraHelper(camera);
  scene.add(cameraHelper);

  const gui = new dat.GUI();

  {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('../../assets/checker.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    texture.repeat.setScalar(20);

    const planeGeometry = new THREE.PlaneGeometry(40, 40);
    const planeMaterial = new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide });
    const planMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planMesh.rotation.x = -90 * (Math.PI / 180);
    scene.add(planMesh);
  }

  {
    const cubeSize = 4;
    const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMat = new THREE.MeshPhongMaterial({ color: '#8AC' });
    const mesh = new THREE.Mesh(cubeGeo, cubeMat);
    mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
    scene.add(mesh);
  }

  {
    const sphereRadius = 3;
    const sphereWidthDivisions = 32;
    const sphereHeightDivisions = 16;
    const sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
    const sphereMat = new THREE.MeshPhongMaterial({ color: '#CA8' });
    const mesh = new THREE.Mesh(sphereGeo, sphereMat);
    mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
    scene.add(mesh);
  }

  {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const controls = new (function () {
      this.color = ambientLight.color.getStyle();
      this.intensity = 1;
    })();

    gui.addColor(controls, 'color').onChange(function (e) {
      ambientLight.color = new THREE.Color(e);
    });

    gui.add(ambientLight, 'intensity', 0, 2, 0.01).onChange(function (e) {
      ambientLight.intensity = e;
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
    orbitControls.update();
    cameraHelper.update();

    if (resizeRendererToDisplaySize(renderer)) {
      camera.aspect = renderer.domElement.clientWidth / renderer.domElement.clientHeight;
      camera.updateProjectionMatrix();
    }

    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}

main();
