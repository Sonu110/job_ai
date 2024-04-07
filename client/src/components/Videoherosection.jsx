import React, { useState, useEffect } from 'react';
import herovideo1  from '../assets/video/herovideo1.mp4'
import placeholderImage from '../assets/images/bg-1.png';

function Videoherosection() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const video = document.createElement('video');
    video.src = herovideo1;
    video.onloadeddata = () => setLoading(false);
    return () => {
      video.onloadeddata = null;
    };
  }, []);

  return (
    <div className="w-full ">
      <div className="relative w-full h-[40vh] mt-10 ">
        {loading ? (
          <img
            src={placeholderImage}
            alt="Placeholder"
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
        ) : (
          <video
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            autoPlay
            loop
            muted
          >
            <source src={herovideo1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-10" />

        {/* Text Overlay */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-20">
          <h1 className="text-3xl lg:text-5xl font-bold text-center">Find job here</h1>
        </div>
      </div>
    </div>
  );
}

export default Videoherosection;
