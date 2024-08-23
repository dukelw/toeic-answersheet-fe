import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import classNames from "classnames/bind";
import styles from "./CreateAnswer.css";

const cx = classNames.bind(styles);

function CreateAnswer() {
  const [name, setName] = useState("");
  const [answer, setAnswer] = useState("");
  const [file, setFile] = useState(null);
  const [audio, setAudio] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleAudioChange = (event) => {
    setAudio(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const answerData = {
      name: name,
      content: answer,
      image: "",
      audio: "",
    };

    if (file) {
      const imageFormData = new FormData();
      setIsImageLoading(true);
      imageFormData.append("file", file);
      const imageData = await fetch(
        "http://localhost:4000/api/v1/upload/answer",
        {
          method: "POST",
          body: imageFormData,
        }
      ).then((response) => response.json());

      if (imageData.img_url) {
        answerData.image = imageData.img_url;
      }
      setIsImageLoading(false);
    }

    if (audio) {
      const audioFormData = new FormData();
      setIsAudioLoading(true);
      audioFormData.append("audio", audio);
      const audioData = await fetch(
        "http://localhost:4000/api/v1/upload/answer-audio",
        {
          method: "POST",
          body: audioFormData,
        }
      ).then((response) => response.json());

      if (audioData.audio_url) {
        answerData.audio = audioData.audio_url;
      }
      setIsAudioLoading(false);
    }

    try {
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
            {isImageLoading ? (
              <>
                <CircularProgress style={{ color: "#FFFFFF" }} size={24} />
                &nbsp;Updating Image...
              </>
            ) : (
              "Upload Image"
            )}
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
        </Box>
        <Box mb={2}>
          <Button variant="contained" component="label" fullWidth>
            {isAudioLoading ? (
              <>
                <CircularProgress style={{ color: "#FFFFFF" }} size={24} />
                &nbsp;Updating Audio...
              </>
            ) : (
              "Upload Audio"
            )}
            <input type="file" hidden onChange={handleAudioChange} />
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
