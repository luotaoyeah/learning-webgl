import { dat, initStats, initTrackballControls, THREE } from '../../../../../common/util.js';

function init() {
  var stats = initStats();
  var renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.getElementById('webgl-output').appendChild(renderer.domElement);

  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.copy(new THREE.Vector3(-30, 40, 30));
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  camera.position.set(50, 30, -30);
  camera.lookAt(new THREE.Vector3(0, 0, -35));

  var trackballControls = initTrackballControls(camera, renderer);

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();

  const axesHelper = new THREE.AxesHelper(100);
  scene.add(axesHelper);

  // create the ground plane
  var planeGeometry = new THREE.PlaneGeometry(70, 70, 1, 1);
  var planeMaterial = new THREE.MeshStandardMaterial({ roughness: 1, metalness: 0 });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;

  // add the plane to the scene
  scene.add(plane);

  var spotLight0 = new THREE.SpotLight(0xcccccc);
  spotLight0.position.set(-40, 60, -10);
  spotLight0.intensity = 0.1;
  spotLight0.lookAt(plane.position);
  scene.add(spotLight0);

  var rectAreaLight1 = new THREE.RectAreaLight(0xff0000, 10, 4, 10);
  rectAreaLight1.position.set(-10, 10, 35);
  scene.add(rectAreaLight1);

  var rectAreaLight2 = new THREE.RectAreaLight(0x00ff00, 10, 4, 10);
  rectAreaLight2.position.set(0, 10, 35);
  scene.add(rectAreaLight2);

  var rectAreaLight3 = new THREE.RectAreaLight(0x0000ff, 10, 4, 10);
  rectAreaLight3.position.set(10, 10, 35);
  scene.add(rectAreaLight3);

  scene.add(new THREE.RectAreaLightHelper(rectAreaLight1));
  scene.add(new THREE.RectAreaLightHelper(rectAreaLight2));
  scene.add(new THREE.RectAreaLightHelper(rectAreaLight3));

  var controls = new (function () {
    this.rotationSpeed = 0.02;
    this.color1 = 0xff0000;
    this.intensity1 = 500;
    this.color2 = 0x00ff00;
    this.intensity2 = 500;
    this.color3 = 0x0000ff;
    this.intensity3 = 500;
  })();

  var gui = new dat.GUI();
  gui.addColor(controls, 'color1').onChange(function (e) {
    rectAreaLight1.color = new THREE.Color(e);
  });
  gui.add(controls, 'intensity1', 0, 1000).onChange(function (e) {
    rectAreaLight1.intensity = e;
  });
  gui.addColor(controls, 'color2').onChange(function (e) {
    rectAreaLight2.color = new THREE.Color(e);
  });
  gui.add(controls, 'intensity2', 0, 1000).onChange(function (e) {
    rectAreaLight2.intensity = e;
  });
  gui.addColor(controls, 'color3').onChange(function (e) {
    rectAreaLight3.color = new THREE.Color(e);
  });
  gui.add(controls, 'intensity3', 0, 1000).onChange(function (e) {
    rectAreaLight3.intensity = e;
  });

  render();

  function render() {
    stats.update();
    trackballControls.update();

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}

init();
