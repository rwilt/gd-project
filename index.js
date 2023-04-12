import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

const loader = new GLTFLoader();

loader.load(
  "./366_armchair/scene.gltf",
  function (gltf) {
    const model = gltf.scene;
    // model.position.set(5, 0, 0);
    model.scale.set(3, 3, 3);
    scene.add(model);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

loader.load(
  "./366_armchair/scene.gltf",
  function (gltf) {
    const model = gltf.scene;
    model.position.set(5, 0, 0);
    model.scale.set(3, 3, 3);
    scene.add(model);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.5, 0);
controls.update();
controls.enablePan = false;
controls.enableDamping = true;

// scene.add(cube);
const light = new THREE.AmbientLight(0x404040, 13); // soft white light
scene.add(light);
camera.position.z = 4;

function animate() {
  requestAnimationFrame(animate);

  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
