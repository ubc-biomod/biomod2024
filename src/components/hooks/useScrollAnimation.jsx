import { useEffect, useRef } from "react";

export default function useScrollAnimation(prevAnimation, nextAnimation, isLocked) {
  // Use a ref to keep track of the timeout state
  const COOLDOWN = 1000; // timeout in ms
  const timeoutRef = useRef(false);

  useEffect(() => {
    const handleScroll = (event) => {
      if (timeoutRef.current || !isLocked) return;
      if (event.deltaY < 0) {
        // Scroll up - trigger previous animation
        prevAnimation();
      } else if (event.deltaY > 0) {
        // Scroll down - trigger next animation
        nextAnimation();
      }

      var threeElement = document.getElementById("threejs-container");
      threeElement.scrollIntoView({behavior:"auto", block: "center", inline:"nearest"});
      // Set the timeout flag to true to prevent multiple triggers
      timeoutRef.current = true;

      // Clear the timeout flag after a delay (e.g., 500ms)
      setTimeout(() => {
        timeoutRef.current = false;
      }, COOLDOWN);
    };

    // Add event listener to the window for the `wheel` event
    window.addEventListener("wheel", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [prevAnimation, nextAnimation]);
}