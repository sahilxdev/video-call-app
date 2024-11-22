import React, { createContext, useState, useContext, useEffect } from 'react';
import { socket } from '../utils/socket';
import { setupMediaStream } from '../utils/mediaStream';

const VideoContext = createContext();

export const useVideo = () => useContext(VideoContext);

export const VideoProvider = ({ children }) => {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [callState, setCallState] = useState({
    receiving: false,
    accepted: false,
    ended: false,
    caller: "",
    callerSignal: null
  });

  useEffect(() => {
    socket.on("me", (id) => setMe(id));

    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users.filter(([id]) => id !== me));
    });

    socket.on("callUser", (data) => {
      setCallState(prev => ({
        ...prev,
        receiving: true,
        caller: data.from,
        callerName: data.name,
        callerSignal: data.signal
      }));
    });

    setupMediaStream(setStream);

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [me, stream]);

  const value = {
    me,
    stream,
    name,
    setName,
    onlineUsers,
    callState,
    setCallState
  };

  return (
    <VideoContext.Provider value={value}>
      {children}
    </VideoContext.Provider>
  );
};