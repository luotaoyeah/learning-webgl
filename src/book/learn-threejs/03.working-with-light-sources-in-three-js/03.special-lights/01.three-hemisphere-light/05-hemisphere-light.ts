// @ts-ignore
function init() {
  var stats = initStats();
  var renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.getElementById('webgl-output').appendChild(renderer.domElement);

  var camera = initCamera();

  var trackballControls = initTrackballControls(camera, renderer);

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

  // var planeMaterial = new THREE.MeshLambertMaterial();
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
  var sphereMaterial = new THREE.MeshPhongMaterial({
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

  // add spotlight for a bit of light
  var spotLight0 = new THREE.SpotLight(0xcccccc);
  spotLight0.position.set(-40, 60, -10);
  spotLight0.lookAt(plane.position);
  scene.add(spotLight0);

  var target = new THREE.Object3D();
  target.position.copy(new THREE.Vector3(5, 0, 0));

  var hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0x00ff00, 0.6);
  hemisphereLight.position.set(0, 200, 0);
  scene.add(hemisphereLight);

  const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 200);
  scene.add(hemisphereLightHelper);

  var pointColor = '#ffffff';
  var directionalLight = new THREE.DirectionalLight(pointColor);
  directionalLight.position.set(30, 10, -50);
  directionalLight.castShadow = true;
  directionalLight.target = plane;
  directionalLight.shadow.camera.near = 0.1;
  directionalLight.shadow.camera.far = 200;
  directionalLight.shadow.camera.left = -50;
  directionalLight.shadow.camera.right = 50;
  directionalLight.shadow.camera.top = 50;
  directionalLight.shadow.camera.bottom = -50;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  scene.add(directionalLight);

  // call the render function
  var step = 0;

  // used to determine the switch point for the light animation
  var controls = addControls();

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

  function addControls() {
    var controls = new (function () {
      this.rotationSpeed = 0.03;
      this.bouncingSpeed = 0.03;
      this.hemisphere = true;
      this.color = 0x0000ff;
      this.groundColor = 0x00ff00;
      this.intensity = 0.6;
    })();

    var gui = new dat.GUI();

    gui.add(controls, 'hemisphere').onChange(function (e) {
      if (!e) {
        hemisphereLight.intensity = 0;
      } else {
        hemisphereLight.intensity = controls.intensity;
      }
    });
    gui.addColor(controls, 'groundColor').onChange(function (e) {
      hemisphereLight.groundColor = new THREE.Color(e);
    });
    gui.addColor(controls, 'color').onChange(function (e) {
      hemisphereLight.color = new THREE.Color(e);
    });
    gui.add(controls, 'intensity', 0, 5).onChange(function (e) {
      hemisphereLight.intensity = e;
    });

    return controls;
  }
}

(function () {
  init();
})();
