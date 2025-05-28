import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import "./Chat.css";

function Chat({ username, room }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState('');

  useEffect(() => {
    socket.emit('join_room', room);

    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on('typing', () => setTypingStatus('Someone is typing...'));
    socket.on('stop_typing', () => setTypingStatus(''));

    return () => {
      socket.off();
    };
  }, [room]);

  const handleSend = () => {
    const data = { room, author: username, message };
    socket.emit('send_message', data);
    setMessages((prev) => [...prev, data]);
    setMessage('');
  };


  const handleTyping = () => {
    socket.emit('typing', room);
  };

  const handleStopTyping = () => {
    socket.emit('stop_typing', room);
  };

  return (
    <div className="chat-container" style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <div className="chat-header">
      <h2>Welcome, {username}!</h2>
      <h4>Room ID: <code>{room}</code></h4>
      </div>

      <div className="chat-body" style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' }}>
        {messages.map((msg, i) => (
          <p key={i}>
            <strong>{msg.author}:</strong> {msg.message}
          </p>
        ))}
      </div>

      <p className="typing-status" style={{ fontStyle: 'italic', color: 'gray' }}>{typingStatus}</p>
        <div className="chat-footer">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleTyping}
        onBlur={handleStopTyping}
        placeholder="Type your message..."
        style={{ width: '70%', padding: '8px' }}
      />
      <button className="send-btn" onClick={handleSend} style={{ padding: '8px 12px', marginLeft: '8px' }}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
