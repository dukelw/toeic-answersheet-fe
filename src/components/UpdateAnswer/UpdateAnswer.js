import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import classNames from "classnames/bind";
import styles from "./UpdateAnswer.css";
import { updateAnswer, uploadAudio, uploadImage } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createAxios";
import { createTheme, useMediaQuery } from "@mui/material";

const cx = classNames.bind(styles);

function UpdateAnswer() {
  const [name, setName] = useState("");
  const [answer, setAnswer] = useState("");
  const [file, setFile] = useState(null);
  const [audio, setAudio] = useState(null);
  const [image, setImage] = useState(null);
  const [sound, setSound] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const axiosJWT = createAxios(currentUser);
  const { id } = useParams();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleAudioChange = (event) => {
    setAudio(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const answerData = {
      answer_name: name,
      answer_content: answer,
      answer_image: image,
      answer_audio: sound,
    };

    if (file) {
      setIsImageLoading(true);
      const imageData = await uploadImage(file, "", dispatch);

      if (imageData.img_url) {
        answerData.answer_image = imageData.img_url;
      }
      setIsImageLoading(false);
    }

    if (audio) {
      setIsAudioLoading(true);
      const audioData = await uploadAudio(audio, dispatch);

      if (audioData.audio_url) {
        answerData.answer_audio = audioData.audio_url;
      }
      setIsAudioLoading(false);
    }

    const data = {
      name,
      update: answerData,
    };

    await updateAnswer(accessToken, data, dispatch, navigate, axiosJWT);
  };

  const getResults = async () => {
    const response = await fetch(
      `http://localhost:4000/api/v1/answer/find/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getResults();
      setImage(data.image);
      setSound(data.audio);
      setAnswer(data.content);
      setName(data.name);
      console.log(data.audio);
    };
    fetchData();
  }, [id]);

  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>UPDATE ANSWER</h1>
      <form
        style={{ width: isMobile ? "30%" : "100%" }}
        onSubmit={handleSubmit}
        className={cx("form")}
      >
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
        <Box>
          <Typography gutterBottom>Current image</Typography>
          <img
            style={{ width: "100%", objectFit: "cover" }}
            src={image}
            alt="Current answer"
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
          <Typography gutterBottom>Current audio</Typography>
          <audio src={sound} controls></audio>
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

export default UpdateAnswer;
