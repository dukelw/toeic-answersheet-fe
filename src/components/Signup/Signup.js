import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import classNames from "classnames/bind";
import Cookies from "js-cookie";
import styles from "./Signup.css";
import { signup } from "../../redux/apiRequest";
import { Checkbox, FormControlLabel } from "@mui/material";

const cx = classNames.bind(styles);

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (rememberMe) {
      Cookies.set("email", email, { expires: 7 });
      Cookies.set("password", password, { expires: 7 });
    }
    const user = {
      name,
      email,
      password,
    };
    signup(user, dispatch, navigate);
  };

  return (
    <Container>
      <h1>SIGN UP</h1>
      <form onSubmit={handleSubmit} className={cx("form")}>
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
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                color="primary"
              />
            }
            label="Remember me"
          />
          <Link className={cx("link")} to="/signin">
            Sign in
          </Link>
        </Box>
        <Box mb={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign up
          </Button>
        </Box>
      </form>
      <Link className={cx("link")} to="/">
        Go to HomePage
      </Link>
    </Container>
  );
}

export default Signup;
