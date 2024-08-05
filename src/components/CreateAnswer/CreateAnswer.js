import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import classNames from "classnames/bind";
import styles from "./CreateAnswer.css";

const cx = classNames.bind(styles);

function CreateAnswer() {
  const [name, setName] = useState("");
  const [answer, setAnswer] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const imageData = await fetch(
        "http://localhost:4000/api/v1/upload/answer",
        {
          method: "POST",
          body: formData,
        }
      ).then((response) => response.json());

      if (imageData.img_url) {
        const answerData = {
          name: name,
          content: answer,
          image: imageData.img_url,
        };

        const response = await fetch(
          "http://localhost:4000/api/v1/answer/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(answerData),
          }
        );

        if (response.ok) {
          console.log("Answer created successfully");
        } else {
          console.error("Error creating answer");
        }
      } else {
        console.error("Error uploading file");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        CREATE ANSWER
      </Typography>
      <form onSubmit={handleSubmit} className={cx("form")}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Answer"
            variant="outlined"
            multiline={true}
            rows={6}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <Button variant="contained" component="label" fullWidth>
            Upload File
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
        </Box>
        <Box mb={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Box>
      </form>
      <Link to="/">Go to HomePage</Link>
    </Container>
  );
}

export default CreateAnswer;
