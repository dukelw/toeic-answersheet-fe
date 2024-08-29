import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { deleteSlider, getByCollections } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./Sliders.module.scss";
import ConfirmDelete from "../ConfirmDelete";
import { createAxios } from "../../createAxios";

const cx = classNames.bind(styles);

function Sliders() {
  const content = useSelector((state) => state.slider.getByCollection.sliders);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const axiosJWT = createAxios(currentUser);
  const { collection } = useParams();

  useEffect(() => {
    getByCollections(collection, dispatch);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = async (id) => {
    await deleteSlider(accessToken, id, dispatch, axiosJWT);
    window.location.reload();
  };

  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));

  return (
    <Container
      sx={{
        width: isTablet ? "72%" : "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Sliders of Collection {collection}</h1>
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
                Content
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#ffffff" }}>
                Link
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
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.slider_content}</TableCell>
                  <TableCell>
                    <Link
                      style={{ color: "#1976d2" }}
                      to={collection.slider_link}
                    >
                      {row.slider_link}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <img
                      src={row.slider_image}
                      alt={row.slider_name}
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
                      to={`/update/slider/${row._id}`}
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
      <Pagination
        count={Math.ceil(content?.length / itemsPerPage)}
        page={page}
        onChange={handleChangePage}
        sx={{ mt: 2 }}
      />
    </Container>
  );
}

export default Sliders;
