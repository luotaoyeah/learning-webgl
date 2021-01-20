import { initStats, initTrackballControls, THREE } from '../../../../common/util.js';

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

  {
    const shape = new THREE.Shape();
    shape.moveTo(-4, 4);
    shape.lineTo(4, 4);
    shape.lineTo(4, -4);
    shape.lineTo(-4, -4);
    shape.closePath();
    addSolidGeometry(
      1,
      2,
      new THREE.ExtrudeGeometry(shape, {
        bevelEnabled: true,
        bevelSize: 0.5,
        bevelThickness: 0.5,
        bevelOffset: 0,
        bevelSegments: 10,
        steps: 3,
        depth: 3,
      }),
    );
  }

  {
    new THREE.FontLoader().load('../../assets/font/helvetiker.typeface.json', (font) => {
      const textGeometry = new THREE.TextGeometry('HELLO', {
        font,
        size: 3,
        height: 1,
        curveSegments: 24,
        bevelEnabled: true,
        bevelSize: 0.1,
        bevelThickness: 0.1,
        bevelOffset: 0.1,
        bevelSegments: 24,
      });

      addSolidGeometry(-2, 1, textGeometry);

      {
        const materials = createMaterial();

        const group = new THREE.Group();
        group.add(new THREE.Mesh(textGeometry, materials[0]));
        group.add(new THREE.Mesh(textGeometry, materials[1]));

        // TextGeometry 默认以左上角为原点进行旋转,
        // 下面将原点定位到中心点
        textGeometry.computeBoundingBox();
        textGeometry.boundingBox?.getCenter(group.position)?.multiplyScalar(-1);
        const object3D = new THREE.Object3D();
        object3D.add(group);

        addObject(-1, 1, object3D);
      }
    });
  }

  {
    const boxGeometry = new THREE.BoxGeometry(6, 6, 6);
    const edgesGeometry = new THREE.EdgesGeometry(boxGeometry);
    addLineGeometry(0, 1, edgesGeometry);
  }

  {
    const boxGeometry = new THREE.BoxGeometry(6, 6, 6);
    const wireframeGeometry = new THREE.WireframeGeometry(boxGeometry);
    addLineGeometry(1, 1, wireframeGeometry);
  }

  {
    const geometry = new THREE.SphereGeometry(6, 12, 12);
    const material = new THREE.PointsMaterial({ color: 0x000000, size: 3, sizeAttenuation: false });
    const points = new THREE.Points(geometry, material);
    addObject(-2, 0, points);
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

  function addLineGeometry(x: number, y: number, geometry: THREE.BufferGeometry): void {
    const lineBasicMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    const lineSegments = new THREE.LineSegments(geometry, lineBasicMaterial);
    addObject(x, y, lineSegments);
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
