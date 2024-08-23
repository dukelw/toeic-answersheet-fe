import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import style from "./ScoreCircle.css";

const ScoreCircle = ({ score }) => {
  const maxScore = 990;
  const percentage = (score / maxScore) * 100;

  let pathColor;
  let textColor;

  if (percentage <= 30) {
    pathColor = "#F93E3E";
    textColor = "#FF4747";
  } else if (percentage <= 69) {
    pathColor = "#FFD43B";
    textColor = "#FF813A";
  } else {
    pathColor = "#35C758";
    textColor = "#35C758";
  }

  return (
    <div style={{ width: "150px", height: "150px" }}>
      <CircularProgressbar
        value={percentage}
        text={`${score}`}
        styles={buildStyles({
          pathColor: pathColor,
          textColor: textColor,
          trailColor: "#d6d9de",
          textSize: "16px",
          fontFamily: "Roboto, sans-serif",
          fontWeight: "700",
        })}
      />
    </div>
  );
};

export default ScoreCircle;
