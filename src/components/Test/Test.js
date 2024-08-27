import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { getAllAnswers } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import classNames from "classnames/bind";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  createTheme,
  Grid,
  Pagination,
  TextField,
  useMediaQuery,
} from "@mui/material";

import styles from "./Test.module.scss";

const cx = classNames.bind(styles);

function Test() {
  const [content, setContent] = useState([]);
  const [keySearch, setKeySearch] = React.useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const dispatch = useDispatch();

  const getContent = async () => {
    const data = await getAllAnswers(keySearch, dispatch);
    return data;
  };

  const handleSearchChange = (e) => {
    setKeySearch(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const tests = await getContent();
      setContent(tests);
    };
    fetchData();
  }, [keySearch, dispatch]);

  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = content.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container
      sx={{
        marginTop: "40px",
        paddingLeft: { xs: 1, sm: 2 },
        paddingRight: { xs: 1, sm: 2 },
        textAlign: "center",
      }}
    >
      <h1>ALL TEST</h1>

      <TextField
        label="Search Test"
        variant="outlined"
        fullWidth
        sx={{ mb: 3, maxWidth: isMobile ? "90vw" : "100%" }}
        onChange={handleSearchChange}
      />

      <Grid container spacing={2} sx={{ marginTop: "20px" }}>
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
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

export default Test;
