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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../createAxios";
import { logout } from "../../../redux/apiRequest";

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
            LOGO
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
            LOGO
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
