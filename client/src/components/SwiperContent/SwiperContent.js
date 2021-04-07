import React from "react";
import Logo from "../GreenLogo/greenLogo.js";
import "./SwiperContent.css";

function SwiperContent(props) {
  return (
    <div className="mb-5">
      <Logo />
      <div className="container text-center mt-4">
        <img
          id="photo"
          className="text-center mb-3"
          src={props.data.image}
          style={{ width: "250px", height: "250px" }}
          alt="no-image"
        />
        <br />
        <button className="btn btn-success m-1 me-4" onClick={props.nextPage}>
          <i class="fas fa-thumbs-down fa-2x"></i>
        </button>
        <button className="btn btn-success m-1 ms-4" onClick={props.match}>
          <i class="fas fa-thumbs-up fa-2x"></i>
        </button>
        <br />
        <button className="btn btn-success m-1 mt-3" onClick={props.messagesPage}>
          <i class="fas fa-comments fa-2x"></i>
        </button>
        <h2 id="h2" className="m-1 mt-3">
          <div id="inline">
            NAME:
            <h3 id="h3" className="ms-2">
              {props.data.dogName}
            </h3>
          </div>
        </h2>
        <h2 id="h2" className="m-1">
          <div id="inline">
            PRICE:
            <h3 id="h3" className="ms-2">
              ${props.data.price}
            </h3>
          </div>
        </h2>
        <h2 id="h2" className="m-1">
          <div id="inline">
            AGE:
            <h3 id="h3" className="ms-2">
              {props.data.age}
            </h3>
          </div>
        </h2>
        <h2 id="h2" className="m-1">
          <div id="inline">
            BREED:
            <h3 id="h3" className="ms-2">
              {props.data.breed}
            </h3>
          </div>
        </h2>
        <p id="h2">
          <div id="inline">
            DESCRIPTION:
            <h3 id="h3" className="ms-2">
              {props.data.description}
            </h3>
          </div>
        </p>
      </div>
    </div>
  );
}

export default SwiperContent;
