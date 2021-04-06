import React, { useRef, useEffect, useState } from 'react'
import { useStoreContext } from '../utils/GlobalStore'
import { Redirect, Link } from 'react-router-dom'

function Matches() {
    const [{ id }, dispatch] = useStoreContext()
    const [matched, setMatched] = useState([])


    // function openConversation() {
    //     <Redirect to='/chat' />
    // }

    useEffect(() => {
        async function getMatches() {
            const matchData = await fetch(`/api/matches/${id}`).then(r => r.json())
            setMatched(matchData.matchList)
            console.log(`[MY GET]`, matchData.matchList)

        }
        getMatches();

    }, [])

    return (
        <div className="container">
            {matched.map(data => {
                return (
                    <tr>
                        <th>
                            {data.image} {data.dogName}
                        </th>
                    </tr>
                )
            })}
        </div>
    )
}

export default Matches