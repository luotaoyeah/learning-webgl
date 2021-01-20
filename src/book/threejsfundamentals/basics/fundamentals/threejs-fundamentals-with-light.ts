import { THREE } from '../../../../common/util.js';

function main() {
  const canvas = document.getElementById('c');
  const renderer = new THREE.WebGLRenderer({ canvas });

  const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5);
  camera.position.z = 2;

  const scene = new THREE.Scene();

  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const meshBasicMaterial = new THREE.MeshPhongMaterial({ color: '#44aa88' });
  const cube = new THREE.Mesh(boxGeometry, meshBasicMaterial);

  scene.add(cube);

  const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
  directionalLight.position.set(-1, 2, 4);
  scene.add(directionalLight);

  requestAnimationFrame(render);

  function render(time: number) {
    const second = time / 1000;
    cube.rotation.x = second;
    cube.rotation.y = second;

    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}

main();
