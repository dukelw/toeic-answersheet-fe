import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { getAllAnswers } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";

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
    </Container>
  );
}

export default HomePage;
