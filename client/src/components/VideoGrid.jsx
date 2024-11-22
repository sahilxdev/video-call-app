import React, { useRef, useState } from 'react';
import { useVideo } from '../context/VideoContext';
import VideoControls from './VideoControls';

export default function VideoGrid() {
  const { stream } = useVideo();
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const [controls, setControls] = useState({
    isMuted: false,
    isVideoOff: false
  });

  React.useEffect(() => {
    if (stream && myVideo.current) {
      myVideo.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <VideoPlayer
        ref={myVideo}
        isSelf={true}
        controls={controls}
        setControls={setControls}
      />
      <VideoPlayer
        ref={userVideo}
        isSelf={false}
        connectionRef={connectionRef}
      />
    </div>
  );
}