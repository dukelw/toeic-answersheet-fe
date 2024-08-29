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
import FolderIcon from "@mui/icons-material/Folder";
import QuizIcon from "@mui/icons-material/Quiz";
import PersonIcon from "@mui/icons-material/Person";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { Link } from "react-router-dom";

function Management() {
  const contents = [
    {
      title: "Test",
      href: "/management/test",
      icon: QuizIcon,
      description: "CRUD of the website's test",
    },
    {
      title: "Document",
      href: "/management/document",
      icon: FolderIcon,
      description: "CRUD of the website's document",
    },
    {
      title: "Slider",
      href: "/management/collection",
      icon: ImageIcon,
      description: "Look at the current slider",
    },
    {
      title: "User",
      href: "/management/user",
      icon: PersonIcon,
      description: "For appoint user account to admin",
    },
  ];

  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      maxWidth="md"
    >
      <h1>Website Management</h1>
      <List
        sx={{
          width: "100%",
          maxWidth: isMobile ? "82vw" : 1000,
          bgcolor: "background.paper",
        }}
      >
        {contents?.map((content) => {
          const Icon = content.icon;
          return (
            <Link
              style={{ textDecoration: "none", color: "unset" }}
              to={content.href}
              key={content.title}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Icon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={content.title}
                  secondary={content.description}
                />
                <IconButton>
                  <TravelExploreIcon />
                </IconButton>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Container>
  );
}

export default Management;
