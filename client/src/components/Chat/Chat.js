import React, { useState } from 'react'

const Chat = ({ socket, userName, room }) => {

    const [typedMessage, setTypedMessage] = useState("");

    const sendMessage = async ()=>{
        if(typedMessage)
        {
            const messageData = {
                room,
                author: userName,
                message: typedMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
        }
    }

    return (
        <div>
            <div className='chat-header'>
                <p>Let's Chat</p>
            </div>
            <div className='chat-body'></div>
            <div className='chat-footer'>
                <input 
                type="text" 
                placeholder="Hey....." 
                onChange={(event)=> setTypedMessage(event.target.value)}
                />
                <button>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat