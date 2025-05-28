import React, { useState } from "react";
import Chat from "./Chat";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username && room) setShowChat(true);
  };

  return (
    <div className="app-container" style={{ textAlign: "center", padding: "40px" }}>
      {!showChat ? (
        <div className="join-container">
          <h2>Join a Chat Room</h2>

          <input
            placeholder="Your Name"
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: "10px", margin: "10px", width: "200px" }}
          />
          <br />

          <input
            placeholder="Enter Room ID"
            onChange={(e) => setRoom(e.target.value)}
            style={{ padding: "10px", margin: "10px", width: "200px" }}
          />
          <br />

          {/* Display room ID before joining */}
          {room && (
            <p>
              <strong>Room ID Preview:</strong> <code>{room}</code>
            </p>
          )}

          <button className="join-button" onClick={joinRoom} style={{ padding: "10px 20px" }}>
            Join Chat
          </button>
        </div>
      ) : (
        <Chat username={username} room={room} />
      )}
    </div>
  );
}

export default App;
