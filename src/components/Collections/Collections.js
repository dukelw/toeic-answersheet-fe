import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import {
  Container,
  createTheme,
  IconButton,
  useMediaQuery,
  Pagination,
  TextField,
} from "@mui/material";
import CollectionsIcon from "@mui/icons-material/Collections";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteCollection,
  getCollections,
  toggleSlider,
} from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createAxios";
import ConfirmDelete from "../ConfirmDelete";

function Collections() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [keySearch, setKeySearch] = React.useState("");
  const itemsPerPage = 6;

  const contents = useSelector(
    (state) => state.slider.getCollections.collections
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const axiosJWT = createAxios(currentUser);

  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  React.useEffect(() => {
    getCollections(keySearch, dispatch);
  }, [dispatch, keySearch]);

  const handleDelete = async (id) => {
    await deleteCollection(accessToken, id, dispatch, axiosJWT);
    window.location.reload();
  };

  const handleSearchChange = (e) => {
    setKeySearch(e.target.value);
  };

  const formatSecondaryText = (content) => {
    const year = content.slice(0, 4);
    const month = content.slice(5, 7);
    const week = content.slice(9);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return `For week ${week} ${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const handleOn = (collection) => {
    const data = { collection, activate: true };
    toggleSlider(accessToken, data, dispatch, navigate, axiosJWT);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contents?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      maxWidth="md"
    >
      <h1>Slider Collections</h1>
      <TextField
        label="Search Collection"
        variant="outlined"
        fullWidth
        sx={{ mb: 3, maxWidth: isMobile ? "82vw" : "100%" }}
        onChange={handleSearchChange}
      />
      <List
        sx={{
          width: "100%",
          maxWidth: isMobile ? "82vw" : 1000,
          bgcolor: "background.paper",
        }}
      >
        {currentItems?.map((content) => (
          <ListItem
            key={content.slider_collection}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link
              style={{
                textDecoration: "none",
                color: "unset",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
              to={`/management/collection/${content.slider_collection}`}
            >
              <ListItemAvatar>
                <Avatar>
                  <CollectionsIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={"Collection " + content.slider_collection}
                secondary={formatSecondaryText(content.slider_collection)}
                sx={{ flex: 1 }}
              />
            </Link>
            <IconButton
              onClick={() =>
                content.isActive ? "" : handleOn(content.slider_collection)
              }
              sx={{ ml: 2 }}
            >
              {content.isActive ? (
                <ToggleOnIcon sx={{ fontSize: "40px", color: "#1976d2" }} />
              ) : (
                <ToggleOffIcon sx={{ fontSize: "40px" }} />
              )}
            </IconButton>
            <IconButton>
              <ConfirmDelete
                onDelete={() => handleDelete(content.slider_collection)}
                color="#F44336"
              />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Pagination
        count={Math.ceil(contents?.length / itemsPerPage)}
        page={currentPage}
        onChange={handleChangePage}
        sx={{ mt: 2 }}
      />
    </Container>
  );
}

export default Collections;
