import React, { useRef, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { useStoreContext } from '../utils/GlobalStore'

const MessageSelect = () => {
  const [roomName, setRoomName] = useState("");
  const [role, setRole] = useState();
  const [{ id }, dispatch] = useStoreContext()
  const [pageLoaded, setPageLoaded] = useState(false);
  const [loading, setLoading] = useState(true)
  const [chats, setChats] = useState([])
  const [error, setError] = useState(false)

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };
  useEffect(() => {
    async function getData() {
      const data = await fetch(`/api/users/${id}`).then(r => r.json())
      if (data.seller) {
        setRole('seller')
        setLoading(false)
      } else if (data.buyer) {
        setRole('buyer')
        setLoading(false)
      } else (
        setError(true)
      )

      setChats(data.chats)
      setPageLoaded(true)
    }
    getData()
  }, []);
  function buildChats() {
    return (

      <ul>
        {chats.map(function (chat) {
          return <li><Link to={`/messages/${chat.chat}`}>Click here to talk to {chat.partner}</Link></li>
        })}
      </ul>

    )
  }
  return (
    <div >
      <Link to={`/browse`}><i class="fas fa-arrow-left fa-3x"></i></Link>
      <h1>Messages</h1>
      {loading ? <h1>Loading...</h1> : buildChats()}

    </div>
  );
};

export default MessageSelect;