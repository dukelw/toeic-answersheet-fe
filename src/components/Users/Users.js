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
  Pagination,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { banUser, findAllUser } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./Users.module.scss";
import ConfirmDelete from "../ConfirmDelete";
import { createAxios } from "../../createAxios";

const cx = classNames.bind(styles);

function Users() {
  const [content, setContent] = useState([]);
  const [keySearch, setKeySearch] = React.useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const axiosJWT = createAxios(currentUser);

  const getContent = async () => {
    const data = await findAllUser(keySearch, dispatch);
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const tests = await getContent();
      setContent(tests.metadata);
    };
    fetchData();
  }, [keySearch]);

  const handleDelete = async (id) => {
    await banUser(
      accessToken,
      currentUser.metadata.user._id,
      id,
      dispatch,
      axiosJWT
    );
    window.location.reload();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearchChange = (e) => {
    setKeySearch(e.target.value);
  };

  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  return (
    <Container
      sx={{
        width: isTablet ? "72%" : "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>All users</h1>
      <TextField
        label="Search User"
        variant="outlined"
        fullWidth
        sx={{ mb: 3, maxWidth: isMobile ? "82vw" : "100%" }}
        onChange={handleSearchChange}
      />
      <TableContainer
        component={Paper}
        sx={{ mt: 3, width: isMobile ? "82vw" : "100%" }}
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
                Birthday
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#ffffff" }}>
                Phone
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#ffffff" }}>
                Role
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#ffffff" }}>
                Image
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#ffffff" }}>
                Ban
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {content
              ?.slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((row, index) => (
                <TableRow
                  key={row._id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f3f6f9" : "#ffffff",
                    "&:hover": {
                      backgroundColor: "#e3f2fd",
                    },
                  }}
                >
                  <TableCell>{(page - 1) * itemsPerPage + index + 1}</TableCell>
                  <TableCell>{row.user_name}</TableCell>
                  <TableCell>{formatDate(row.user_birthday)}</TableCell>
                  <TableCell>{row.user_phone}</TableCell>
                  <TableCell>{row.isAdmin ? "Admin" : "User"}</TableCell>
                  <TableCell>
                    <img
                      src={row.user_avatar}
                      alt={row.user_name}
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
      <Pagination
        count={Math.ceil(content.length / itemsPerPage)}
        page={page}
        onChange={handleChangePage}
        sx={{ mt: 2 }}
      />
    </Container>
  );
}

export default Users;
