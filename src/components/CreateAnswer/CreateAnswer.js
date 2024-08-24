import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import classNames from "classnames/bind";
import styles from "./CreateAnswer.css";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createAxios";
import { createAnswer, uploadAudio, uploadImage } from "../../redux/apiRequest";

const cx = classNames.bind(styles);

function CreateAnswer() {
  const [name, setName] = useState("");
  const [answer, setAnswer] = useState("");
  const [file, setFile] = useState(null);
  const [audio, setAudio] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const axiosJWT = createAxios(currentUser);

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
      setIsImageLoading(true);
      const imageData = await uploadImage(file, "", dispatch);

      if (imageData.img_url) {
        answerData.image = imageData.img_url;
      }
      setIsImageLoading(false);
    }

    if (audio) {
      setIsAudioLoading(true);
      const audioData = await uploadAudio(audio, dispatch);

      if (audioData.audio_url) {
        answerData.audio = audioData.audio_url;
      }
      setIsAudioLoading(false);
    }

    await createAnswer(accessToken, answerData, dispatch, navigate, axiosJWT);
  };

  return (
    <Container>
      <h1>CREATE ANSWER</h1>
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
    </Container>
  );
}

export default CreateAnswer;
