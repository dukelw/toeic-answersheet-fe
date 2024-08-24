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
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const isAdmin = currentUser?.metadata.user.isAdmin;
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const dispatch = useDispatch();
  const axiosJWT = createAxios(currentUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(accessToken, userID, dispatch, navigate, axiosJWT);
  };
  const pages = [
    { title: "Guide", href: "", admin: false },
    { title: "History", href: "/history", admin: false },
    { title: "Tests", href: "/answers", admin: true },
    { title: "Ranking", href: "/ranking", admin: false },
  ];
  const settings = [
    { title: "Profile", href: "" },
    { title: "Account", href: "" },
    { title: "Dashboard", href: "" },
    { title: "Logout", href: "", onClick: handleLogout },
  ];
  const sessions = [
    { title: "Sign in", href: "/signin" },
    { title: "Sign up", href: "/signup" },
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

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
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
                      <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">
                          <Link
                            to={page.href}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            {page.title}
                          </Link>
                        </Typography>
                      </MenuItem>
                    );
                  }
                } else {
                  return (
                    <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        <Link
                          to={page.href}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          {page.title}
                        </Link>
                      </Typography>
                    </MenuItem>
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
                    <Button
                      key={page.title}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      <Link
                        to={page.href}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {page.title}
                      </Link>
                    </Button>
                  );
                }
              } else {
                return (
                  <Button
                    key={page.title}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    <Link
                      to={page.href}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {page.title}
                    </Link>
                  </Button>
                );
              }
            })}
          </Box>

          {isAdmin ? (
            <Link to="/add">
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Create new test">
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
              </Box>
            </Link>
          ) : (
            ""
          )}
          {!currentUser ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
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
                  <MenuItem key={session.title} onClick={handleCloseMenu}>
                    <Typography textAlign="center">
                      <Link
                        to={session.href}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {session.title}
                      </Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://i.pinimg.com/736x/49/c6/f1/49c6f19b6c8033d8a83e899d11719f07.jpg"
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
                  <MenuItem key={setting.title} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link
                        to={setting.href}
                        style={{ textDecoration: "none", color: "inherit" }}
                        onClick={setting.onClick}
                      >
                        {setting.title}
                      </Link>
                    </Typography>
                  </MenuItem>
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
