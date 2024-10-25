import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationMixer } from "three";

export default function ThreeJSComponent() {
  const [isAnimating, setIsAnimating] = useState(false);
  const mixerRef = useRef(null); // Store the mixer ref here
  const actionRef = useRef(null); // Store the animation action

  useEffect(() => {
    const container = document.getElementById("threejs-container");
    const WIDTH = 400;
    const HEIGHT = 500;

    // Scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0xffffff); // Set background color to white
    container.appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    let model;

    loader.load(
      "/assets/fridge_w_animation.glb", // Ensure this path is correct
      function (gltf) {
        model = gltf.scene;
        scene.add(model);

        // Initialize AnimationMixer
        mixerRef.current = new AnimationMixer(model);
        const animationClip = THREE.AnimationClip.findByName(gltf.animations, "shrinkAndGrow");

        if (animationClip) {
          actionRef.current = mixerRef.current.clipAction(animationClip);
        }

        model.rotation.y = Math.PI / -2;

        let meshIndex = 0;
        model.traverse((child) => {
          if (child.isMesh) {
            if (meshIndex === 0) {
              child.material = new THREE.MeshStandardMaterial({
                color: 0xd1cdcd,
              });
            } else {
              child.material = new THREE.MeshStandardMaterial({
                color: 0x4f4f4f,
              });
            }
            meshIndex++;
          }
        });
      },
      function (error) {
        console.error("An error happened", error);
      }
    );

    camera.position.z = 4.5;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1); // soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(1, 0.2, 1).normalize();
    scene.add(directionalLight);


    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener("mousemove", (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      // Update model rotation based on mouse position
      if (model) {
        model.rotation.y = (mouseX - Math.PI / 2) * Math.PI * 0.3;
        model.rotation.x = mouseY * Math.PI * -0.3;
      }
    });


    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      if (mixerRef.current) {
        mixerRef.current.update(0.01); // Update the mixer for animations when active
      }

      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(WIDTH, HEIGHT);
    });

    // Cleanup on component unmount
    return () => {
      container.removeChild(renderer.domElement);
    };
  }, []); // Empty dependency array to run this effect only once

  // Toggle animation function
  const toggleAnimation = () => {
    setIsAnimating((prevState) => {
      if (!prevState && actionRef.current) {
        actionRef.current.play(); // Start the animation
      } else if (prevState && actionRef.current) {
        actionRef.current.stop(); // Stop the animation
      }
      console.log(!prevState)
      return !prevState;
    });
  };

  return (
    <>
      <div id="threejs-container" />
      <button onClick={toggleAnimation}>
        {isAnimating ? "Stop Animation" : "Start Animation"}
      </button>
    </>
  );
}