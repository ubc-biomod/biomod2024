import { useState, useEffect } from "react";

export default function useLockBodyScroll() {
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    // var threeElement = document.getElementById("threejs-container");
    // threeElement.scrollIntoView({behavior:"auto", block: "center", inline:"nearest"});
    document.body.style.overflowY = isLocked ? 'hidden' : 'auto';

    return () => {
      // var threeElement = document.getElementById("threejs-container");
      // threeElement.scrollIntoView({behavior:"auto", block: "center", inline:"nearest"});
      document.body.style.overflowY = 'auto'; // Clean up on unmount
    };
  }, [isLocked]);

  const toggle = (state) => {
    if (state) {
      var threeElement = document.getElementById("threejs-container");
      threeElement.scrollIntoView({behavior:"auto", block: "center", inline:"nearest"});
    }
    setIsLocked(state);
  }
  return [isLocked, toggle];
}