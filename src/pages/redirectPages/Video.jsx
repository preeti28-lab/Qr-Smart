import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Video = () => {
  const { id } = useParams(); // Get the id from URL params
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Invalid video ID.");
      setLoading(false);
      return;
    }
    
    // Construct the video URL using the base URL and the id
    const videoUrl = `https://sc.qrsmart.us/qq/qrcodes/new/getVideoFile/${id}`;
    setVideoSrc(videoUrl); // Set the video URL dynamically
  }, [id]);

  const handleCanPlay = () => {
    setLoading(false); // Stop loading once the video can start playing
  };

  const handleWaiting = () => {
    setLoading(true); // Show loading when video is buffering
  };

  const handleError = () => {
    setError("Error loading video."); // Handle any errors during playback
    setLoading(false);
  };

  return (
    <>
      <div className="w-full bg-white border-b flex sticky top-0 left-0 z-50 text-[#000000] justify-between items-center py-4 px-8 border-solid border-b-slate-300">
        <h2 className="font-bold text-[35px] md:text-[40px] uppercase text-center w-full">
          qrsmart
        </h2>
      </div>

      <div className="bg-slate-900 h-[100vh] text-white flex items-center justify-center">
        <div className="relative w-[100%] md:w-[50%]  -mt-10 rounded ">
          {/* <h1 className="text-center text-2xl mb-4">Video Streaming</h1> */}
          {loading && <p className="text-center">Loading video...</p>}{" "}
          {/* Show loading message */}
          {error && <p className="text-center text-red-500">{error}</p>}{" "}
          {/* Show error message */}
          {videoSrc && (
            <video
              width="100%"
              height="100%"
              controls
              preload="auto"
              autoPlay
              onCanPlay={handleCanPlay} // Trigger when video is ready to play
              onWaiting={handleWaiting} // Trigger when video is buffering
              onError={handleError} // Handle any video errors
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
    </>
  );
};

export default Video;
