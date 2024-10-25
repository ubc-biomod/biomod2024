import { useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationMixer } from "three";

export default function ThreeJSComponent() {
  const [animationNum, setAnimation] = useState(0); // State to control animation
  const numOfAnimations = 2;

  useEffect(() => {
    // Three.js code
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

    let meshIndex = 0;
    let model;
    let mixer;

    loader.load(
      "/assets/fridge_w_2_animation.glb", // Assuming the model is in the public folder
      function (gltf) {
        model = gltf.scene;
        scene.add(model);

        mixer = new AnimationMixer( model );

        const clip = THREE.AnimationClip.findByName(gltf.animations, "shrinkAndGrow");


        if (clip) {
          const action = mixer.clipAction(clip);
          action.play();
        }

        gltf.scene.traverse((child) => {
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
        // model.rotation.y = Math.PI / -2;
      },
      function (error) {
        console.error("An error happened", error);
      }
    );

    camera.position.z = 4.5;

    const ambientLight = new THREE.AmbientLight(0x404040, 1); // soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(1, 0.2, 1).normalize();
    scene.add(directionalLight);

    // Cursor position
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
      if (mixer && animationNum) {
        mixer.update(0.01); // Update the mixer for animations
      }
      renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(WIDTH, HEIGHT);
    });

    // Cleanup on component unmount
    return () => {
      container.removeChild(renderer.domElement);
    };
  }, [animationNum]);

  // Toggle animation function
  // const toggleAnimation = () => {
  //   setIsAnimating((prevState) => {
  //     if (prevState == 0 && mixer) {
  //       action.play(); // Start the animation
  //     } else if (prevState == 1 && mixer) {
  //       action.stop(); // Stop the animation
  //     }
  //     return (prevState + 1)%2;
  //   });
  // };

  const prevAnimation = () => {
    setAnimation((prevState) => {
      if (prevState > 1) {
        action.play(); // Start the animation
      } else if (prevState == 1) {
        action.stop(); // Stop the animation
      } else {
        return prevState
      }
      return prevState - 1;
    });
  };

  const nextAnimation = () => {
    setAnimation((prevState) => {
      if (prevState < numOfAnimations) {
        action.play(); // Start the animation
      } else {
        return prevState
      }
      return prevState + 1;
    });
  };

  return (
    <>
      <div id="threejs-container" />
      <button onClick={prevAnimation}>
        {"<"}
      </button>
      <button onClick={nextAnimation}>
        {">"}
      </button>
    </>);
}
