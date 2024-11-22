import React from 'react';
import VideoControls from './VideoControls';
import { useVideo } from '../context/VideoContext';

const VideoPlayer = React.forwardRef(({ isSelf, controls, setControls }, ref) => {
  const { callState } = useVideo();

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">
        {isSelf ? 'My Video' : 'Remote Video'}
      </h2>
      <div className="relative">
        {(!isSelf && !callState?.accepted) ? ( // Optional chaining for callState
          <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">No remote video</p>
          </div>
        ) : (
          <video
            playsInline
            muted={isSelf}
            ref={ref}
            autoPlay
            className="w-full rounded-lg bg-black"
          />
        )}
        {isSelf && controls && setControls && ( // Check if props exist
          <VideoControls
            controls={controls}
            setControls={setControls}
          />
        )}
      </div>
    </div>
  );
});

// Set a display name for better debugging and to satisfy eslint rules
VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;
