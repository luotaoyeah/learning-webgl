import { addHouseAndTree, dat, initStats, initTrackballControls, THREE } from '../../../../../common/util.js';

function init() {
  // use the defaults
  var stats = initStats();
  var renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.getElementById('webgl-output').appendChild(renderer.domElement);

  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.copy(new THREE.Vector3(-30, 40, 30));
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  var trackballControls = initTrackballControls(camera, renderer);

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();

  // add a simple scene
  addHouseAndTree(scene);

  // add subtle ambient lighting
  var ambientLight = new THREE.AmbientLight('#0c0c0c');
  scene.add(ambientLight);

  // the point light where working with
  var pointColor = '#ffccce';
  var pointLight = new THREE.PointLight(pointColor);
  pointLight.decay = 0.1;
  pointLight.castShadow = true;

  scene.add(pointLight);

  var pointLightHelper = new THREE.PointLightHelper(pointLight);
  scene.add(pointLightHelper);

  var cameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
  // scene.add(cameraHelper);

  // add a small sphere simulating the pointlight
  var sphereLight = new THREE.SphereGeometry(0.2);
  var sphereLightMaterial = new THREE.MeshBasicMaterial({ color: pointColor });
  var sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial);
  sphereLightMesh.position.copy(new THREE.Vector3(3, 0, 5));
  scene.add(sphereLightMesh);

  // used to determine the switch point for the light animation
  var invert = 1;
  var phase = 0;

  var controls = setupControls();

  render();

  function setupControls() {
    var controls = new (function () {
      this.rotationSpeed = 0.01;
      this.bouncingSpeed = 0.03;
      this.ambientColor = ambientLight.color.getStyle();
      this.pointColor = pointLight.color.getStyle();
      this.intensity = 1;
      this.distance = pointLight.distance;
    })();

    var gui = new dat.GUI();
    gui.addColor(controls, 'ambientColor').onChange(function (e) {
      ambientLight.color = new THREE.Color(e);
    });

    gui.addColor(controls, 'pointColor').onChange(function (e) {
      pointLight.color = new THREE.Color(e);
    });

    gui.add(controls, 'distance', 0, 100).onChange(function (e) {
      pointLight.distance = e;
    });

    gui.add(controls, 'intensity', 0, 3).onChange(function (e) {
      pointLight.intensity = e;
    });

    return controls;
  }

  function render() {
    pointLightHelper.update();
    cameraHelper.update();
    stats.update();
    trackballControls.update();

    pointLight.position.copy(sphereLightMesh.position);

    // move the light simulation
    if (phase > 2 * Math.PI) {
      invert = invert * -1;
      phase -= 2 * Math.PI;
    } else {
      phase += controls.rotationSpeed;
    }
    sphereLightMesh.position.z = +(25 * Math.sin(phase));
    sphereLightMesh.position.x = +(14 * Math.cos(phase));
    sphereLightMesh.position.y = 5;

    if (invert < 0) {
      var pivot = 14;
      sphereLightMesh.position.x = invert * (sphereLightMesh.position.x - pivot) + pivot;
    }

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}

init();
