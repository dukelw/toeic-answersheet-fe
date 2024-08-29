import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
  Pagination,
  ListItemIcon,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const Ranking = () => {
  const answers = useSelector((state) => state.answer.getAll.answers);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = answers.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));

  return (
    <Container sx={{ mt: 5, width: isTablet ? "72%" : "100%" }}>
      <Typography
        variant="h5"
        align="center"
        sx={{ mb: 3, fontWeight: "bold", color: "#1976d2" }}
      >
        Ranking List
      </Typography>
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        {currentItems.map((answer, index) => (
          <Link
            key={answer.answer_name}
            style={{
              textDecoration: "none",
            }}
            to={`/ranking/${answer._id}`}
          >
            <ListItem
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ListItemIcon
                sx={{
                  padding: "8px",
                  backgroundColor: "#1976d2",
                  color: "#ffffff",
                }}
              >
                <InsertDriveFileIcon color="#ffffff" />
              </ListItemIcon>
              <ListItemText
                sx={{
                  maxWidth: isMobile ? "82vw" : "unset",
                  backgroundColor: "#1976d2",
                  padding: "8px",
                }}
                primary={answer.answer_name}
                primaryTypographyProps={{
                  variant: "body1",
                  fontWeight: "bold",
                  color: "#ffffff",
                  textAlign: "left",
                }}
              />
            </ListItem>
          </Link>
        ))}
      </List>
      <Pagination
        count={Math.ceil(answers.length / itemsPerPage)}
        page={page}
        onChange={handleChangePage}
        sx={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      />
    </Container>
  );
};

export default Ranking;
