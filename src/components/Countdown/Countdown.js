import classNames from "classnames/bind";
import styles from "./Countdown.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const cx = classNames.bind(styles);

function Countdown({ onClick = () => {} }) {
  const [time, setTime] = useState(75 * 60);
  const [start, setStart] = useState(false);

  useEffect(() => {
    let timerId;
    if (start && time > 0) {
      timerId = setTimeout(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (time === 0 && start) {
      onClick();
      setStart(false);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [start, time, onClick]);

  const handleToggleStart = () => {
    setStart(!start);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {start ? (
        <PauseIcon sx={{ fontSize: "32px" }} onClick={handleToggleStart} />
      ) : (
        <PlayArrowIcon sx={{ fontSize: "32px" }} onClick={handleToggleStart} />
      )}
      <Typography
        sx={{ marginLeft: "20px", fontSize: "40px", fontWeight: "700" }}
      >
        {formatTime(time)}
      </Typography>
    </Box>
  );
}

export default Countdown;
