import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { getActiveSliders, getAllAnswers } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import classNames from "classnames/bind";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Grid, Paper } from "@mui/material";

import styles from "./HomePage.module.scss";

const cx = classNames.bind(styles);

function HomePage() {
  const [content, setContent] = useState([]);
  const [slider, setSlider] = useState([]);
  const dispatch = useDispatch();

  const getContent = async () => {
    const data = await getAllAnswers(dispatch);
    return data;
  };

  const getSlider = async () => {
    const data = await getActiveSliders(dispatch);
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const tests = await getContent();
      const sliders = await getSlider();
      setContent(tests);
      setSlider(sliders);
    };
    fetchData();
  }, []);

  return (
    <Container
      sx={{
        marginTop: "40px",
        paddingLeft: { xs: 1, sm: 2 },
        paddingRight: { xs: 1, sm: 2 },
      }}
    >
      <Paper
        sx={{
          display: "block",
        }}
      >
        <Carousel
          infiniteLoop
          autoPlay
          interval={3000}
          showThumbs={false}
          showIndicators={true}
          showStatus={false}
          emulateTouch
          swipeable
        >
          {slider.map((item, i) => (
            <Paper
              key={i}
              sx={{
                position: "relative",
                height: { xs: "200px", sm: "300px", md: "400px" },
                backgroundImage: `url(${item.slider_image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 1,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  position: "absolute",
                  bottom: 20,
                  left: 20,
                  color: "#fff",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  padding: "8px",
                  borderRadius: "4px",
                }}
              >
                {item.slider_content}
              </Typography>
            </Paper>
          ))}
        </Carousel>
      </Paper>

      <h1>ALL TEST</h1>

      <Grid container spacing={2} sx={{ marginTop: "20px" }}>
        {content.length > 0 ? (
          content.map((item) => (
            <Grid item xs={12} sm={12} md={4} lg={2.4} key={item._id}>
              <Link to={`/answersheet/${item._id}`}>
                <Button
                  sx={{
                    width: "100%",
                    marginTop: "12px",
                    marginBottom: "12px",
                  }}
                  variant="contained"
                  color="primary"
                >
                  {item.answer_name}
                </Button>
              </Link>
            </Grid>
          ))
        ) : (
          <Typography>No test available</Typography>
        )}
      </Grid>
    </Container>
  );
}

export default HomePage;
