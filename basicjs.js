import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const loader = new GLTFLoader();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const light = new THREE.AmbientLight(0x404040, 13); // soft white light
scene.add(light);
camera.position.z = 4;

const clickedGroups = [];

loader.load("./366_armchair/scene.gltf", (gltf) => {
  const group1 = new THREE.Group();
  const model = gltf.scene;
  model.scale.set(1, 1, 1);
  group1.add(model);
  scene.add(group1);

  const group2 = new THREE.Group();
  loader.load("./366_armchair/scene.gltf", (gltf) => {
    const model = gltf.scene;
    model.scale.set(1, 1, 1);
    model.position.set(3, 3, 3);
    group2.add(model);
    scene.add(group2);

    const group3 = new THREE.Group();
    loader.load("./366_armchair/scene.gltf", (gltf) => {
      model.scale.set(1, 1, 1);
      model.position.set(1, 1, 1);
      group3.add(model);
      scene.add(group3);
    });

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let prevMouse = new THREE.Vector2();

    renderer.domElement.addEventListener("mousedown", (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const object = intersects[0].object;
        let group = object.parent;

        clickedGroups.push(group.parent);
      }
    });

    renderer.domElement.addEventListener("mouseup", () => {
      clickedGroups.length = 0;
    });

    function animate() {
      requestAnimationFrame(animate);

      if (clickedGroups) {
        clickedGroups.forEach((group) => {
          group.rotation.x += 0.01;
          group.rotation.y += 0.01;
        });
      }
      group1.rotation.x += 0.006;
      group1.rotation.y += 0.006;
      group2.rotation.x += 0.006;
      group2.rotation.y += 0.006;
      group3.rotation.x += 0.006;
      group3.rotation.y += 0.006;

      renderer.render(scene, camera);
    }

    animate();
  });
});
