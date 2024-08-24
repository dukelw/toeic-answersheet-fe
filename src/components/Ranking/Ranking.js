import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Ranking = () => {
  const answers = useSelector((state) => state.answer.getAll.answers);
  return (
    <Container sx={{ mt: 5, width: "100%" }}>
      <Paper elevation={3} sx={{ padding: 2, borderRadius: 3, width: "100%" }}>
        <Typography
          variant="h5"
          align="center"
          sx={{ mb: 3, fontWeight: "bold", color: "#1976d2" }}
        >
          Ranking List
        </Typography>
        <List>
          {answers.map((answer, index) => (
            <Link
              key={answer.answer_name}
              style={{ textDecoration: "none" }}
              to={`/ranking/${answer._id}`}
            >
              <ListItem key={index} sx={{ mb: 2 }}>
                <ListItemText
                  primary={answer.answer_name}
                  primaryTypographyProps={{
                    variant: "h6",
                    fontWeight: "bold",
                    color: "#424242",
                    textAlign: "center",
                  }}
                />
              </ListItem>
            </Link>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Ranking;
