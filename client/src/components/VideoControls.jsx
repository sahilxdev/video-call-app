import React from 'react';
import { MicrophoneIcon, VideoCameraIcon } from '@heroicons/react/24/solid';
import { useVideo } from '../context/VideoContext';

export default function VideoControls({ controls, setControls }) {
  const { stream } = useVideo();

  const toggleAudio = () => {
    if (stream) {
      stream.getAudioTracks()[0].enabled = !stream.getAudioTracks()[0].enabled;
      setControls(prev => ({ ...prev, isMuted: !prev.isMuted }));
    }
  };

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks()[0].enabled = !stream.getVideoTracks()[0].enabled;
      setControls(prev => ({ ...prev, isVideoOff: !prev.isVideoOff }));
    }
  };

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
      <button
        onClick={toggleAudio}
        className={`p-2 rounded-full ${controls.isMuted ? 'bg-red-500' : 'bg-gray-800'} text-white`}
      >
        <MicrophoneIcon className="h-5 w-5" />
      </button>
      <button
        onClick={toggleVideo}
        className={`p-2 rounded-full ${controls.isVideoOff ? 'bg-red-500' : 'bg-gray-800'} text-white`}
      >
        <VideoCameraIcon className="h-5 w-5" />
      </button>
    </div>
  );
}