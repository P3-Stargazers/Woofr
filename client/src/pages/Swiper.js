import React, { useRef, useEffect, useState } from 'react'

function Swiper() {

    [sellerData, setSellerData] = useState()

    useEffect(() => {
        const data = await fetch("/api/sellers").then(r => r.json())
    }, []);

    return (
        <h1>test</h1>
    )
}