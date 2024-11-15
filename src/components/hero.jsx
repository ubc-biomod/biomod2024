// Import necessary libraries
import React, { useState } from "react";
import ThreeJSComponent from "./threejs.jsx";


// The Hero component
export default function Hero() {
    return(
      <div className="flex flex-col items-center justify-center mt-5">
        <div className="w-[100%] h-[100%] background-image">
          <ThreeJSComponent/>
        </div>
      </div>
    );
}
