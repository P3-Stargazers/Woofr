import React, { useState, useCallback } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'

let message = ['', 'dfsfsd', 'fsdsfd']

function Chat() {

    const [text, setText] = useState('')
    const setRef = useCallback(node => {
        if (node) {
            node.scrollIntoView({ smooth: true })
        }
    }, [])
    const [selectedConversation, setSelectedConversation] = useState({
        messages: [{
            text: "test",
            fromMe: true,
            senderName: 'Andrew'
        },
        {
            text: 'hello',
            fromMe: false,
            senderName: 'Luca'
        },
        {
            text: "test",
            fromMe: true,
            senderName: 'Andrew'
        },
        {
            text: 'hello',
            fromMe: false,
            senderName: 'Luca'
        },
        ]
    })
    return (
        <div className="d-flex flex-column flex-grow-1" style={{ height: '100vh' }}>
            <div className="flex-grow-1 overflow-auto">
                <div className="d-flex flex-column align-items-start justify-content-end px-3">
                    {selectedConversation.messages.map((message, index) => {
                        const lastMessage = selectedConversation.messages.length - 1 === index
                        return (
                            <div
                                ref={lastMessage ? setRef : null}
                                key={index}
                                className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
                            >
                                <div
                                    className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}>
                                    {message.text}
                                </div>
                                <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>
                                    {message.fromMe ? 'You' : message.senderName}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Form >
                <Form.Group className="m-2">
                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            required
                            value={text}
                            onChange={e => setText(e.target.value)}
                            style={{ height: '75px', resize: 'none' }}
                        />
                        <InputGroup.Append>
                            <Button style={{ height: '75px', resize: 'none' }} type="submit">Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}
export default Chat
