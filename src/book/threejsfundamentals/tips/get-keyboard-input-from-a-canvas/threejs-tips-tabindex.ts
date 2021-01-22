import { THREE } from '../../../../common/util.js';

function main() {
  const canvas = document.querySelector<HTMLCanvasElement>('#c');
  const renderer = new THREE.WebGLRenderer({ canvas });

  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 20;

  const controls = new THREE.OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;
  controls.target.set(0, 0, 0);
  controls.update();

  const scene = new THREE.Scene();

  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  let text = 'THREE';
  let textGeometryParameters: any = null;
  let mesh: any = null;
  new THREE.FontLoader().load('../../assets/font/monaco.typeface.json', (font) => {
    textGeometryParameters = {
      font,
      size: 1,
      height: 1,
      bevelEnabled: false,
    };

    const textGeometry = new THREE.TextGeometry(text, textGeometryParameters);
    const meshPhongMaterial = new THREE.MeshPhongMaterial({});
    mesh = new THREE.Mesh(textGeometry, meshPhongMaterial);
    scene.add(mesh);
  });

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

  function animate() {
    render();
    requestAnimationFrame(animate);
  }

  function render() {
    controls.update();

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    if (textGeometryParameters) {
      if (mesh) {
        scene.remove(mesh);
      }

      const textGeometry = new THREE.TextGeometry(text, textGeometryParameters);
      const meshPhongMaterial = new THREE.MeshPhongMaterial({});
      mesh = new THREE.Mesh(textGeometry, meshPhongMaterial);
      scene.add(mesh);
    }

    renderer.render(scene, camera);
  }

  animate();

  canvas.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      text = '';
    } else {
      text += e.key;
    }
  });
}

main();
