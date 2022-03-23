import React from "react";
import './App.css';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:5000");

function App() {

  const [userName, setUserName] = React.useState("")
  const [room, setRoom] = React.useState("")

  const joinRoom = ()=>{
    if(userName && room)
    {
      console.log(userName, room);
    }
  }

  return (
    <div className="App">

      <h3>Join a Chat</h3>

      <input 
      type="text" 
      placeholder="John..." 
      onChange={(event)=> setUserName(event.target.value)}
      />

      <input 
      type="text" 
      placeholder="Room ID..." 
      onChange={(event)=> setRoom(event.target.value)}
      />

      <button onClick={joinRoom}>Join A Room</button>

    </div>
  );
}

export default App;
