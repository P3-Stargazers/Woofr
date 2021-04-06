import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import "./RangeSlider.css";
import { faViacoin } from "@fortawesome/free-brands-svg-icons";

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

export default function RangeSlider(props) {
  const classes = useStyles();

  return (
    <div id="component" className={classes.root}>
      <div className="container">
        <div className="row">
          <div className="col-4 m-0 g-0">
            <Typography id="range-slider" className="field">
              {" "}
              {props.label}{" "}
            </Typography>
          </div>
          <div className="col-8 m-0 g-0">
            <Slider
              className="field ms-2"
              value={props.sliderValue}
              onChange={props.onChangeFunction}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={20}
              id="range-slider"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
