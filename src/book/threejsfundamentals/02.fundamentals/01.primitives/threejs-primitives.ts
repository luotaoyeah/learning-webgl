import { initStats, initTrackballControls, THREE } from '../../common/util.js';

function main() {
  const canvas = document.getElementById('c');
  const renderer = new THREE.WebGLRenderer({ canvas });
  const stats = initStats();
  const camera = new THREE.PerspectiveCamera(40, 2, 0.1, 500);
  camera.position.z = 120;
  const trackballControls = initTrackballControls(camera, renderer);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdddddd);

  const objects: Array<THREE.Object3D> = [];
  const spread: number = 15;

  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }
  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(1, -2, -4);
    scene.add(light);
  }

  {
    addSolidGeometry(-2, 2, new THREE.BoxGeometry(8, 8, 8, 3, 6, 9));
    addSolidGeometry(-1, 2, new THREE.CircleGeometry(6, 24, 90, 270 * (Math.PI / 180)));
  }

  {
    const shape = new THREE.Shape();
    shape.moveTo(-4, 4);
    shape.lineTo(4, 4);
    shape.lineTo(4, -4);
    shape.lineTo(-4, -4);
    shape.closePath();
    addSolidGeometry(0, 2, new THREE.ShapeGeometry(shape));
  }

  function addObject(x: number, y: number, obj: THREE.Object3D): void {
    obj.position.x = x * spread;
    obj.position.y = y * spread;

    scene.add(obj);
    objects.push(obj);
  }

  function addSolidGeometry(x: number, y: number, geometry: THREE.BufferGeometry): void {
    const materials = createMaterial();

    const group = new THREE.Group();
    group.add(new THREE.Mesh(geometry, materials[0]));
    group.add(new THREE.Mesh(geometry, materials[1]));

    addObject(x, y, group);
  }

  function createMaterial(): [THREE.Material, THREE.Material] {
    const material01 = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide });

    const hue = Math.random();
    const saturation = 1;
    const luminance = 0.5;
    material01.color.setHSL(hue, saturation, luminance);

    const material02 = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: 0xffffff, wireframe: true });

    return [material01, material02];
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
    trackballControls.update();

    if (resizeRendererToDisplaySize(renderer)) {
      camera.aspect = renderer.domElement.clientWidth / renderer.domElement.clientHeight;
      camera.updateProjectionMatrix();
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
    renderer.render(scene, camera);
  }
}

main();
