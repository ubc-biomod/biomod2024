// Import necessary libraries
import React, { useState } from "react";
import ThreeJSComponent from "./threejs.jsx";


// The Hero component
export default function Hero() {
    return(
      <div className="flex flex-col items-center justify-center mt-5 background-image w-[100%]">
        <ThreeJSComponent/>

      </div>
    );
}
