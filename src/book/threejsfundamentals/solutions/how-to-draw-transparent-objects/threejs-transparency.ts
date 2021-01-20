import { initStats, THREE } from '../../../../common/util.js';

function main() {
  const canvas = document.querySelector<HTMLCanvasElement>('#c');
  const renderer = new THREE.WebGLRenderer({ canvas });

  const stats = initStats();

  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 25;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 4;

  const controls = new THREE.OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('white');

  function addLight(x, y, z) {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(x, y, z);
    scene.add(light);
  }

  addLight(-1, 2, 4);
  addLight(1, -1, -2);

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  function makeInstance(geometry, color, x, y, z) {
    const material = new THREE.MeshPhongMaterial({
      color,
      opacity: 0.8,
      transparent: true,
    });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.set(x, y, z);

    return cube;
  }

  function hsl(h, s, l) {
    return new THREE.Color().setHSL(h, s, l);
  }

  {
    const d = 0.8;
    makeInstance(geometry, hsl(0 / 8, 1, 0.5), -d, -d, -d);
    makeInstance(geometry, hsl(1 / 8, 1, 0.5), d, -d, -d);
    makeInstance(geometry, hsl(2 / 8, 1, 0.5), -d, d, -d);
    makeInstance(geometry, hsl(3 / 8, 1, 0.5), d, d, -d);
    makeInstance(geometry, hsl(4 / 8, 1, 0.5), -d, -d, d);
    makeInstance(geometry, hsl(5 / 8, 1, 0.5), d, -d, d);
    makeInstance(geometry, hsl(6 / 8, 1, 0.5), -d, d, d);
    makeInstance(geometry, hsl(7 / 8, 1, 0.5), d, d, d);
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  let renderRequested = false;

  function render() {
    stats.update();

    renderRequested = undefined;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);
  }

  render();

  function requestRenderIfNotRequested() {
    if (!renderRequested) {
      renderRequested = true;
      requestAnimationFrame(render);
    }
  }

  controls.addEventListener('change', requestRenderIfNotRequested);
  window.addEventListener('resize', requestRenderIfNotRequested);
}

main();