import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import {
  Container,
  createTheme,
  IconButton,
  useMediaQuery,
  TextField,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { getAllDocuments } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";

function Document() {
  const [keySearch, setKeySearch] = React.useState("");
  const dispatch = useDispatch();
  const documents = useSelector((state) => state.document.getAll.documents);

  React.useEffect(() => {
    getAllDocuments(keySearch, dispatch);
  }, [dispatch, keySearch]);

  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSearchChange = (e) => {
    setKeySearch(e.target.value);
  };

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>TOEIC Document</h1>
      <TextField
        label="Search Document"
        variant="outlined"
        fullWidth
        sx={{ mb: 3, maxWidth: isMobile ? "82vw" : 800 }}
        onChange={handleSearchChange}
      />
      <List
        sx={{
          width: "100%",
          maxWidth: isMobile ? "82vw" : 800,
          bgcolor: "background.paper",
        }}
      >
        {documents?.map((document) => (
          <ListItem key={document.document_name}>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={document.document_name}
              secondary={document.document_content}
            />
            <IconButton
              component="a"
              href={document.document_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileDownloadIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Document;
