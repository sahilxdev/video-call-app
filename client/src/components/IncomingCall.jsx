import React from 'react';
import { PhoneIcon, PhoneXMarkIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useVideo } from '../context/VideoContext';
import { useCallActions } from '../hooks/useCallActions';

export default function IncomingCall() {
  const { callState, setCallState } = useVideo();
  const { answerCall } = useCallActions();

  if (!callState.receiving || callState.accepted) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">{callState.callerName} is calling...</h3>
          <button
            onClick={() => setCallState(prev => ({ ...prev, receiving: false }))}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={answerCall}
            className="bg-green-500 text-white px-6 py-2 rounded-full flex items-center space-x-2 hover:bg-green-600 transition"
          >
            <PhoneIcon className="h-5 w-5" />
            <span>Answer</span>
          </button>
          <button
            onClick={() => setCallState(prev => ({ ...prev, receiving: false }))}
            className="bg-red-500 text-white px-6 py-2 rounded-full flex items-center space-x-2 hover:bg-red-600 transition"
          >
            <PhoneXMarkIcon className="h-5 w-5" />
            <span>Decline</span>
          </button>
        </div>
      </div>
    </div>
  );
}
