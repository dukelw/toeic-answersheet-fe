import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import AddIcon from "@mui/icons-material/Add";
import LoginIcon from "@mui/icons-material/Login";
import NotificationsIcon from "@mui/icons-material/Notifications";
import io from "socket.io-client";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../createAxios";
import { findUser, getNotifications, logout } from "../../../redux/apiRequest";
import { ClickAwayListener, Paper, Popper } from "@mui/material";

const socket = io.connect("https://toeic-answersheet-be.onrender.com");

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElAdmin, setAnchorElAdmin] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const isAdmin = currentUser?.metadata.user.isAdmin;
  const avatar = currentUser?.metadata.user.user_avatar;
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const dispatch = useDispatch();
  const axiosJWT = createAxios(currentUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(accessToken, userID, dispatch, navigate, axiosJWT);
  };
  const pages = [
    { title: "Guide", href: "/guide", admin: false },
    { title: "Test", href: "/test", admin: false },
    { title: "History", href: "/history", admin: false },
    { title: "Ranking", href: "/ranking", admin: false },
    { title: "Document", href: "/document", admin: false },
    { title: "Management", href: "/management", admin: true },
  ];
  const settings = [
    { title: "Profile", href: `/profile/${userID}` },
    { title: "Account", href: `/account/${userID}` },
    { title: "Logout", href: "", onClick: handleLogout },
  ];
  const sessions = [
    { title: "Sign in", href: "/signin" },
    { title: "Sign up", href: "/signup" },
  ];
  const admins = [
    { title: "Document", href: "/document/add" },
    { title: "Slider", href: "/slider/add" },
    { title: "Test", href: "/test/add" },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOpenAdminMenu = (event) => {
    setAnchorElAdmin(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleCloseAdminMenu = () => {
    setAnchorElAdmin(null);
  };

  const [notifications, setNotifications] = React.useState([]);
  const [haveNotRead, setHaveNotRead] = React.useState(0);
  const fetchData = async () => {
    try {
      const notiData = await getNotifications(userID, dispatch);
      let count = 0;

      const userPromises = notiData.map(async (notification) => {
        if (!notification.isRead) {
          count += 1;
        }
        const senderData = await findUser(
          notification.notification_sender_id,
          dispatch
        );
        const receiverData = await findUser(
          notification.notification_receiver_id,
          dispatch
        );

        return {
          ...notification,
          senderData: senderData.metadata.user,
          receiverData: receiverData.metadata.user,
        };
      });

      const notificationsWithUserData = await Promise.all(userPromises);
      setNotifications(notificationsWithUserData);
      setHaveNotRead(count);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [anchorElNotifications, setAnchorElNotifications] =
    React.useState(null);
  const [openNotification, setOpenNotification] = React.useState(false);

  const handleOpenNotifications = (event) => {
    setAnchorElNotifications(event.currentTarget);
    setOpenNotification((prev) => !prev);
  };

  const handleCloseNotifications = () => {
    setOpenNotification(false);
  };

  const handleNotificationClick = (notification) => {
    navigate(`/answersheet/${notification.notification_answer_id}`);
    handleCloseNotifications();
  };

  React.useEffect(() => {
    fetchData();
    socket.emit("join_room", userID);

    socket.on("receive_notification", (data) => {
      fetchData();
    });

    return () => {
      socket.off("receive_notification");
    };
  }, [socket]);

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            HOME
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => {
                if (page.admin) {
                  if (isAdmin) {
                    return (
                      <Link
                        key={page.title}
                        to={page.href}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <MenuItem onClick={handleCloseNavMenu}>
                          <Typography textAlign="center">
                            {page.title}
                          </Typography>
                        </MenuItem>
                      </Link>
                    );
                  }
                } else {
                  return (
                    <Link
                      key={page.title}
                      to={page.href}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">{page.title}</Typography>
                      </MenuItem>
                    </Link>
                  );
                }
              })}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            HOME
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => {
              if (page.admin) {
                if (isAdmin) {
                  return (
                    <Link
                      key={page.title}
                      to={page.href}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        {page.title}
                      </Button>
                    </Link>
                  );
                }
              } else {
                return (
                  <Link
                    key={page.title}
                    to={page.href}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page.title}
                    </Button>
                  </Link>
                );
              }
            })}
          </Box>

          {isAdmin ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip onClick={handleOpenAdminMenu} title="Create new test">
                <IconButton sx={{ p: 0 }}>
                  <AddIcon
                    sx={{
                      color: "#fff",
                      fontSize: "32px",
                      marginRight: "12px",
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElAdmin}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElAdmin)}
                onClose={handleCloseAdminMenu}
              >
                {admins.map((admin) => (
                  <Link
                    key={admin.title}
                    to={admin.href}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <MenuItem onClick={handleCloseAdminMenu}>
                      <Typography textAlign="center">{admin.title}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
          ) : (
            ""
          )}
          {!currentUser ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open options">
                <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
                  <LoginIcon sx={{ fontSize: "32px" }} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                {sessions.map((session) => (
                  <Link
                    key={session.title}
                    to={session.href}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <MenuItem onClick={handleCloseMenu}>
                      <Typography textAlign="center">
                        {session.title}
                      </Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              {/* ______________________________ */}
              <Tooltip title="Notifications">
                <IconButton onClick={handleOpenNotifications} sx={{ p: 0 }}>
                  <NotificationsIcon
                    sx={{
                      color: "#ffffff",
                      fontSize: "32px",
                      marginRight: "12px",
                    }}
                  />
                  <span
                    style={{
                      color: "#1976d2",
                      textDecoration: "none",
                      position: "relative",
                      right: "61%",
                      top: "50%",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {haveNotRead}
                  </span>
                </IconButton>
              </Tooltip>
              <Popper
                open={openNotification}
                anchorEl={anchorElNotifications}
                placement="bottom-end"
                disablePortal
              >
                <ClickAwayListener onClickAway={handleCloseNotifications}>
                  <Paper
                    sx={{
                      p: 2,
                      maxWidth: 300,
                      maxHeight: 200,
                      overflow: "scroll",
                    }}
                  >
                    {notifications.length === 0 ? (
                      <Typography>No new notifications</Typography>
                    ) : (
                      notifications.map((notification) => (
                        <Box
                          key={notification._id}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 2,
                            cursor: "pointer",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            padding: "8px",
                            backgroundColor: notification.isRead
                              ? ""
                              : "#1976d2",
                          }}
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <img
                            src={notification.senderData.avatar}
                            alt={notification.senderData.name}
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: "50%",
                              marginRight: 8,
                            }}
                          />
                          <Typography
                            variant="body1"
                            sx={{
                              flex: 1,
                              color: notification.isRead ? "black" : "white",
                            }}
                          >
                            <strong>{notification.senderData.name}</strong>{" "}
                            <>
                              has replied{" "}
                              <strong>{notification.receiverData.name}</strong>:
                              "{notification.notification_content}"
                            </>
                          </Typography>
                        </Box>
                      ))
                    )}
                  </Paper>
                </ClickAwayListener>
              </Popper>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={
                      avatar
                        ? avatar
                        : "https://i.pinimg.com/736x/49/c6/f1/49c6f19b6c8033d8a83e899d11719f07.jpg"
                    }
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <Link
                    key={setting.title}
                    to={setting.href}
                    style={{ textDecoration: "none", color: "inherit" }}
                    onClick={setting.onClick}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">
                        {setting.title}
                      </Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
