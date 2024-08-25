import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  useMediaQuery,
  createTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { deleteAnswer, getAllAnswers } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./Answers.module.scss";
import ConfirmDelete from "../ConfirmDelete";
import { createAxios } from "../../createAxios";

const cx = classNames.bind(styles);

function Answers() {
  const [content, setContent] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const axiosJWT = createAxios(currentUser);

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

  const handleDelete = async (id) => {
    await deleteAnswer(accessToken, id, dispatch, axiosJWT);
    window.location.reload();
  };

  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>All answers</h1>
      <TableContainer
        component={Paper}
        sx={{ mt: 3, width: isMobile ? "30%" : "100%" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <TableCell sx={{ fontWeight: "bold", color: "#ffffff" }}>
                ID
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#ffffff" }}>
                Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#ffffff" }}>
                Answer
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#ffffff" }}>
                Image
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#ffffff" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {content?.map((row, index) => (
              <TableRow
                key={row._id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f3f6f9" : "#ffffff",
                  "&:hover": {
                    backgroundColor: "#e3f2fd",
                  },
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Link className={cx("link")} to={`/answersheet/${row._id}`}>
                    {row.answer_name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link className={cx("link")} to={`/answersheet/${row._id}`}>
                    {row.answer_content}
                  </Link>
                </TableCell>
                <TableCell>
                  <img
                    src={row.answer_image}
                    alt={row.answer_name}
                    style={{
                      width: "100px",
                      height: "auto",
                      padding: "5px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                    }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    component={Link}
                    to={`/update/${row._id}`}
                    color="primary"
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton>
                    <ConfirmDelete
                      onDelete={() => handleDelete(row._id)}
                      color="#F44336"
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Answers;
