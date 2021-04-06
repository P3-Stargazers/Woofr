import React, { useEffect, useState } from "react";
import SellerForm from "../../components/Seller/SellerForm.js";
import BuyerForm from "../../components/Buyer/BuyerForm.js";
import Logo from "../../components/GreenLogo/greenLogo.js";
import "./UserCreation.css";

function UserCreation(props) {
  const [userStatus, setUserStatus] = useState("");

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
        return <SellerForm />;
      case "Buyer":
        return <BuyerForm />;
    }
  }
  return (
    <div>
      <Logo />
      <div id="buttons">
      <div class="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
          onClick={setBuyer}
        />
        <div id="innerbutton">
        <label id="buysell" className="form-check-label" for="flexRadioDefault1">
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
        <label id="buysell" className="form-check-label" for="flexRadioDefault2">
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
