import React, { useEffect, useState } from "react"
import { useStoreContext } from '../utils/GlobalStore'
import SellerForm from '../components/SellerForm'
import BuyerForm from '../components/BuyerForm'
import { Redirect, Link } from 'react-router-dom'

function UserCreation(props) {
    const [userStatus, setUserStatus] = useState("")
    const [completedBuyer, setCompletedBuyer] = useState(false)
    const [completedSeller, setCompletedSeller] = useState(false)
    function setSeller() {
        setUserStatus("Seller")
    }

    function setBuyer() {
        setUserStatus("Buyer")
    }
    function buildBody() {
        switch (userStatus) {
            case "":
                return
            case "Seller":
                return <SellerForm complete={completeSeller} />
            case "Buyer":
                return <BuyerForm complete={completeBuyer}/>
        }
    }
    function completeBuyer(){
        setCompletedBuyer(true)
    }
    function completeSeller(){
        setCompletedSeller(true)
    }
    return (
        <div>
            { completedBuyer ? <Redirect to='/browse' /> : '' }
            { completedSeller ? <Redirect to='/messages' /> : ''}
            <div class="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onClick={setBuyer} />
                <label className="form-check-label" for="flexRadioDefault1">
                    Buying
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onClick={setSeller} />
                <label className="form-check-label" for="flexRadioDefault2">
                    Selling
                </label>
            </div>
            {buildBody()}
        </div>

    )
}

export default UserCreation