import React, { useEffect, useState } from 'react'
import "./Chat.css";

const Chat = ({ socket, userName, room }) => {

    const [typedMessage, setTypedMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (typedMessage) {
            const messageData = {
                room,
                author: userName,
                message: typedMessage,
                time: new Date(Date.now()).getHours() + ":"
                    + new Date(Date.now()).getMinutes()
            }

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setTypedMessage("")
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            // console.log(data);
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    return (
        <div>
            <div className='chat-header'>
                <p>Let's Chat</p>
            </div>
            <div className='chat-body'>
                {
                    messageList.map((messageData, index) => (<div key={index} className={(userName === messageData.author)?"you":"other"}>
                            <h5>{messageData.message}</h5>
                            <p>{messageData.author} <small>{messageData.time}</small></p>
                    </div>))
                }
            </div>
            <div className='chat-footer'>
                <input
                    value={typedMessage}
                    type="text"
                    placeholder="Hey....."
                    onChange={(event) => setTypedMessage(event.target.value)}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat