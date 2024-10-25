import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationMixer } from "three";

export default function ThreeJSComponent() {
  const [animationNum, setAnimation] = useState(0);
  const numOfAnimations = 2;
  const mixerRef = useRef(null); // Store the mixer ref here
  const actionsRef = useRef({}); // Store animation actions in an object

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
      "/assets/fridge_w_2_animation.glb", // Ensure this path is correct
      function (gltf) {
        model = gltf.scene;
        scene.add(model);

        // Initialize AnimationMixer
        mixerRef.current = new AnimationMixer(model);

        // Create actions for all animations in the GLTF
        gltf.animations.forEach((clip) => {
          const action = mixerRef.current.clipAction(clip);
          action.setLoop(THREE.LoopOnce, 1);
          actionsRef.current[clip.name] = action;
        });

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
  }, []);

  // Function to stop all animations
  const stopAllAnimations = () => {
    Object.keys(actionsRef.current).forEach((actionName) => {
      actionsRef.current[actionName].stop();
    });
  };

  // Function to play the selected animation
  const playAnimation = (animationName) => {
    stopAllAnimations();
    if (actionsRef.current[animationName]) {
      actionsRef.current[animationName].reset().play(); // Play the selected animation
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
        /* you can also use 'auto' behaviour 
           in place of 'smooth' */
    });
};

  const prevAnimation = () => {
    setAnimation((prevState) => {
      const newState = prevState > 0 ? prevState - 1 : 0;
      if (newState === 0) {
        stopAllAnimations(); // Stop all animations for idle state
      } else {
        playAnimation(Object.keys(actionsRef.current)[newState - 1]); // Play the corresponding animation
      }
      return newState;
    });
  };

  const nextAnimation = () => {
    setAnimation((prevState) => {
      const newState = prevState < numOfAnimations + 1 ? prevState + 1 : numOfAnimations + 1;
      if (newState > numOfAnimations) {
        scrollToBottom();
        // newState -= 1;
      } else if (newState > 0) {
        playAnimation(Object.keys(actionsRef.current)[newState - 1]); // Play the corresponding animation
      }
      return newState;
    });
  };

  return (
    <>
      <div id="threejs-container" />
      <button onClick={prevAnimation} className="bg-black">{"<"}</button>
      <button onClick={nextAnimation}>{">"}</button>
    </>
  );
}
