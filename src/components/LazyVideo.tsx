import { useState } from "react";

const LazyVideo = ({ src, poster, ...props }) => {
  const [shouldLoad, setShouldLoad] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!shouldLoad ? (
        <button
          onClick={() => setShouldLoad(true)}
          className="w-full h-full relative focus:outline-none"
        >
          <img
            src={poster}
            alt="Video thumbnail"
            className="w-full h-full object-cover rounded-t-2xl"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-t-2xl transition hover:bg-opacity-50">
            <svg
              className="w-16 h-16 text-white"
              fill="currentColor"
              viewBox="0 0 84 84"
            >
              <circle cx="42" cy="42" r="42" opacity="0.6" />
              <polygon points="33,27 60,42 33,57" fill="white" />
            </svg>
          </div>
        </button>
      ) : (
        <video
          className="w-full h-full object-cover rounded-t-2xl"
          controls
          autoPlay
          poster={poster}
          preload="none"
          {...props}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default LazyVideo;
