// @ts-ignore
function init() {
  var stats = initStats();
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.copy(new THREE.Vector3(-30, 40, 30));
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  var scene = new THREE.Scene();
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  var groundGeom = new THREE.PlaneGeometry(100, 100, 4, 4);
  var groundMesh = new THREE.Mesh(
    groundGeom,
    new THREE.MeshBasicMaterial({
      color: 0x777777,
    }),
  );
  groundMesh.rotation.x = -Math.PI / 2;
  groundMesh.position.y = -20;
  scene.add(groundMesh);

  var sphereGeometry = new THREE.SphereGeometry(14, 20, 20);
  var cubeGeometry = new THREE.BoxGeometry(15, 15, 15);
  var planeGeometry = new THREE.PlaneGeometry(14, 14, 4, 4);

  var meshBasicMaterial = new THREE.MeshBasicMaterial({
    color: 0x7777ff,
    name: 'Basic Material',
  });

  var sphere = new THREE.Mesh(sphereGeometry, meshBasicMaterial);
  var cube = new THREE.Mesh(cubeGeometry, meshBasicMaterial);
  var plane = new THREE.Mesh(planeGeometry, meshBasicMaterial);

  // position the sphere
  sphere.position.x = 0;
  sphere.position.y = 3;
  sphere.position.z = 2;

  cube.position.copy(sphere.position);
  plane.position.copy(sphere.position);

  // add the sphere to the scene
  scene.add(cube);

  // position and point the camera to the center of the scene
  camera.position.x = -20;
  camera.position.y = 50;
  camera.position.z = 40;
  camera.lookAt(new THREE.Vector3(10, 0, 0));

  // add subtle ambient lighting
  var ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  // add spotlight for the shadows
  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  scene.add(spotLight);

  // add the output of the renderer to the html element
  document.getElementById('webgl-output').appendChild(renderer.domElement);

  const trackballControls = initTrackballControls(camera, renderer);

  var controls = new (function () {
    this.rotationSpeed = 0.02;
    this.bouncingSpeed = 0.03;

    this.color = meshBasicMaterial.color.getStyle();
    this.selectedMesh = 'cube';
  })();

  var gui = new dat.GUI();
  var selectedMesh: THREE.Mesh = cube;

  addBasicMaterialSettings(gui, controls, meshBasicMaterial);

  var spGui = gui.addFolder('THREE.MeshBasicMaterial');
  spGui.addColor(controls, 'color').onChange(function (e) {
    meshBasicMaterial.color.setStyle(e);
  });
  spGui.add(meshBasicMaterial, 'wireframe');

  gui.add(controls, 'selectedMesh', ['cube', 'sphere', 'plane']).onChange(function (e) {
    scene.remove(plane);
    scene.remove(cube);
    scene.remove(sphere);

    switch (e) {
      case 'cube':
        scene.add(cube);
        selectedMesh = cube;
        break;
      case 'sphere':
        scene.add(sphere);
        selectedMesh = sphere;
        break;
      case 'plane':
        scene.add(plane);
        selectedMesh = plane;
        break;
    }
  });

  render();

  function render() {
    stats.update();
    trackballControls.update();

    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}

(function () {
  init();
})();
