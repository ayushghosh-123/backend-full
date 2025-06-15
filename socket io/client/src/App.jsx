import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { Button, Container, TextField, Typography } from '@mui/material';

function App() {
  const socket = useRef(null);

  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      socket.current.emit("message", message);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.current = io("http://localhost:3000");

    socket.current.on("connect", () => {
      console.log("connected", socket.current.id);
    });

    socket.current.on("welcome", (msg) => {
      console.log(msg);
    });

    socket.current.on("receive-message", (s)=>{
      console.log("receive message", s )
    })

    // Cleanup on unmount
    return () => {
      socket.current.disconnect();
    };
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="div" gutterBottom>
        Welcome to Socket.IO
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Enter your message"
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" size="large">
          Send
        </Button>
      </form>
    </Container>
  );
}

export default App;
