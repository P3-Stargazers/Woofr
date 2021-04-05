import React, { useEffect, useState, useRef } from 'react'
import { io } from 'socket.io-client'
import './index.css'

const socket = io()


function Chat() {

    const [chat, setChat] = useState([])
    const msgIn = useRef()

    function getMessages() {
        socket.on('output-messages', data => {
            setChat(data)
        })
    }
    getMessages();
    console.log(`[STATE]`, chat)


    function sendMsg(event) {
        event.preventDefault();
        let newMsg = msgIn.current.value
        socket.emit('chatmessage', newMsg)
        getMessages();
        console.log(`[Submitted new message]: ${newMsg}`)
    }

    // useEffect(() => {
    //     function getMessages() {
    //         socket.on('output-messages', data => {
    //             setChat(data)
    //         })
    //     }
    // }, [])

    return (
        <div className="container">
            <div className="chatWindow">
                {chat.map(msg => {
                    return (
                        <tr className='chMsg'>
                            <th>
                                {socket.id} {msg.msg}
                            </th>
                        </tr>
                    )
                })}
            </div>
            <form>
                <div className="form-group search-widget">
                    <div className="chatArea input-group mb-3">
                        <input className='form-control' ref={msgIn} type='text' placeholder='Chat' />
                        <button className="btn btn-primary" value="test" onClick={sendMsg}>Send</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Chat
