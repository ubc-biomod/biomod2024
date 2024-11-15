import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationMixer } from "three";
import lockBodyScroll from "./hooks/lockBodyScroll";
import useScrollAnimation from "./hooks/useScrollAnimation";

export default function ThreeJSComponent() {
  const [isLocked, toggleScrollLock] = lockBodyScroll();
  // toggle();
  const [animationNum, setAnimation] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [displayText, setDisplayText] = useState([
    "Begin",
    "Scroll to Proceed",
  ]);
  const textDict = [
    ["Phase 1", "Box Formation"],
    ["Phase 2", "Antibody Docking"],
    ["Phase 3", "Open Box"],
  ];

  const numOfAnimations = 3;
  const mixerRef = useRef(null); // Store the mixer ref here
  const actionsRef = useRef({}); // Store animation actions in an object
  const TEXTANIMATIONTIME = 500;

  useEffect(() => {
    // 3D object
    const container = document.getElementById("threejs-container");
    const WIDTH = container.clientWidth;
    const HEIGHT = container.clientHeight;

    // Scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(WIDTH, HEIGHT);
    // renderer.setClearColor(0xffffff); // Set background color to white
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    let model;

    loader.load(
      "/assets/box_for_website.glb", // Ensure this path is correct
      function (gltf) {
        model = gltf.scene;
        // Center the model by calculating its bounding box and re-positioning it
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center.multiplyScalar(0)); // Offset the model to the center

        // model.geometry.center();

        scene.add(model);

        // Initialize AnimationMixer
        mixerRef.current = new AnimationMixer(model);

        // Create actions for all animations in the GLTF
        gltf.animations.forEach((clip) => {
          const action = mixerRef.current.clipAction(clip);
          action.setLoop(THREE.LoopOnce, 1);
          action.clampWhenFinished = true;
          actionsRef.current[clip.name] = action;
          if (clip.name === "Begin") {
            console.log("Begin");
            action.play();
          }
        });

        // model.rotation.y = Math.PI / -2;
      },
      function (error) {
        console.error("An error happened", error);
      },
    );

    camera.position.z = 40;

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
        model.rotation.y = mouseX * Math.PI * 0.6;
        model.rotation.x = mouseY * Math.PI * -0.6;
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
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(WIDTH, HEIGHT);
    });

    // var threeElement = document.getElementById("threejs-container");
    // threeElement.scrollIntoView({behavior:"auto", block: "center", inline:"nearest"});
    setTimeout(() => {
      toggleScrollLock(true);
    }, 1000);

    // Cleanup on component unmount
    return () => {
      container.removeChild(renderer.domElement);
      clearTimeout(fadeTimeout);
      toggleScrollLock(false);
    };
  }, []);

  // Function to stop all animations
  const stopAllAnimations = () => {
    Object.keys(actionsRef.current).forEach((actionName) => {
      actionsRef.current[actionName].stop();
    });
  };

  // Function to play the selected animation
  const playAnimation = (animationName, speed) => {
    stopAllAnimations();
    if (actionsRef.current[animationName]) {
      // const action = mixerRef.current.clipAction(animationName);
      // action.paused = false;
      // action.setLoop(THREE.LoopOnce, 1);
      mixerRef.current.timeScale = speed;
      actionsRef.current[animationName].reset().play(); // Play the selected animatio
    }
    setIsFading(true);
    const timeout = setTimeout(() => {
      setIsFading(false);
      // Optionally change text after animation plays
    }, TEXTANIMATIONTIME); // Match this to the duration of your animation
    return () => clearTimeout(timeout);
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
      /* you can also use 'auto' behaviour 
           in place of 'smooth' */
    });
  };

  const prevAnimation = () => {
    setAnimation((prevState) => {
      const newState = prevState > 0 ? prevState - 1 : 0;
      if (newState === 0) {
        playAnimation("Begin", 1);
        setIsFading(true);
        setDisplayText(["Begin", "Scroll to Proceed"]);
        setIsFading(true);
      } else {
        playAnimation("Phase " + newState, 1); // Play the corresponding animation
        setDisplayText(textDict[newState - 1]);
      }
      return newState;
    });
  };

  const nextAnimation = () => {
    setAnimation((prevState) => {
      const newState =
        prevState < numOfAnimations + 1 ? prevState + 1 : numOfAnimations + 1;
      if (newState > numOfAnimations) {
        toggleScrollLock(false);
        scrollToBottom();
        return prevState;
      } else if (newState > 0) {
        setDisplayText(textDict[newState - 1]);
        playAnimation("Phase " + newState, 1);
      }
      return newState;
    });
  };

  useScrollAnimation(prevAnimation, nextAnimation, isLocked);

  return (
    <div className="grid grid-cols-1 h-screen mb-10 mt-100 place-items-center">
      {/* Circle container */}
      <div className="grid grid-rows-3 grid-cols-3 aspect-square w-3/4 rounded-full gradient-background p-30 place-items-center gap-x-4">
        {/* Title in top right */}
        <div className="text-start row-start-1 col-start-3 lg:row-start-2 lg:col-start-1 text-lg font-bold lg:-ml-40">
          <h1 className="whitespace-nowrap">The AND Box:</h1>
          <span className="glowing-text dark:text-white dark:drop-shadow-none">
            A Targeted Anti-CD3 Delivery System for Prostate Cancer
          </span>
        </div>

        {/* 3D Component Centered */}
        <div className="row-start-2 col-start-1 col-span-3 flex justify-center items-center relative w-full h-full">
          <div className="w-[80%] h-[250%]">
            <div id="threejs-container" className="w-full h-full" />
          </div>
        </div>

        {/* Text in bottom left */}
        <div
          className={`text-center row-start-3 col-start-1 lg:col-start-3 lg:row-start-2 lg:-mr-40 text-lg font-bold transition-all mb-10 duration-${TEXTANIMATIONTIME}} transform ${
            isFading ? "scale-0" : "scale-100"
          }`}
        >
          <h3 className="">
            | <br /> {displayText[0]} <br /> {displayText[1]} <br /> |
          </h3>
        </div>
        <div className="row-start-3 col-start-3 flex justify-end">
          <div className="flex flex-col justify-center content-center mt-15 ml-40">
            <div className="flex justify-center content-center">
              <button
                onClick={prevAnimation}
                className="text-black dark:text-slate-300 hover:text-white -600 transition duration-300 ease-in-out"
              >
                <span className="material-icons">arrow_upward</span>
              </button>
            </div>
            <div className="flex justify-center content-center">
              <button
                onClick={nextAnimation}
                className="text-black hover:text-white dark:text-slate-300 hover:text-white -600 transition duration-300 ease-in-out"
              >
                <span className="material-icons">arrow_downward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
