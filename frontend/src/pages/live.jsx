// Live.jsx
import * as React from "react";

const Live = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-10 text-black">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            Live Stream
          </h1>
          
          
          {/* 
          <span className="inline-flex items-center gap-2 text-xs md:text-sm px-2.5 py-1 rounded-full bg-green-100 text-green-700">
            <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            Live
          </span>
          */}
        </div>
        <hr className="border-t-3 border-primary" />

        <p className="text-sm md:text-base text-gray-600 mb-4 pt-3">
          Listen to the Barry Masjid live audio stream. If the stream is offline, check back around prayer times.
        </p>
        

        {/* Card */}
        <div className="rounded-xl shadow-md bg-white overflow-hidden">
          {/* Responsive iframe wrapper (16:9) */}
          <div className="relative w-full bg-gray-50 h-55">
            <iframe
              title="Barry Masjid Live"
              className="absolute inset-0 h-full w-full"
              src="https://mymasjid.uk/miniplayer/barrymasjidislamiccentre"
            />
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-between p-3 md:p-4">
            <span className="text-xs text-gray-500">
              Having issues? Try opening in a new tab.
            </span>
            <a
              href="https://mymasjid.uk/live/barrymasjidislamiccentre"
              target="_blank"
              rel="noreferrer"
              className="text-xs md:text-sm font-medium text-primary hover:underline"
            >
              Open full player
            </a>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Live;
