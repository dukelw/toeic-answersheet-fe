import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createAxios";
import classNames from "classnames/bind";
import styles from "./Signin.css";
import { signin } from "../../redux/apiRequest";

const cx = classNames.bind(styles);

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      email,
      password,
    };
    signin(user, dispatch, navigate);
  };

  return (
    <Container>
      <h1>SIGN IN</h1>
      <form onSubmit={handleSubmit} className={cx("form")}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Box>
      </form>
      <Link to="/">Go to HomePage</Link>
    </Container>
  );
}

export default Signin;
