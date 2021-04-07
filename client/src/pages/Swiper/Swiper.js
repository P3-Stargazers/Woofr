import React, { useRef, useEffect, useState } from 'react'
import SwiperContent from '../../components/SwiperContent/SwiperContent.js'
import "./Swiper.css"
import { Redirect, Link } from 'react-router-dom'
import { useStoreContext } from '../../utils/GlobalStore'
import { v4 as uuidv4 } from 'uuid';
import fetchJSON from '../../utils/API'

function Swiper() {
    const [{ id, name }, dispatch ]= useStoreContext()
    const [sellerData, setSellerData] = useState()
    const [pageLoaded, setPageLoaded] = useState(false)
    const [count, setCount] = useState(0)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        async function getData() {
            const data = await fetch("/api/sellers").then(r => r.json())
            setSellerData(data)
            setPageLoaded(true)
            document.body.style.backgroundColor = "white"; // Set the style
        }
        getData()
    }, []);

    function nextPage(){
        if (count < sellerData.length - 1){
            setCount(count + 1)
        } else {
            setCount(0)
        }   
    }
    async function match(){
        const code = uuidv4()
        const sendData = {
            "code": code,
            "buyerId": id,
            "sellerId": sellerData[count].user,
            "msgs": [],
            "buyerName": name,
            "sellerName": sellerData[count].sellerName,
        }
        const response = await fetchJSON( `/api/messages/`, 'post', sendData )
        nextPage()
    }
    function messagesPage(){
        setRedirect(true)
    }
    return (
        <div>
            { redirect ? <Redirect to='/messages' /> : '' }
            {pageLoaded ? <SwiperContent data={sellerData[count]} nextPage={nextPage} messagesPage={messagesPage} buyerId={id} match={match}/> : <h1>Loading...</h1>}
        </div>

    )
}

export default Swiper;