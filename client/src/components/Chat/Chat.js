import React, { useEffect, useState } from 'react'

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
        <div className='container'>
            <div>
                <h2 className="text-primary text-center">Let's Chat</h2>
            </div>
            <div className='w-50 mx-auto shadow rounded p-2 bg-dark'>
                <div style={{ height:"80vh", overflowY: "auto" }}>
                    {
                        messageList.map((messageData, index) => (<div key={index} className={(userName === messageData.author) ? "d-flex justify-content-end" : "d-flex justify-content-start"}>
                            <div className={(userName === messageData.author) ? "bg-light px-4 py-1 my-1 rounded-pill" : "bg-info px-4 my-1 rounded-pill text-white"}>
                                <h5 className='m-0'>{messageData.message}</h5>
                                <p className='m-0'>{messageData.author} <small>{messageData.time}</small></p>
                            </div>
                        </div>))
                    }
                </div>
                <div className='row'>
                    <div className='w-100 d-flex'>
                        <input
                            className='form-control'
                            value={typedMessage}
                            type="text"
                            placeholder="Type message....."
                            onChange={(event) => setTypedMessage(event.target.value)}
                        />
                        <button className='btn btn-primary' onClick={sendMessage}><i className="fa fa-arrow-right"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat