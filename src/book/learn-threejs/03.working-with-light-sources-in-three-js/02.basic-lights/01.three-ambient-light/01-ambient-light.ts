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

  // add ambient lighting
  var ambientLight = new THREE.AmbientLight('#606008', 1);
  scene.add(ambientLight);

  // add spotlight for the shadows
  var spotLight = new THREE.SpotLight(0xffffff, 1, 180, Math.PI / 4);
  spotLight.shadow.mapSize.set(2048, 2048);
  spotLight.position.set(-30, 40, -10);
  spotLight.castShadow = true;
  scene.add(spotLight);

  // add a simple scene
  addHouseAndTree(scene);

  // add controls
  var controls = setupControls();

  // call the render function
  render();

  function setupControls() {
    var controls = new (function () {
      this.intensity = ambientLight.intensity;
      this.ambientColor = ambientLight.color.getStyle();
      this.disableSpotlight = false;
    })();

    var gui = new dat.GUI();
    gui.add(controls, 'intensity', 0, 3, 0.1).onChange(function (e) {
      ambientLight.color = new THREE.Color(controls.ambientColor);
      ambientLight.intensity = controls.intensity;
    });
    gui.addColor(controls, 'ambientColor').onChange(function (e) {
      ambientLight.color = new THREE.Color(controls.ambientColor);
      ambientLight.intensity = controls.intensity;
    });
    gui.add(controls, 'disableSpotlight').onChange(function (e) {
      spotLight.visible = !e;
    });

    return controls;
  }

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
