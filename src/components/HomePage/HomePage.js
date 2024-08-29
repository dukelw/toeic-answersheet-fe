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
import {
  Grid,
  Paper,
  Pagination,
  createTheme,
  useMediaQuery,
} from "@mui/material";

import styles from "./HomePage.module.scss";

const cx = classNames.bind(styles);

function HomePage() {
  const [content, setContent] = useState([]);
  const [slider, setSlider] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const dispatch = useDispatch();

  const getContent = async () => {
    const data = await getAllAnswers("", dispatch);
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

  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = content.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const theme = createTheme();
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));

  return (
    <Container
      sx={{
        width: isTablet ? "72%" : "100%",
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
          {slider?.map((item, i) => (
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
        {currentItems.length > 0 ? (
          currentItems?.map((item) => (
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

      <Pagination
        count={Math.ceil(content.length / itemsPerPage)}
        page={page}
        onChange={handleChangePage}
        sx={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      />
    </Container>
  );
}

export default HomePage;
