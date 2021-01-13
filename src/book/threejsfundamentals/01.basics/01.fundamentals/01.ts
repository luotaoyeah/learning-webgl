/// <reference types="three" />

function main() {
  const canvas = document.getElementById('c');
  const renderer = new THREE.WebGLRenderer({ canvas });

  const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5);
  camera.position.z = 2;

  const scene = new THREE.Scene();

  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const meshBasicMaterial = new THREE.MeshBasicMaterial({ color: '#44aa88' });
  const cube = new THREE.Mesh(boxGeometry, meshBasicMaterial);

  scene.add(cube);

  render();

  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}

main();
