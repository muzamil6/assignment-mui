import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import AdbIcon from "@mui/icons-material/Adb";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import HeroSection from "../heroSection/HeroSection";

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ mx: 6, mt: 5 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", color: "black", borderRadius: 50 }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
              <AdbIcon sx={{ color: "black", mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "black",
                  textDecoration: "none",
                }}
              >
                LOGO
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: 10,
                  background: "#7B5AFF",
                  color: "#fff",
                  fontSize: "16px",
                  fontFamily: "Roboto Flex, sans-serif",
                  textTransform: "capitalize",
                  padding: "8px 25px",
                }}
              >
                Feedback
              </Button>

              <IconButton href="#" sx={{ p: 0 }}>
                <NotificationsOutlinedIcon sx={{ color: "#718096" }} />
              </IconButton>
              <IconButton href="#" sx={{ p: 0 }}>
                <InfoOutlinedIcon sx={{ color: "#718096" }} />
              </IconButton>

              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <HeroSection />
    </Box>
  );
}

export default ResponsiveAppBar;
