import React from 'react';
import { VideoProvider } from './context/VideoContext';
import VideoChat from './components/VideoChat';

export default function App() {
  return (
    <VideoProvider>
      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <VideoChat />
        </div>
      </div>
    </VideoProvider>
  );
}