import { initStats, initTrackballControls, THREE } from '../../common/util.js';

function main() {
  const canvas = document.getElementById('c');
  const renderer = new THREE.WebGLRenderer({ canvas });
  const stats = initStats();
  const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 100);
  camera.position.z = 50;
  const trackballControls = initTrackballControls(camera, renderer);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const objects: Array<THREE.Object3D> = [];

  const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
  directionalLight.position.set(-1, 2, 4);
  scene.add(directionalLight);

  const webGLRenderTarget = new THREE.WebGLRenderTarget(canvas.clientWidth, canvas.clientHeight);

  const rtScene = new THREE.Scene();
  rtScene.background = new THREE.Color(0xff0000);

  const rtDirectionalLight = new THREE.DirectionalLight(0xffffff, 1);
  rtDirectionalLight.position.set(-10, 50, 50);
  rtScene.add(rtDirectionalLight);

  const rtCamera = new THREE.PerspectiveCamera(75, 2, 0.1, 100);
  rtCamera.position.z = 50;

  const rtGeometry = new THREE.BoxGeometry(12, 12, 12);
  const rtMaterial = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
  const rtMesh = new THREE.Mesh(rtGeometry, rtMaterial);
  rtScene.add(rtMesh);
  objects.push(rtMesh);

  const geometry = new THREE.BoxGeometry(12, 12, 12);
  const material = new THREE.MeshPhongMaterial({ map: webGLRenderTarget.texture });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  objects.push(mesh);

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

      webGLRenderTarget.setSize(renderer.domElement.width, renderer.domElement.height);
      rtCamera.aspect = camera.aspect;
      rtCamera.updateProjectionMatrix();
    }

    {
      const second = time / 1000 / 2;

      objects.forEach((cube, index) => {
        const speed = 1 + index * 0.1;
        const rotation = second * speed;
        cube.rotation.x = rotation;
        cube.rotation.y = rotation;
      });
    }

    requestAnimationFrame(render);

    renderer.setRenderTarget(webGLRenderTarget);
    renderer.render(rtScene, rtCamera);

    renderer.setRenderTarget(null);
    renderer.render(scene, camera);
  }
}

main();
