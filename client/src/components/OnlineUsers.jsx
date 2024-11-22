import React from 'react';
import { PhoneIcon, PhoneXMarkIcon } from '@heroicons/react/24/solid';
import { useVideo } from '../context/VideoContext';
import { useCallActions } from '../hooks/useCallActions';

export default function OnlineUsers() {
  const { onlineUsers, callState } = useVideo();
  const { callUser, leaveCall } = useCallActions();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Online Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {onlineUsers.map(([id, userName]) => (
          <div key={id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <span className="font-medium">{userName}</span>
            {callState.accepted && !callState.ended ? (
              <button
                onClick={leaveCall}
                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
              >
                <PhoneXMarkIcon className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={() => callUser(id)}
                className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition"
              >
                <PhoneIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}