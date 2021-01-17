import { THREE } from '../../common/util.js';

function main() {
  const canvas = document.getElementById('c');
  const renderer = new THREE.WebGLRenderer({ canvas });

  const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5);
  camera.position.z = 2;

  const scene = new THREE.Scene();

  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

  const cubes = [makeInstance(boxGeometry, '#44aa88', 0), makeInstance(boxGeometry, '#8844aa', -2), makeInstance(boxGeometry, '#aa8844', 2)];

  const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
  directionalLight.position.set(-1, 2, 4);
  scene.add(directionalLight);

  requestAnimationFrame(render);

  function makeInstance(geometry: THREE.BoxGeometry, color: string, x: number): THREE.Mesh {
    const meshPhongMaterial = new THREE.MeshPhongMaterial({ color });
    const cube = new THREE.Mesh(geometry, meshPhongMaterial);
    cube.position.x = x;
    scene.add(cube);
    return cube;
  }

  function render(time: number) {
    const second = time / 1000;

    cubes.forEach((cube, index) => {
      const speed = 1 + index * 0.1;
      const rotation = second * speed;
      cube.rotation.x = rotation;
      cube.rotation.y = rotation;
    });

    camera.aspect = renderer.domElement.clientWidth / renderer.domElement.clientHeight;
    camera.updateProjectionMatrix();

    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}

main();
