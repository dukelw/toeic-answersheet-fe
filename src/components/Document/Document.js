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
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { getAllDocuments } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";

function Document() {
  const dispatch = useDispatch();
  const documents = useSelector((state) => state.document.getAll.documents);

  React.useEffect(() => {
    getAllDocuments(dispatch);
  }, [dispatch]);

  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      maxWidth="md"
    >
      <h1>TOEIC Document</h1>
      <List
        sx={{
          width: "100%",
          maxWidth: isMobile ? 400 : 600,
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
