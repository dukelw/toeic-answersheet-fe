import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import classNames from "classnames/bind";
import styles from "./UpdateDocument.css";
import {
  getDocument,
  updateDocument,
  uploadImage,
} from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createAxios";
import { createTheme, useMediaQuery } from "@mui/material";

const cx = classNames.bind(styles);

function UpdateDocument() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const axiosJWT = createAxios(currentUser);
  const { id } = useParams();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const documentData = {
      document_name: name,
      document_content: description,
      document_image: image,
      document_link: link,
    };

    if (file) {
      setIsImageLoading(true);
      const imageData = await uploadImage(file, "", dispatch);

      if (imageData.img_url) {
        documentData.document_image = imageData.img_url;
      }
      setIsImageLoading(false);
    }

    const data = {
      name,
      update: documentData,
    };

    await updateDocument(
      accessToken,
      currentUser.metadata.user._id,
      data,
      dispatch,
      navigate,
      axiosJWT
    );
  };

  const getResults = async () => {
    const response = await getDocument(id, dispatch);
    return response;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getResults();
      setImage(data.image);
      setLink(data.link);
      setDescription(data.content);
      setName(data.name);
    };
    fetchData();
  }, [id]);

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
      <h1>UPDATE DOCUMENT</h1>
      <form
        style={{ width: isMobile ? "30%" : "100%" }}
        onSubmit={handleSubmit}
        className={cx("form")}
      >
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
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
        <Box mb={2} sx={{ textAlign: "center" }}>
          <Typography gutterBottom variant="h6">
            Current Image
          </Typography>
          {image && (
            <img
              src={image}
              alt={name}
              style={{
                width: "100%",
                maxWidth: "600px",
                height: "auto",
                objectFit: "cover",
                marginBottom: "20px",
                borderRadius: "8px",
              }}
            />
          )}
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
    </Container>
  );
}

export default UpdateDocument;
