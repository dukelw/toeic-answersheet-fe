import { useEffect, useState, useRef } from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import React from "react";
import RadioGroup from "@mui/material/RadioGroup";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import LoginIcon from "@mui/icons-material/Login";
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

import styles from "./Review.css";
import ScoreCircle from "../ScoreCircle";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createAxios";
import CONSTANTS from "../../constants";
import { getAnswer, getHistory, logout } from "../../redux/apiRequest";
import CommentSection from "../CommentSection";
const cx = classNames.bind(styles);

function Review() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { historyID, answerID } = useParams();
  const [answers, setAnswers] = useState(Array(200).fill(""));
  const [name, setName] = useState("");
  const [audio, setAudio] = useState("");
  const [trueAnswers, setTrueAnswers] = useState([]);
  const [listeningTrueAnswers, setListeningTrueAnswers] = useState(0);
  const [readingTrueAnswers, setReadingTrueAnswers] = useState(0);
  const audioRef = useRef(null);
  const { listeningScores, readingScores } = CONSTANTS;

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
    const response = await getAnswer(answerID, dispatch);
    return response;
  };

  const getHistoryResult = async () => {
    const response = await getHistory(userID, answerID, dispatch);
    return response;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getResults();
      const history = await getHistoryResult();
      const answersData = data.content.replace(/, |\s+/g, "");
      const historyData = history.answer.replace(/, |\s+/g, "");
      let listenCount = 0;
      let readCount = 0;
      for (let i = 0; i < 200; i++) {
        if (answersData[i] === historyData[i]) {
          i < 100 ? (listenCount += 1) : (readCount += 1);
        }
      }
      setListeningTrueAnswers(listenCount);
      setReadingTrueAnswers(readCount);
      setTrueAnswers(answersData);
      setAnswers(historyData);
      setName(data.name);
      setAudio(data.audio);
    };
    fetchData();
  }, [historyID, answerID]);

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
            value={trueAnswers[index]}
            readOnly
            disabled
            style={{
              marginLeft: "12px",
              width: "50px",
              backgroundColor:
                answers[index] === trueAnswers[index] ? "green" : "red",
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
        pdf.save(`${name} ${totalScore}.pdf`);
      })
      .catch(() => {
        alert(
          "This function supports only Chrome, Firefox, Safari and Edge browsers, sorry!"
        );
      });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const avatar = currentUser?.metadata.user.user_avatar;
  const userID = currentUser?.metadata.user._id;
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const axiosJWT = createAxios(currentUser);

  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
          </Toolbar>
        </Container>
      </AppBar>
      <audio
        style={{ display: isMobile ? "block" : "none" }}
        src={audio}
        controls
        ref={audioRef}
      ></audio>
      <h1>Review {name}</h1>
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
            display: "flex",
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
      <Box sx={{ mx: "auto", mt: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Comments
        </Typography>
      </Box>
      <CommentSection answerID={answerID} />
    </Container>
  );
}

export default Review;
