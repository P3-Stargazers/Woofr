import React, { useRef, useState } from "react";
import RangeSlider from "../RangeSlider/RangeSlider.js";
import { useStoreContext } from "../../utils/GlobalStore";
import fetchJSON from "../../utils/API";
import "./BuyerForm.css"

function BuyerForm(props) {
  const [sizePref, setSizePref] = useState({
    xSmall: false,
    small: false,
    medium: false,
    large: false,
    xLarge: false,
  });
  const [sliderValue, setSliderValue] = useState([0, 20]);
  const [{ alert, id }, dispatch] = useStoreContext();

  const handleSliderChange = (event, newSliderValue) => {
    setSliderValue(newSliderValue);
  };

  const inputMinPrice = useRef();
  const inputMaxPrice = useRef();

  async function submitBuyer() {
    let maxPrice;
    let minPrice;
    if (inputMaxPrice.current.value == "") {
      maxPrice = 99999;
    } else {
      maxPrice = Number(inputMaxPrice.current.value);
    }
    if (inputMinPrice.current.value == "") {
      minPrice = 0;
    } else {
      minPrice = Number(inputMinPrice.current.value);
    }

    var checkArray = [];
    for (var key in sizePref) {
      checkArray.push(sizePref[key]);
    }
    if (!checkArray.includes(true)) {
      for (var key in sizePref) {
        sizePref[key] = true;
      }
    }

    const saveData = {
      priceMax: maxPrice,
      priceMin: minPrice,
      size: sizePref,
      agePref: sliderValue,
    };
    const { status, userData, message } = await fetchJSON(
      `/api/users/buyers/${id}`,
      "put",
      saveData
    );
    props.complete()
  }
  function toggle(setting) {
    sizePref[setting] = !sizePref[setting];
  }
  return (
    <div>
      <div className="input-group mb-3 mt-3">
        <span className="input-group-text" id="name1">
          Minimum Price (Optional)
        </span>
        <input
          type="text"
          className="form-control"
          aria-label="Username"
          aria-describedby="basic-addon1"
          ref={inputMinPrice}
        />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="name1">
          Maximum Price (Optional)
        </span>
        <input
          type="text"
          className="form-control"
          aria-label="Username"
          aria-describedby="basic-addon1"
          ref={inputMaxPrice}
        />
      </div>
      <div id="name1" className="input-group mb-3">
        <RangeSlider
          label="Age Range"
          sliderValue={sliderValue}
          onChangeFunction={handleSliderChange}
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="name1">
          Size Preferences:
        </span>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input m-1"
            type="checkbox"
            id="inlineCheckbox1"
            value="X-Small"
            onClick={() => toggle("xSmall")}
          />
          <label className="form-check-label" for="inlineCheckbox1">
            X-Small
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            value="Small"
            onClick={() => toggle("small")}
          />
          <label className="form-check-label">Small</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            value="Medium"
            onClick={() => toggle("medium")}
          />
          <label className="form-check-label">Medium</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            value="Large"
            onClick={() => toggle("large")}
          />
          <label className="form-check-label">Large</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            value="X-Large"
            onClick={() => toggle("xLarge")}
          />
          <label className="form-check-label">X-Large</label>
        </div>
      </div>
      <button className="btn btn-success" onClick={submitBuyer}>
        Continue
      </button>
    </div>
  );
}

export default BuyerForm;
