import { useCallback } from 'react';
import Peer from 'simple-peer';
import { socket } from '../utils/socket';
import { useVideo } from '../context/VideoContext';

export const useCallActions = (userVideoRef, connectionRef) => {
  const { stream, me, name, callState, setCallState } = useVideo();

  const callUser = useCallback((id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name
      });
    });

    peer.on("stream", (remoteStream) => {
      userVideoRef.current.srcObject = remoteStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallState(prev => ({ ...prev, accepted: true }));
      peer.signal(signal);
    });

    connectionRef.current = peer;
  }, [stream, me, name, setCallState]);

  const answerCall = useCallback(() => {
    setCallState(prev => ({
      ...prev,
      accepted: true,
      receiving: false
    }));

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", {
        signal: data,
        to: callState.caller
      });
    });

    peer.on("stream", (remoteStream) => {
      userVideoRef.current.srcObject = remoteStream;
    });

    peer.signal(callState.callerSignal);
    connectionRef.current = peer;
  }, [stream, callState.caller, callState.callerSignal, setCallState]);

  const leaveCall = useCallback(() => {
    setCallState(prev => ({ ...prev, ended: true }));
    if (connectionRef.current) {
      connectionRef.current.destroy();
    }
    window.location.reload();
  }, [setCallState]);

  return { callUser, answerCall, leaveCall };
};
