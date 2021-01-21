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


  var scene = new THREE.Scene();

  // create a camera, which defines where we're looking at.
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 50, 110);
  camera.position.set(-50, 40, 50);
  camera.lookAt(scene.position);

  const trackballControls = initTrackballControls(camera, renderer);

  var controls = new (function () {
    this.cameraNear = camera.near;
    this.cameraFar = camera.far;
    this.rotationSpeed = 0.02;
    this.color = 0x00ff00;

    this.removeCube = function () {
      var allChildren = scene.children;
      var lastObject = allChildren[allChildren.length - 1];
      if (lastObject instanceof THREE.Group) {
        scene.remove(lastObject);
      }
    };

    this.addCube = function () {
      var cubeSize = Math.ceil(3 + Math.random() * 3);
      var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

      var meshDepthMaterial = new THREE.MeshDepthMaterial();
      var meshBasicMaterial = new THREE.MeshBasicMaterial({
        color: controls.color,
        transparent: false,
        blending: THREE.MultiplyBlending,
      });
      var cube = THREE.SceneUtils.createMultiMaterialObject(cubeGeometry, [meshBasicMaterial, meshDepthMaterial]);
      cube.children[1].scale.set(0.99, 0.99, 0.99);

      // position the cube randomly in the scene
      cube.position.x = -60 + Math.round(Math.random() * 100);
      cube.position.y = Math.round(Math.random() * 10);
      cube.position.z = -100 + Math.round(Math.random() * 150);

      // add the cube to the scene
      scene.add(cube);
    };

    this.outputObjects = function () {
      console.log(scene.children);
    };
  })();

  var gui = new dat.GUI();
  gui.addColor(controls, 'color');
  gui.add(controls, 'rotationSpeed', 0, 0.5);
  gui.add(controls, 'addCube');
  gui.add(controls, 'removeCube');
  gui.add(controls, 'cameraNear', 0, 100).onChange(function (e) {
    camera.near = e;
    camera.updateProjectionMatrix();
  });
  gui.add(controls, 'cameraFar', 100, 200).onChange(function (e) {
    camera.far = e;
    camera.updateProjectionMatrix();
  });

  var i = 0;
  while (i < 10) {
    controls.addCube();
    i++;
  }

  render();

  function render() {
    stats.update();
    trackballControls.update();

    // rotate the cubes around its axes
    scene.traverse(function (e) {
      if (e instanceof THREE.Group) {
        e.rotation.x += controls.rotationSpeed;
        e.rotation.y += controls.rotationSpeed;
        e.rotation.z += controls.rotationSpeed;
      }
    });

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}

(function () {
  init();
})();
