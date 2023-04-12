// To accomplish this, you will need to do the following steps:

// 1. Install the necessary dependencies for React and three.js. You can use npm or yarn to install these packages.

// 2. Load in the three GIF models using three.js's `GLTFLoader`. You can create a `useEffect` hook in your React component to load in the models and add them to the scene.

// 3. Create a `Mesh` object for each of the models and add them to the scene.

// 4. Add an event listener to each `Mesh` object to handle mouse clicks. When a `Mesh` object is clicked, set a flag to indicate that it is being clicked on.

// 5. In your render loop, check the flag for each `Mesh` object to see if it is being clicked on. If it is, update its rotation based on the mouse movement.

// 6. If a `Mesh` object is not being clicked on, update its rotation based on a sine wave function to give the appearance of floating in place.

// Here is some example code to get you started:

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function ThreeModels() {
  const sceneRef = useRef(null);
  const models = useRef([]);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    const loader = new GLTFLoader();
    loader.load("./366_armchair/scene.gltf", (gltf) => {
      const model = gltf.scene.children[0];
      model.position.set(-2, 0, 0);
      scene.add(model);
      models.current.push(model);
      model.addEventListener("mousedown", () => {
        model.isClicked = true;
      });
      model.addEventListener("mouseup", () => {
        model.isClicked = false;
      });
    });

    loader.load("./366_armchair/scene.gltf", (gltf) => {
      const model = gltf.scene.children[0];
      model.position.set(0, 0, 0);
      scene.add(model);
      models.current.push(model);
      model.addEventListener("mousedown", () => {
        model.isClicked = true;
      });
      model.addEventListener("mouseup", () => {
        model.isClicked = false;
      });
    });

    loader.load("./366_armchair/scene.gltf", (gltf) => {
      const model = gltf.scene.children[0];
      model.position.set(2, 0, 0);
      scene.add(model);
      models.current.push(model);
      model.addEventListener("mousedown", () => {
        model.isClicked = true;
      });
      model.addEventListener("mouseup", () => {
        model.isClicked = false;
      });
    });

    const animate = () => {
      requestAnimationFrame(animate);

      models.current.forEach((model) => {
        if (model.isClicked) {
          model.rotation.x += 0.01;
          model.rotation.y += 0.01;
        } else {
          model.rotation.x = Math.sin(Date.now() * 0.001) * 0.5;
          model.rotation.y = Math.sin(Date.now() * 0.001 + 1) * 0.5;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      scene.remove(...scene.children);
      renderer.dispose();
      models.current = [];
    };
  }, []);
  return <div ref={sceneRef} />;
}

export default ThreeModels;
