export const setupMediaStream = async (setStream) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      setStream(stream);
      return stream;
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };