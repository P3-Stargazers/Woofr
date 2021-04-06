import React from "react";
import "./greenLogo.css";
import paw from "./Assets/greenPaw.png";

function Logo() {
  return (
    <>
      <h1 className="container">
      <img src={paw}></img>
        Woofr
      </h1>
    </>
  );
}
export default Logo;
