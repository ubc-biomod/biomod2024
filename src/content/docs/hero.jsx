// Import necessary libraries
import React, { useState } from "react";
import ThreeJSComponent from "./threejs.jsx";
import "../../styles/tailwind.css";


// The Hero component
export default function Hero() {
    return(
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <h1 className="text-3xl font-bold underline text-center">Hero</h1>
        
        {/* Centered 3D Component */}
        <div className="w-[400px] h-[500px] flex justify-center items-center bg-gray-100">
          <ThreeJSComponent />
        </div>

        {/* Centered YouTube Iframe */}
        <div className="w-[800px] aspect-video flex justify-center">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/tgbNymZ7vqY"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    );
}
