import React from 'react';

const Music = () => {
  return (
    <div className="relative w-full h-full">
      <iframe
        src="https://lofi.cafe/embed"
        width="100%"
        height="100%"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="Lofi Stream"
        className="rounded-lg"
        style={{
          position: 'relative',
          zIndex: 1,
        }}
      />
      {/* Overlay to block unwanted content but still allow interaction */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-black opacity-0"
        style={{
          zIndex: 2, // Keeps overlay above the iframe
          pointerEvents: 'none', // Makes overlay click-through
        }}
      ></div>
    </div>
  );
};

export default Music;
