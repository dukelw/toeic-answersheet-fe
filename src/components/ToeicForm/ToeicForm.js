import { useEffect, useState, useRef } from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import React from "react";
import RadioGroup from "@mui/material/RadioGroup";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Box, Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import classNames from "classnames/bind";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmDelete from "../ConfirmDelete";

import styles from "./ToeicForm.css";
import ScoreCircle from "../ScoreCircle";
import Countdown from "../Countdown";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createAxios";
import { deleteAnswer, getAnswer } from "../../redux/apiRequest";

const cx = classNames.bind(styles);

function ToeicForm() {
  const { id } = useParams();
  const [answers, setAnswers] = useState(Array(200).fill(""));
  const [name, setName] = useState("");
  const [audio, setAudio] = useState("");
  const [results, setResults] = useState(Array(200).fill(""));
  const [trueAnswers, setTrueAnswers] = useState([]);
  const [listeningTrueAnswers, setListeningTrueAnswers] = useState(0);
  const [readingTrueAnswers, setReadingTrueAnswers] = useState(0);
  const listeningScores = [
    5,
    5,
    5,
    10,
    15,
    20,
    25,
    30,
    35,
    40, // 0-9
    45,
    50,
    55,
    60,
    65,
    70,
    75,
    80,
    85,
    90, // 10-19
    95,
    100,
    105,
    110,
    115,
    120,
    125,
    130,
    135,
    140, // 20-29
    145,
    150,
    155,
    160,
    165,
    170,
    175,
    180,
    185,
    190, // 30-39
    195,
    200,
    205,
    210,
    215,
    220,
    225,
    230,
    235,
    240, // 40-49
    245,
    250,
    255,
    260,
    265,
    270,
    275,
    280,
    285,
    290, // 50-59
    295,
    300,
    305,
    310,
    315,
    320,
    325,
    330,
    335,
    340, // 60-69
    345,
    350,
    355,
    360,
    365,
    370,
    375,
    380,
    385,
    390, // 70-79
    395,
    400,
    405,
    410,
    415,
    420,
    425,
    430,
    435,
    440, // 80-89
    445,
    450,
    455,
    460,
    465,
    470,
    475,
    480,
    485,
    490,
    495, // 90-100
  ];
  const readingScores = [
    5,
    15,
    20,
    25,
    30,
    35,
    40,
    45,
    50,
    55, // 0-9
    60,
    65,
    70,
    75,
    80,
    85,
    90,
    95,
    100,
    105, // 10-19
    110,
    115,
    120,
    125,
    130,
    135,
    140,
    145,
    150,
    155, // 20-29
    160,
    165,
    170,
    175,
    180,
    185,
    190,
    195,
    200,
    205, // 30-39
    210,
    215,
    220,
    225,
    230,
    235,
    240,
    245,
    250,
    255, // 40-49
    260,
    265,
    270,
    275,
    280,
    285,
    290,
    295,
    300,
    305, // 50-59
    310,
    315,
    320,
    325,
    330,
    335,
    340,
    345,
    350,
    355, // 60-69
    360,
    365,
    370,
    375,
    380,
    385,
    390,
    395,
    400,
    405, // 70-79
    410,
    415,
    420,
    425,
    430,
    435,
    440,
    445,
    450,
    455, // 80-89
    460,
    465,
    470,
    475,
    480,
    485,
    490,
    495,
    495,
    495, // 90-100
  ];
  const audioRef = useRef(null);

  const getResults = async () => {
    const response = await getAnswer(id, dispatch);
    return response;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getResults();
      const answersData = data.content.replace(/, |\s+/g, "");
      setTrueAnswers(answersData);
      setName(data.name);
      setAudio(data.audio);
    };
    fetchData();
  }, [id]);

  const [open, setOpen] = React.useState(false);
  const [submited, setSubmited] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    setSubmited(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAnswerChange = (index, event) => {
    const newAnswers = [...answers];
    newAnswers[index] = event.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let listeningCount = 0;
    let readingCount = 0;

    const newResults = answers.map((answer, index) => {
      if (answer === trueAnswers[index]) {
        // Increate listening and reading correct number
        if (index < 100) {
          listeningCount += 1;
        } else {
          readingCount += 1;
        }
        return true;
      } else {
        return trueAnswers[index];
      }
    });

    setListeningTrueAnswers(listeningCount);
    setReadingTrueAnswers(readingCount);
    setResults(newResults);
    handleOpen();
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const axiosJWT = createAxios(currentUser);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "orange",
    boxShadow: 24,
    p: 4,
  };

  const renderQuestions = (start, end) => {
    let questions = [];
    for (let index = start; index < end; index++) {
      questions.push(
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
          key={`question-${index}`}
        >
          <Typography
            sx={{ marginRight: "12px", fontWeight: "400", fontSize: "16px" }}
            variant="h6"
          >
            Question {index + 1}
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label={`group${index}`}
              name={`group${index}`}
              value={answers[index] || ""}
              onChange={(event) => handleAnswerChange(index, event)}
            >
              {["A", "B", "C", "D"].map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={
                    <Radio
                      sx={{
                        color: "black",
                        "&.Mui-checked": { color: "green" },
                      }}
                    />
                  }
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <input
            type="text"
            className={cx("status")}
            value={results[index]}
            readOnly
            disabled
            style={{
              marginLeft: "12px",
              width: "50px",
              backgroundColor:
                results[index] === true
                  ? "green"
                  : !results[index]
                    ? "white"
                    : "red",
              color: "white",
              userSelect: "none",
            }}
          />
        </Box>
      );
    }
    return questions;
  };

  const handlePrintResult = () => {
    const element = document.body;

    html2canvas(element, { useCORS: true })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210; // Width of PDF (A4)
        const pageHeight = 297; // Length of PDF (A4)
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Image ratio
        let heightLeft = imgHeight;

        let position = 0;

        // Draw each part of image in PDF
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        const listeningScore =
          listeningScores[
            listeningTrueAnswers - 1 >= 0 ? listeningTrueAnswers - 1 : 0
          ];
        const readingScore =
          readingScores[
            readingTrueAnswers - 1 >= 0 ? readingTrueAnswers - 1 : 0
          ];
        const totalScore = listeningScore + readingScore;
        pdf.save(`${name}_${totalScore}.pdf`);
      })
      .catch(() => {
        alert(
          "This function supports only Chrome, Firefox, Safari and Edge browsers, sorry!"
        );
      });
  };

  const handleDelete = async () => {
    await deleteAnswer(accessToken, id, dispatch, navigate, axiosJWT);
  };

  return (
    <Container style={{ marginTop: "100px" }}>
      <AppBar>
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                HOME
              </Typography>
              <audio src={audio} controls ref={audioRef}></audio>
              <Countdown onClick={handleSubmit} />
            </Box>
            <Button
              sx={{ position: "fixed", bottom: "12%", right: "5%" }}
              variant="contained"
              color="primary"
            >
              <Link className={cx("edit-btn")} to={`/update/${id}`}>
                <EditIcon />
              </Link>
            </Button>
            <Button
              sx={{ position: "fixed", bottom: "4%", right: "5%" }}
              variant="contained"
              color="primary"
            >
              <Link className={cx("edit-btn")}>
                <ConfirmDelete onDelete={handleDelete} />
              </Link>
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Typography sx={{ marginBottom: "20px" }} variant="h2">
        {name}
      </Typography>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Your result
              </Typography>
              <Typography
                id="transition-modal-description"
                sx={{
                  mt: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "space-between",
                }}
              >
                <Typography
                  sx={{
                    mt: 0,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    The number of correct in Listening Part:{" "}
                    <Button>{listeningTrueAnswers}</Button>
                  </div>
                  <div>
                    The number of correct in Listening Part:{" "}
                    <Button>{readingTrueAnswers}</Button>
                  </div>
                </Typography>
                <Typography
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "0",
                  }}
                >
                  <div>
                    TOEIC Listening score:{" "}
                    <Button>
                      {
                        listeningScores[
                          listeningTrueAnswers - 1 >= 0
                            ? listeningTrueAnswers - 1
                            : 0
                        ]
                      }
                    </Button>
                  </div>
                  <div>
                    TOEIC Reading score:{" "}
                    <Button>
                      {
                        readingScores[
                          readingTrueAnswers - 1 >= 0
                            ? readingTrueAnswers - 1
                            : 0
                        ]
                      }
                    </Button>
                  </div>
                </Typography>
                <Typography sx={{ marginTop: "0" }}>
                  Total:{" "}
                  <Button>
                    {listeningScores[
                      listeningTrueAnswers - 1 >= 0
                        ? listeningTrueAnswers - 1
                        : 0
                    ] +
                      readingScores[
                        readingTrueAnswers - 1 >= 0 ? readingTrueAnswers - 1 : 0
                      ]}
                    /990
                  </Button>
                </Typography>
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </div>
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Box>
          <Typography
            sx={{
              fontSize: "20px",
              textAlign: "left",
              fontWeight: "600",
              marginBottom: "12px",
            }}
            variant="h4"
          >
            Listening Part 1
          </Typography>
          {renderQuestions(0, 6)}
          <Typography
            sx={{
              fontSize: "20px",
              textAlign: "left",
              fontWeight: "600",
              marginBottom: "12px",
              marginTop: "4px",
            }}
            variant="h4"
          >
            Listening Part 2
          </Typography>
          {renderQuestions(6, 31)}
          <Typography
            sx={{
              fontSize: "20px",
              textAlign: "left",
              fontWeight: "600",
              marginBottom: "12px",
              marginTop: "4px",
            }}
            variant="h4"
          >
            Listening Part 3
          </Typography>
          {renderQuestions(31, 70)}
          <Typography
            sx={{
              fontSize: "20px",
              textAlign: "left",
              fontWeight: "600",
              marginBottom: "8px",
              marginTop: "4px",
            }}
            variant="h4"
          >
            Listening Part 4
          </Typography>
          {renderQuestions(70, 100)}
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: "20px",
              textAlign: "left",
              fontWeight: "600",
              marginBottom: "12px",
            }}
            variant="h4"
          >
            Reading Part 5
          </Typography>
          {renderQuestions(100, 130)}
          <Typography
            sx={{
              fontSize: "20px",
              textAlign: "left",
              fontWeight: "600",
              marginBottom: "12px",
              marginTop: "4px",
            }}
            variant="h4"
          >
            Reading Part 6
          </Typography>
          {renderQuestions(130, 146)}
          <Typography
            sx={{
              fontSize: "20px",
              textAlign: "left",
              fontWeight: "600",
              marginBottom: "12px",
              marginTop: "4px",
            }}
            variant="h4"
          >
            Reading Part 7
          </Typography>
          {renderQuestions(146, 200)}
        </Box>
        <Box
          sx={{
            display: submited ? "flex" : "none",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "15px",
            padding: "12px",
            backgroundColor: "#f5f5f5",
            height: "fit-content",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              textAlign: "left",
              fontWeight: "600",
              marginBottom: "12px",
            }}
            variant="h4"
          >
            Result
          </Typography>
          <ScoreCircle
            score={
              listeningScores[
                listeningTrueAnswers - 1 >= 0 ? listeningTrueAnswers - 1 : 0
              ] +
              readingScores[
                readingTrueAnswers - 1 >= 0 ? readingTrueAnswers - 1 : 0
              ]
            }
          />
          <div className={cx("result-container")}>
            <div className={cx("result-part")}>
              <span className={cx("result-part__title")}>
                Listening correct
              </span>
              <span className={cx("result-part__right")}>
                {listeningTrueAnswers}
              </span>
            </div>
            <div className={cx("result-part")}>
              <span className={cx("result-part__title")}>Reading correct</span>
              <span className={cx("result-part__right")}>
                {readingTrueAnswers}
              </span>
            </div>
          </div>
          <Button
            sx={{ marginTop: "20px" }}
            variant="contained"
            color="primary"
            onClick={handlePrintResult}
          >
            Print result
          </Button>
        </Box>
      </Box>
      <Button
        sx={{ marginBottom: "20px" }}
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Container>
  );
}

export default ToeicForm;
