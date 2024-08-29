import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createAxios";
import { createSlider, uploadImage } from "../../redux/apiRequest";
import { createTheme, Snackbar, useMediaQuery } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./CreateSlider.css";

const cx = classNames.bind(styles);

const CreateSlider = () => {
  const [collection, setCollection] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const axiosJWT = createAxios(currentUser);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const sliderData = {
      collection,
      content,
      image: "",
      link,
    };

    try {
      if (file) {
        setIsImageLoading(true);
        const imageData = await uploadImage(file, "", dispatch);

        if (imageData.img_url) {
          sliderData.image = imageData.img_url;
        }
        setIsImageLoading(false);
      }

      const result = await createSlider(
        accessToken,
        sliderData,
        dispatch,
        navigate,
        axiosJWT
      );

      if (result) {
        setMessage("Slider created successfully!");
        setSnackbarType("success");
        setOpenSnackbar(true);
      } else {
        setMessage(result.message || "Failed to create slider.");
        setSnackbarType("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setMessage("An error occurred while creating the slider.");
      setSnackbarType("error");
      setOpenSnackbar(true);
    }
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
      <h1>CREATE SLIDER</h1>
      <form
        style={{ width: isMobile ? "82vw" : "100%" }}
        onSubmit={handleSubmit}
        className={cx("form")}
      >
        <Box mb={2}>
          <TextField
            fullWidth
            label="Collection"
            variant="outlined"
            value={collection}
            onChange={(e) => setCollection(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Content"
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Link"
            variant="outlined"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <Button variant="contained" component="label" fullWidth>
            {isImageLoading ? (
              <>
                <CircularProgress style={{ color: "#FFFFFF" }} size={24} />
                &nbsp;Updating Image...
              </>
            ) : (
              "Upload Image"
            )}
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
        </Box>
        <Box mb={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Box>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity={snackbarType}
          sx={{ width: "100%" }}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default CreateSlider;
