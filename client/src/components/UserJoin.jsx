import React from 'react';
import { useVideo } from '../context/VideoContext';
import { socket } from '../utils/socket';

export default function UserJoin() {
  const { name, setName } = useVideo();

  const joinRoom = () => {
    if (name) {
      socket.emit("addUser", name);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="w-full max-w-md p-2 border rounded"
      />
      <button
        onClick={joinRoom}
        className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
      >
        Join Chat
      </button>
    </div>
  );
}