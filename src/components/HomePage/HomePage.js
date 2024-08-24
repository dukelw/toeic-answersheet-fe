import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { getAllAnswers } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import classNames from "classnames/bind";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Grid, Paper } from "@mui/material";

import styles from "./HomePage.module.scss";

const cx = classNames.bind(styles);

function HomePage() {
  const [content, setContent] = useState([]);
  const dispatch = useDispatch();

  const getContent = async () => {
    const data = await getAllAnswers(dispatch);
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const tests = await getContent();
      setContent(tests);
    };
    fetchData();
  }, []);

  const items = [
    {
      img: "https://toquoc.mediacdn.vn/280518851207290880/2021/11/17/co9-16371265918121873152617-1637131220338-1637131220738965031106.jpg",
      text: "Welcome To Test System",
    },
    {
      img: "https://image.lag.vn/upload/news/21/12/02/giai-thich-ten-cac-nhan-vat-trong-komi-san-wa-comyushou-desu-1_ABWW.jpg",
      text: "Practice Makes Perfect",
    },
    {
      img: "https://animegovn.com/wp-content/uploads/2024/04/review-komi-san-wa-komyushou-desu-9-850x450.jpg",
      text: "We Are Here With You",
    },
  ];

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
          {items.map((item, i) => (
            <Paper
              key={i}
              sx={{
                position: "relative",
                height: { xs: "200px", sm: "300px", md: "400px" },
                backgroundImage: `url(${item.img})`,
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
                {item.text}
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
