// Import necessary libraries
import React, { useState } from "react";
import ThreeJSComponent from "./threejs.jsx";


// The Hero component
export default function Hero() {
    return(
      <div className="flex flex-col items-center justify-center mt-5">
        <ThreeJSComponent/>

        {/* Centered YouTube Iframe */}
        <div className="grid grid-cols-1 w-full place-items-center">
          <div className="aspect-video flex justify-center mt-30 md:mt-10 w-3/4">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/tgbNymZ7vqY"
              allowFullScreen
            ></iframe>
          </div>
        </div> 
      </div>
    );
}
