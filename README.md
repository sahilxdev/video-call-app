**Video Call App**

This is a basic video calling application built with React and WebRTC. It allows users to:

* **Join a chat room:** Enter a username to join the chat room.
* **View online users:** See a list of other users currently online.
* **Initiate calls:** Click the phone icon next to a user's name to initiate a video call.
* **Answer calls:** Accept incoming calls by clicking the "Answer" button.
* **End calls:** End an ongoing call by clicking the "End Call" button.

**How it works:**

1. **Server:** The server, built with Node.js and Socket.IO, facilitates communication between clients.
2. **Client:** The client, built with React, handles the user interface and WebRTC communication.
3. **WebRTC:** WebRTC technology enables peer-to-peer communication between clients, allowing for direct video and audio streaming.

**To run the app:**

1. **Start the server:**
   ```bash
   node server/index.js