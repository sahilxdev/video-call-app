import React from 'react';
import UserJoin from './UserJoin';
import VideoGrid from './VideoGrid';
import OnlineUsers from './OnlineUsers';
import IncomingCall from './IncomingCall';
import { useVideo } from '../context/VideoContext';

export default function VideoChat() {
  const { name } = useVideo();

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-center mb-6">P2P Video Chat</h1>
        {!name ? <UserJoin /> : <VideoGrid />}
      </div>
      {name && <OnlineUsers />}
      <IncomingCall />
    </>
  );
}