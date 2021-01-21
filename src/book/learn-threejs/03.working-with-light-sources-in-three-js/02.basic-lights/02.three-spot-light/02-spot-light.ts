import { dat, initStats, initTrackballControls, THREE } from '../../../../../common/util.js';

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

  var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xff0000,
  });
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = true;

  // position the cube
  cube.position.x = -4;
  cube.position.y = 3;
  cube.position.z = 0;

  // add the cube to the scene
  scene.add(cube);

  var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  var sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0x7777ff,
  });
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  // position the sphere
  sphere.position.x = 20;
  sphere.position.y = 0;
  sphere.position.z = 2;
  sphere.castShadow = true;

  // add the sphere to the scene
  scene.add(sphere);
  // create the ground plane
  var planeGeometry = new THREE.PlaneGeometry(60, 20, 120, 120);
  var planeMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
  });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;

  // rotate and position the plane
  plane.rotation.x = -((90 * Math.PI) / 180);
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;

  scene.add(plane);

  // add subtle ambient lighting
  var ambiColor = '#1c1c1c';
  var ambientLight = new THREE.AmbientLight(ambiColor);
  scene.add(ambientLight);

  // add spotlight for a bit of light
  var spotLight0 = new THREE.SpotLight(0xcccccc);
  spotLight0.position.set(-40, 30, -10);
  spotLight0.lookAt(plane.position);
  scene.add(spotLight0);

  // add target and light
  var target = new THREE.Object3D();
  target.position.copy(new THREE.Vector3(5, 0, 0));

  var spotLight = new THREE.SpotLight('#ffffff');
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  spotLight.shadow.camera.near = 1;
  spotLight.shadow.camera.far = 100;
  spotLight.target = plane;
  spotLight.distance = 0;
  spotLight.angle = 0.4;
  spotLight.shadow.camera.fov = 120;
  scene.add(spotLight);

  var cameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);

  var spotLightHelper = new THREE.SpotLightHelper(spotLight);
  scene.add(spotLightHelper);

  // add a small sphere simulating the pointlight
  var sphereLight = new THREE.SphereGeometry(0.2);
  var sphereLightMaterial = new THREE.MeshBasicMaterial({
    color: '#ac6c25',
  });
  var sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial);
  sphereLightMesh.castShadow = true;

  sphereLightMesh.position.copy(new THREE.Vector3(3, 20, 3));
  scene.add(sphereLightMesh);

  // for controlling the rendering
  var step = 0;
  var invert = 1;
  var phase = 0;

  var controls = setupControls();
  render();

  function setupControls() {
    var controls = new (function () {
      this.rotationSpeed = 0.03;
      this.bouncingSpeed = 0.03;
      this.ambientColor = ambiColor;
      this.pointColor = spotLight.color.getStyle();
      this.intensity = 1;
      this.distance = 0;
      this.angle = 0.1;
      this.shadowDebug = false;
      this.castShadow = true;
      this.target = 'Plane';
      this.stopMovingLight = false;
      this.penumbra = 0;
    })();

    var gui = new dat.GUI();
    gui.addColor(controls, 'ambientColor').onChange(function (e) {
      ambientLight.color = new THREE.Color(e);
    });

    gui.addColor(controls, 'pointColor').onChange(function (e) {
      spotLight.color = new THREE.Color(e);
    });

    gui.add(controls, 'angle', 0, Math.PI * 2).onChange(function (e) {
      spotLight.angle = e;
    });

    gui.add(controls, 'intensity', 0, 5).onChange(function (e) {
      spotLight.intensity = e;
    });

    gui.add(controls, 'penumbra', 0, 1).onChange(function (e) {
      spotLight.penumbra = e;
    });

    gui.add(controls, 'distance', 0, 200).onChange(function (e) {
      spotLight.distance = e;
    });

    gui.add(controls, 'shadowDebug').onChange(function (e) {
      if (e) {
        scene.add(cameraHelper);
      } else {
        scene.remove(cameraHelper);
      }
    });

    gui.add(controls, 'castShadow').onChange(function (e) {
      spotLight.castShadow = e;
    });

    gui.add(controls, 'target', ['Plane', 'Sphere', 'Cube']).onChange(function (e) {
      switch (e) {
        case 'Plane':
          spotLight.target = plane;
          break;
        case 'Sphere':
          spotLight.target = sphere;
          break;
        case 'Cube':
          spotLight.target = cube;
          break;
      }
    });

    gui.add(controls, 'stopMovingLight').onChange(function (e) {
      this.stopMovingLight = e;
    });

    return controls;
  }

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

    // move the light simulation
    if (!controls.stopMovingLight) {
      if (phase > 2 * Math.PI) {
        invert = invert * -1;
        phase -= 2 * Math.PI;
      } else {
        phase += controls.rotationSpeed;
      }
      sphereLightMesh.position.z = +(7 * Math.sin(phase));
      sphereLightMesh.position.x = +(14 * Math.cos(phase));
      sphereLightMesh.position.y = 15;

      if (invert < 0) {
        var pivot = 14;
        sphereLightMesh.position.x = invert * (sphereLightMesh.position.x - pivot) + pivot;
      }

      spotLight.position.copy(sphereLightMesh.position);
    }

    spotLightHelper.update();
    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}

init();
