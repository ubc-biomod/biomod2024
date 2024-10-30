// Import necessary libraries
import React, { useState } from "react";
import ThreeJSComponent from "./threejs.jsx";
import "../../styles/tailwind.css";


// The Hero component
export default function Hero() {
    return(
      <div className="flex flex-col items-center justify-center space-y-4 mt-5">
        <ThreeJSComponent/>

        {/* Centered YouTube Iframe */}
        <div className="w-[800px] aspect-video flex justify-center mt-50">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/tgbNymZ7vqY"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    );
}
