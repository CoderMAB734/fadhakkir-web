import * as THREE from "three";

const img = "../img/moon.png";

class App {
  constructor() {
    this.renderer, this.sphere, (this.camera = undefined);

    this.init();
  }

  init() {
    // scene setup
    this.scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0xecba82, 1);
    this.scene.add(ambientLight);

    this.initCamera();
    this.initRenderer();
    this.createCanvas();
    this.render();
    this.initSphere();
  }

  createCanvas() {
    // canvas conatiner
    const container = document.querySelector(".moon-box");

    // add canvas to dom
    container.appendChild(this.renderer.domElement);
  }

  initRenderer() {
    // WebGL renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    this.renderer.setClearColor(0x000000);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(
      document.querySelector(".moon-box").offsetWidth,
      document.querySelector(".moon-box").offsetHeight
    );
  }

  initCamera() {
    // camera setup
    this.camera = new THREE.PerspectiveCamera(23, 1 / 1, 1, 1000);
    this.camera.position.z = 50;
    this.camera.position.y = 0;
  }

  render() {
    this.renderer.render(this.scene, this.camera);

    if (this.sphere !== undefined) {
      this.sphere.rotation.y += 0.01;
    }

    requestAnimationFrame(() => this.render());
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  initSphere() {
    var texloader = new THREE.TextureLoader();
    texloader.load(img, (tex) => {
      let geometry = new THREE.SphereGeometry(10, 64, 64);
      let material = new THREE.MeshPhongMaterial({
        color: 0xfffffff,
        map: tex,
        shininess: 0,
      });
      this.sphere = new THREE.Mesh(geometry, material);
      this.sphere.rotation.z = 0.5;
      this.scene.add(this.sphere);
    });
  }
}

new App();
