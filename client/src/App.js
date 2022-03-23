import React from "react";
import './App.css';
import io from 'socket.io-client';
import Chat from "./components/Chat/Chat";

const socket = io.connect("http://localhost:5000");

function App() {

  const [userName, setUserName] = React.useState("")
  const [room, setRoom] = React.useState("")
  const [showChat, setShowChat] = React.useState(false);

  const joinRoom = () => {
    if (userName && room) {
      socket.emit("join_room", room);

      setShowChat(true);
    }
  }

  return (
    <div>

      {
        !showChat ?
          <div className="container d-grid gap-2 mt-5 p-5 border">
            <h3 className="text-primary text-center">Join a Chat Room</h3>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-default">User Name</span>
              </div>
              <input
                type="text"
                className="form-control" aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={(event) => setUserName(event.target.value)}
              />
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-default">Room Id</span>
              </div>
              <input
              type="text"
              className="form-control" aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              onChange={(event) => setRoom(event.target.value)}
            />
            </div>

            <button onClick={joinRoom} className="btn btn-primary">Join A Room</button>
          </div> :
          <Chat socket={socket} userName={userName} room={room} />
      }

    </div>
  );
}

export default App;
