import React, { useRef, useEffect, useState } from "react";
import useChat from "../utils/UseChat";
import fetchJSON from '../utils/API'
import { useStoreContext } from '../utils/GlobalStore'
import { Form, InputGroup, Button } from 'react-bootstrap'

const ChatRoom = (props) => {
  const { roomId } = props.match.params; // Gets roomId from URL
  const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = useState(""); // Message to be sent
  const [oldMessages, setOldMessages] = useState([])
  const [{ id, name }, dispatch] = useStoreContext()

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  async function handleSendMessage() {
    sendMessage(newMessage);
    const sendData = {
      userName: name,
      msg: newMessage,
      userId: id
    }
    const send = await fetchJSON(`/api/messages/${roomId}`, "put", sendData)
    setNewMessage("");
  };

  useEffect(() => {
    async function getData() {
      const data = await fetchJSON(`/api/messages/${roomId}`)
      console.log(data.msgs)
     
      for (var i=0; i < data.msgs.length; i ++ ){
        if (data.msgs[i].userId == id){
          data.msgs[i].ownedByCurrentUser = true
        } else {
          data.msgs[i].ownedByCurrentUser = false
        }
      }
      setOldMessages(data.msgs)
      console.log('here-------->',oldMessages)
    }
    getData()
  }, []);
  return (
    <div className="chat-room-container">
      <div className="d-flex flex-column flex-grow-1" style={{ height: '100vh' }}>
        <div className="flex-grow-1 overflow-auto">
          <div className="d-f;ex flex-column align-items-start justify-content-end px-3">
          {oldMessages.map((message, i) => (
              <div
                key={i}
                className={`my-1 d-flex flex-column ${message.ownedByCurrentUser ? "align-self-end align-items-end" : "align-items-start"
                  }`}
              >
                <div className={`rounded px-2 py-1 ${message.ownedByCurrentUser ? 'bg-primary text-white' : 'border'}`}>
                  {message.msg}
                </div>
                <div className={`text-muted small ${message.ownedByCurrentUser ? 'text-right' : ''}`}>
                  {message.ownedByCurrentUser ? 'You' : message.senderName}
                </div>
              </div>
            ))}
            {messages.map((message, i) => (
              <div
                key={i + oldMessages.length}
                className={`my-1 d-flex flex-column ${message.ownedByCurrentUser ? "align-self-end align-items-end" : "align-items-start"
                  }`}
              >
                <div className={`rounded px-2 py-1 ${message.ownedByCurrentUser ? 'bg-primary text-white' : 'border'}`}>
                  {message.body}
                </div>
                <div className={`text-muted small ${message.ownedByCurrentUser ? 'text-right' : ''}`}>
                  {message.ownedByCurrentUser ? 'You' : message.senderName}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <textarea
              value={newMessage}
              onChange={handleNewMessageChange}
              placeholder="Write message..."
              className="new-message-input-field"
              style={{ height: '75px', resize: 'none', width: "100%" }}
            />
          </div>
          <div className="col-4">
            <button className="btn btn-primary" onClick={handleSendMessage}> <i class="fas fa-comment"></i> </button>
          </div>

        </div>


      </div>
    </div>
  );
};

export default ChatRoom;