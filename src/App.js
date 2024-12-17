import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
// import { io } from 'socket.io-client';
// const socket = io.connect('ws://localhost:8765');
// const socket = new WebSocket("ws://localhost:8765");

function App() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(new WebSocket("ws://localhost:8765"));

    useEffect(() => {
        console.log("adding open event listener...");
        socket.addEventListener("open", event => {
            socket.send("Connection established");
        });
        socket.addEventListener("message", event => {
            console.log('updating messages...', event);
            let mess = event.data
            setMessages((prevMessages) => [...prevMessages, mess]);
        });  
    }, []);
    // useEffect(() => {
    //     const handleTabClose = event => {
    //         event.preventDefault();
    //         socket.close();
    //     };
    //     window.addEventListener('beforeunload', handleTabClose);
    //     return () => {
    //         window.removeEventListener('beforeunload', handleTabClose);
    //     };
    // }, [])
    // useEffect(() => {
    //     socket.on('message', (message) => {
    //         console.log('updating messages...');
    //         setMessages((prevMessages) => [...prevMessages, message]);
    //     });
    // }, []);

    const handleMessage = (event) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = () => {
        console.log("sending ", message);
        socket.send(message);
        setMessage('');
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Chat:
                </p>
                <input type="text" value={message} onChange={handleMessage} />
                <button onClick={handleSendMessage}>Send</button>
                <div id="chat-messages" ref={(Element) => (messages.current = Element)}>
                    <p>
                    </p>
                </div>
                <u1>
                    {messages.map((message, index) => {
                        return <li key={index}>{message}</li>
                    })}
                </u1>
            </header>
        </div>
    );
    }

export default App;
