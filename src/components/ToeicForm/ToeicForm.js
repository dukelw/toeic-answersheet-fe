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
import LoginIcon from "@mui/icons-material/Login";
import Modal from "@mui/material/Modal";
import {
  Avatar,
  Box,
  Button,
  createTheme,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
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
import {
  createHistory,
  deleteAnswer,
  getAnswer,
  logout,
} from "../../redux/apiRequest";

const cx = classNames.bind(styles);

function ToeicForm() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
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

  const handleLogout = () => {
    logout(accessToken, userID, dispatch, navigate, axiosJWT);
  };

  const settings = [
    { title: "Profile", href: "" },
    { title: "Account", href: "" },
    { title: "Dashboard", href: "" },
    { title: "Logout", href: "", onClick: handleLogout },
  ];
  const sessions = [
    { title: "Sign in", href: "/signin" },
    { title: "Sign up", href: "/signup" },
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

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

    if (currentUser) {
      const listeningScore =
        listeningScores[listeningCount - 1 >= 0 ? listeningCount - 1 : 0];
      const readingScore =
        readingScores[readingCount - 1 >= 0 ? readingCount - 1 : 0];
      const totalScore = listeningScore + readingScore;
      const data = {
        userID,
        answerID: id,
        score: totalScore,
        answer: answers.join(", "),
      };
      createHistory(accessToken, data, dispatch, axiosJWT);
    }

    setListeningTrueAnswers(listeningCount);
    setReadingTrueAnswers(readingCount);
    setResults(newResults);
    handleOpen();
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const isAdmin = currentUser?.metadata.user.isAdmin;
  const avatar = currentUser?.metadata.user.user_avatar;
  const userID = currentUser?.metadata.user._id;
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const axiosJWT = createAxios(currentUser);

  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? 360 : 800,
    bgcolor: "#1976d2",
    color: "#ffffff",
    boxShadow: 24,
    p: 4,
  };

  const renderQuestions = (start, end) => {
    let questions = [];
    for (let index = start; index < end; index++) {
      questions.push(
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
            justifyContent: isMobile ? "center" : "",
          }}
          key={`question-${index}`}
        >
          <Typography
            sx={{
              marginRight: "12px",
              fontWeight: "400",
              fontSize: "16px",
            }}
            variant="h6"
          >
            {isMobile ? `Q${index + 1}` : `Question ${index + 1}`}
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
              display: isMobile && !submited ? "none" : "block",
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
    await deleteAnswer(accessToken, id, dispatch, axiosJWT);
    navigate("/");
  };

  return (
    <Container
      style={{
        marginTop: "100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <AppBar>
        <Container sx={{ display: "flex", justifyContent: "center" }}>
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
                  display: { md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                HOME
              </Typography>
              <audio
                style={{ display: isMobile ? "none" : "block" }}
                src={audio}
                controls
                ref={audioRef}
              ></audio>
              <Countdown onClick={handleSubmit} />
              {!currentUser ? (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open options">
                    <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
                      <LoginIcon sx={{ fontSize: "32px" }} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                  >
                    {sessions.map((session) => (
                      <MenuItem key={session.title} onClick={handleCloseMenu}>
                        <Typography textAlign="center">
                          <Link
                            to={session.href}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            {session.title}
                          </Link>
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              ) : (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          avatar
                            ? avatar
                            : "https://i.pinimg.com/736x/49/c6/f1/49c6f19b6c8033d8a83e899d11719f07.jpg"
                        }
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting.title}
                        onClick={handleCloseUserMenu}
                      >
                        <Typography textAlign="center">
                          <Link
                            to={setting.href}
                            style={{ textDecoration: "none", color: "inherit" }}
                            onClick={setting.onClick}
                          >
                            {setting.title}
                          </Link>
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              )}
            </Box>
            {isAdmin ? (
              <Button
                sx={{ position: "fixed", bottom: "12%", right: "5%" }}
                variant="contained"
                color="primary"
              >
                <Link className={cx("edit-btn")} to={`/update/answer/${id}`}>
                  <EditIcon />
                </Link>
              </Button>
            ) : (
              ""
            )}
            {isAdmin ? (
              <Button
                sx={{
                  position: "fixed",
                  bottom: "4%",
                  right: "5%",
                  padding: "2px 0",
                }}
                variant="contained"
                color="primary"
              >
                <ConfirmDelete onDelete={handleDelete} />
              </Button>
            ) : (
              ""
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <audio
        style={{ display: isMobile ? "block" : "none" }}
        src={audio}
        controls
        ref={audioRef}
      ></audio>
      <h1>{name}</h1>
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
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: isMobile ? "center" : "space-between",
                    alignItems: isMobile ? "left" : "center",
                  }}
                >
                  <div>
                    The number of correct in Listening Part:{" "}
                    <Button sx={{ color: "#ffffff" }}>
                      {listeningTrueAnswers}
                    </Button>
                  </div>
                  <div>
                    The number of correct in Listening Part:{" "}
                    <Button sx={{ color: "#ffffff" }}>
                      {readingTrueAnswers}
                    </Button>
                  </div>
                </Typography>
                <Typography
                  sx={{
                    mt: 2,
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: isMobile ? "center" : "space-between",
                    alignItems: isMobile ? "left" : "center",
                    marginTop: "0",
                  }}
                >
                  <div>
                    TOEIC Listening score:{" "}
                    <Button sx={{ color: "#ffffff" }}>
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
                    <Button sx={{ color: "#ffffff" }}>
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
                  <Button sx={{ color: "#ffffff" }}>
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
      <Box
        sx={{
          display: isMobile ? "block" : "flex",
        }}
      >
        <Box
          sx={{
            marginRight: isMobile ? "0" : "20px",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "12px",
              textAlign: isMobile ? "center" : "left",
            }}
            variant="h4"
          >
            Listening Part 1
          </Typography>
          {renderQuestions(0, 6)}
          <Typography
            sx={{
              fontSize: "20px",
              textAlign: isMobile ? "center" : "left",
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
              textAlign: isMobile ? "center" : "left",
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
              textAlign: isMobile ? "center" : "left",
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
              textAlign: isMobile ? "center" : "left",
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
              textAlign: isMobile ? "center" : "left",
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
              textAlign: isMobile ? "center" : "left",
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
            marginLeft: isMobile ? "0px" : "40px",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "15px",
            padding: "12px",
            backgroundColor: "#f5f5f5",
            height: "fit-content",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              textAlign: isMobile ? "center" : "left",
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
        sx={{ marginBottom: "20px", marginTop: "20px" }}
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
