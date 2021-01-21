import { dat, initStats, initTrackballControls, THREE } from '../../../../../common/util.js';

function init() {
  var stats = initStats();
  var renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.getElementById('webgl-output').appendChild(renderer.domElement);

  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.x = -20;
  camera.position.y = 10;
  camera.position.z = 45;
  camera.lookAt(new THREE.Vector3(10, 0, 0));

  var trackballControls = initTrackballControls(camera, renderer);
  var clock = new THREE.Clock();

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();

  // create the ground plane
  var textureGrass = new THREE.TextureLoader().load('../../../common/assets/textures/ground/grasslight-big.jpg');
  textureGrass.wrapS = THREE.RepeatWrapping;
  textureGrass.wrapT = THREE.RepeatWrapping;
  textureGrass.repeat.set(10, 10);

  var planeGeometry = new THREE.PlaneGeometry(1000, 1000, 20, 20);
  var planeMaterial = new THREE.MeshLambertMaterial({
    map: textureGrass,
  });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;

  // add the plane to the scene
  scene.add(plane);

  // create a cube
  var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xff3333,
  });
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = true;

  // position the cube
  cube.position.x = -4;
  cube.position.y = 3;
  cube.position.z = 0;

  // add the cube to the scene
  scene.add(cube);

  var sphereGeometry = new THREE.SphereGeometry(4, 25, 25);
  var sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0x7777ff,
  });
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  // position the sphere
  sphere.position.x = 10;
  sphere.position.y = 5;
  sphere.position.z = 10;
  sphere.castShadow = true;

  // add the sphere to the scene
  scene.add(sphere);

  // add subtle ambient lighting
  var ambientColor = '#1c1c1c';
  var ambientLight = new THREE.AmbientLight(ambientColor);
  scene.add(ambientLight);

  // add spotlight for a bit of light
  var spotLight0 = new THREE.SpotLight(0xcccccc);
  spotLight0.position.set(-40, 60, -10);
  spotLight0.lookAt(plane.position);
  scene.add(spotLight0);

  var pointColor = '#ffffff';
  var spotLight = new THREE.SpotLight(pointColor);
  spotLight.position.set(30, 30, -50);
  spotLight.castShadow = true;
  spotLight.shadow.camera.near = 0.1;
  spotLight.shadow.camera.far = 100;
  spotLight.shadow.camera.fov = 50;
  spotLight.target = plane;
  spotLight.distance = 0;
  spotLight.shadow.camera.near = 2;
  spotLight.shadow.camera.far = 200;
  spotLight.shadow.mapSize = new THREE.Vector2(2048, 2048);
  const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  scene.add(spotLightHelper);

  scene.add(spotLight);

  // call the render function
  var step = 0;

  var controls = new (function () {
    this.rotationSpeed = 0.03;
    this.bouncingSpeed = 0.03;
    this.ambientColor = ambientColor;
    this.pointColor = pointColor;
    this.intensity = 0.1;
    this.distance = 0;
    this.exponent = 30;
    this.angle = 0.1;
    this.debug = false;
    this.castShadow = true;
    this.onlyShadow = false;
    this.target = 'Plane';
  })();

  var gui = new dat.GUI();
  gui.addColor(controls, 'ambientColor').onChange(function (e) {
    ambientLight.color = new THREE.Color(e);
  });

  gui.addColor(controls, 'pointColor').onChange(function (e) {
    spotLight.color = new THREE.Color(e);
  });

  gui.add(controls, 'intensity', 0, 5).onChange(function (e) {
    spotLight.intensity = e;
  });

  var textureFlare0 = new THREE.TextureLoader().load('../../../common/assets/textures/flares/lensflare0.png');
  var textureFlare3 = new THREE.TextureLoader().load('../../../common/assets/textures/flares/lensflare3.png');

  var flareColor = new THREE.Color(0xffaacc);

  var lensFlare = new THREE.Lensflare();
  lensFlare.addElement(new THREE.LensflareElement(textureFlare0, 350, 0.0, flareColor));
  lensFlare.addElement(new THREE.LensflareElement(textureFlare3, 60, 0.6, flareColor));
  lensFlare.addElement(new THREE.LensflareElement(textureFlare3, 70, 0.7, flareColor));
  lensFlare.addElement(new THREE.LensflareElement(textureFlare3, 120, 0.9, flareColor));
  lensFlare.addElement(new THREE.LensflareElement(textureFlare3, 70, 1.0, flareColor));
  spotLight.add(lensFlare);

  render();

  function render() {
    stats.update();
    trackballControls.update();
    // rotate the cube around its axes
    cube.rotation.x += controls.rotationSpeed;
    cube.rotation.y += controls.rotationSpeed;
    cube.rotation.z += controls.rotationSpeed;

    // bounce the sphere up and down
    step += controls.bouncingSpeed;
    sphere.position.x = 20 + 10 * Math.cos(step);
    sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));

    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}

init();
