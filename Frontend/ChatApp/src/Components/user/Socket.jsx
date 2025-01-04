import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace with your server's URL

function Socket() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        // Listen for messages from the server
        socket.on('message', (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            // Cleanup the socket connection
            socket.off('message');
        };
    }, []);

    const sendMessage = () => {
        socket.emit('message', input);
        setInput('');
    };

    return (
        <div>
            <h1>Socket.io with Vite</h1>
            <div>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message"
                />
                <button onClick={sendMessage}>Send</button>
            </div>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </div>
    );
}

export default Socket;
