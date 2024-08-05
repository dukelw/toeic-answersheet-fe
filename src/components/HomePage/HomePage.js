import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import classNames from "classnames/bind";
import styles from "./HomePage.css";

const cx = classNames.bind(styles);

function HomePage() {
  const [content, setContent] = useState([]);

  const getContent = async () => {
    const response = await fetch("http://localhost:4000/api/v1/answer", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const tests = await getContent();
      setContent(tests);
    };
    fetchData();
  }, []);

  return (
    <Container>
      <h1>ALL TEST</h1>
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {content.length > 0 ? (
          content.map((item) => (
            <Link to={`/answersheet/${item._id}`} key={item._id}>
              <Button
                sx={{
                  minWidth: "190px",
                  marginTop: "12px",
                  marginBottom: "12px",
                }}
                variant="contained"
                color="primary"
              >
                {item.answer_name}
              </Button>
            </Link>
          ))
        ) : (
          <Typography>No test available</Typography>
        )}
      </Container>
      <Link to="/add">
        <Button sx={{ marginTop: "20px" }} variant="contained" color="primary">
          Add new test
        </Button>
      </Link>
    </Container>
  );
}

export default HomePage;
