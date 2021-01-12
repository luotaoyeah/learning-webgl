// @ts-ignore
function init() {
  var stats = initStats();
  var scene = new THREE.Scene();

  var camera: THREE.PerspectiveCamera | THREE.OrthographicCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.x = 120;
  camera.position.y = 60;
  camera.position.z = 180;

  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // create the ground plane
  var planeGeometry = new THREE.PlaneGeometry(180, 180);
  var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;

  // add the plane to the scene
  scene.add(plane);

  var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);

  for (var j = 0; j < planeGeometry.parameters.height / 5; j++) {
    for (var i = 0; i < planeGeometry.parameters.width / 5; i++) {
      var cubeMaterial = new THREE.MeshLambertMaterial();
      cubeMaterial.color = new THREE.Color(Math.random() * 0.75 + 0.25, 0, 0);
      var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

      cube.position.x = -(planeGeometry.parameters.width / 2) + 2 + i * 5;
      cube.position.y = 2;
      cube.position.z = -(planeGeometry.parameters.height / 2) + 2 + j * 5;

      scene.add(cube);
    }
  }

  var directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
  directionalLight.position.set(-20, 40, 60);
  scene.add(directionalLight);

  // add subtle ambient lighting
  var ambientLight = new THREE.AmbientLight(0x292929);
  scene.add(ambientLight);

  // add the output of the renderer to the html element
  document.getElementById('webgl-output').appendChild(renderer.domElement);

  // call the render function
  var step = 0;

  var trackballControls;
  var controls = new (function () {
    this.perspective = 'Perspective';
    this.switchCamera = function () {
      if (camera instanceof THREE.PerspectiveCamera) {
        camera = new THREE.OrthographicCamera(window.innerWidth / -16, window.innerWidth / 16, window.innerHeight / 16, window.innerHeight / -16, -200, 500);
        camera.position.x = 120;
        camera.position.y = 60;
        camera.position.z = 180;
        camera.lookAt(scene.position);

        trackballControls = initTrackballControls(camera, renderer);
        this.perspective = 'Orthographic';
      } else {
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.x = 120;
        camera.position.y = 60;
        camera.position.z = 180;

        camera.lookAt(scene.position);
        trackballControls = initTrackballControls(camera, renderer);
        this.perspective = 'Perspective';
      }
    };
  })();

  var gui = new dat.GUI();
  gui.add(controls, 'switchCamera');
  gui.add(controls, 'perspective').listen();

  // make sure that for the first time, the
  // camera is looking at the scene
  camera.lookAt(scene.position);

  trackballControls = initTrackballControls(camera, renderer);
  var clock = new THREE.Clock();

  render();

  function render() {
    trackballControls.update(clock.getDelta());
    stats.update();

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}

(function () {
  init();
})();