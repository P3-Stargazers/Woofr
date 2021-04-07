import React, { useEffect, useState } from "react";
import SellerForm from "../../components/Seller/SellerForm.js";
import BuyerForm from "../../components/Buyer/BuyerForm.js";
import Logo from "../../components/GreenLogo/greenLogo.js";
import "./UserCreation.css";
import { Redirect, Link } from 'react-router-dom'

function UserCreation(props) {
  const [userStatus, setUserStatus] = useState("");
  const [completedBuyer, setCompletedBuyer] = useState(false)
  const [completedSeller, setCompletedSeller] = useState(false)

  function setSeller() {
    setUserStatus("Seller");
  }

  function setBuyer() {
    setUserStatus("Buyer");
  }
  function buildBody() {
    switch (userStatus) {
      case "":
        return;
      case "Seller":
        return <SellerForm complete={completeSeller} />;
      case "Buyer":
        return <BuyerForm complete={completeBuyer} />
    }
  }

  function completeSeller() {
    setCompletedSeller(true)
  }
  function completeBuyer() {
    setCompletedBuyer(true)
  }

  useEffect(function () {
    document.body.style.backgroundColor = "white"; // Set the style
  }, []);
  return (
    <div>
      { completedBuyer ? <Redirect to='/browse' /> : ''}
      { completedSeller ? <Redirect to='/messages' /> : ''}
      <Logo />
      <div id="buttons" class="form-check">
        <div >
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            onClick={setBuyer}
          />
          <div id="innerbutton">
            <label
              id="buysell"
              className="form-check-label"
              for="flexRadioDefault1"
            >
              Buying
                </label>
          </div>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            onClick={setSeller}
          />
          <div id="innerbutton">
            <label
              id="buysell"
              className="form-check-label"
              for="flexRadioDefault2"
            >
              Selling
                  </label>
          </div>
        </div>
      </div>
      {buildBody()}
    </div>
  );
}

export default UserCreation;
