import React from "react";
import { Box, Typography } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./GuideSection.module.scss";

const cx = classNames.bind(styles);

function GuideSection({ image, content }) {
  return (
    <Box
      className={cx("guide-section")}
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        mb: 4,
        mt: 2,
        width: "100%",
      }}
    >
      <Box
        component="img"
        src={image}
        alt="Guide"
        className={cx("guide-image")}
        sx={{
          width: "100%",
          mb: { xs: 2, sm: 0 },
          mr: { sm: 2 },
        }}
      />
      <Typography className={cx("guide-content")} variant="body1">
        {content}
      </Typography>
    </Box>
  );
}

export default GuideSection;
