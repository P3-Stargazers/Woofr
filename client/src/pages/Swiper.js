import React, { useRef, useEffect, useState } from 'react'
import SwiperContent from '../components/SwiperContent'
import { Redirect, Link } from 'react-router-dom'
import fetchJSON from '../utils/API'
import { useStoreContext } from '../utils/GlobalStore'


function Swiper() {

    const [{ id }, dispatch] = useStoreContext()
    const [sellerData, setSellerData] = useState()
    const [pageLoaded, setPageLoaded] = useState(false)
    const [count, setCount] = useState(0)
    const [redirect, setRedirect] = useState(false)



    useEffect(() => {
        async function getData() {
            const data = await fetch("/api/sellers").then(r => r.json())
            setSellerData(data)
            setPageLoaded(true)
            console.log(data)
        }
        getData()
    }, []);

    async function nextPage() {
        if (count < sellerData.length - 1) {
            setCount(count + 1)
            //api call to send the seller id and add too the user matchlist or whatever
            let newMatchData = {
                userid: id,
                sellerid: sellerData[count]
            }

            const matchUser = await fetchJSON(
                "/api/matches",
                "post",
                newMatchData
            )

        } else {
            setCount(0)
        }
    }
    function messagesPage() {
        setRedirect(true)
    }
    return (
        <div>
            { redirect ? <Redirect to='/messages' /> : ''}
            {pageLoaded ? <SwiperContent data={sellerData[count]} nextPage={nextPage} messagesPage={messagesPage} /> : <h1>Loading...</h1>}
        </div>

    )
}

export default Swiper;