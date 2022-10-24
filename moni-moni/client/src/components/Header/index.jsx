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
import { useState } from "react";
import logo from "../../assets/svg/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../utils/axios";
import { userLogoutAsync } from "../../features/auth/asyncActions";
import CustomizedSnackbars from "../Snackbar";

const pages = ["Discover", "Causes", "About", "Blogs"];
const settings = ["Profile", "Account", "Logout"];

const Header = () => {
  const { isAuthenticated, verifyStatus } = useSelector((state) => state.auth);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [notification, setNotification] = useState({ notify: false });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await dispatch(userLogoutAsync());
    setNotification({ notify: true, message: res.message, type: res.type });
    window.location.reload();
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "black", mb: 6 }}>
      <Container maxWidth="xl">
        {notification.notify === true && (
          <CustomizedSnackbars {...notification} />
        )}
        <Toolbar disableGutters>
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Toolbar component={Link} to="/home">
            <img src={logo} alt="logo" width={100} />
          </Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() =>
                  navigate(`/${page.toLowerCase().replaceAll(" ", "-")}`)
                }
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0.1 }}>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              sx={{ m: 1 }}
              to={isAuthenticated === true ? "/dashboard" : "/login"}
            >
              {isAuthenticated === true ? "Dashboard" : "Get Started"}
            </Button>
            {isAuthenticated && (
              <Button
                variant="contained"
                color="secondary"
                sx={{ m: 1 }}
                onClick={(e) => handleLogout(e)}
              >
                Logout
              </Button>
            )}
            {/* <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip> */}
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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
