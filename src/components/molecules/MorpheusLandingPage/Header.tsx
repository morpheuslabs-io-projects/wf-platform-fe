import * as React from "react";
import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import MorpheusLogoFull from "@/assets/icons/morpheus-logo-full.svg";
import SCLogo from "@/assets/icons/sc-logo.svg";
import { useKeycloak } from "@react-keycloak/web";
import { IUserToken } from "@/types";
import { Avatar, Typography } from "@mui/material";
import AvatarIcon from "@/assets/icons/avatar.svg";
import jwt from "jwt-decode";
import SettingIcon from "@/assets/icons/setting-blue.svg";

const HeaderComponent: React.FC = () => {
  const navigate = useNavigate();

  const { keycloak } = useKeycloak();

  const [user, setUser] = useState<IUserToken>();
  useEffect(() => {
    const _token = Cookies.get("accessToken");
    const _userInfo = Cookies.get("userInfo");
    if (_token) {
      const user = jwt(_token);
      setUser(user as IUserToken);
    } else if (_userInfo) {
      setUser(JSON.parse(_userInfo) as IUserToken);
    }
  }, []);

  const onLogout = async () => {
    await Cookies.remove("accessToken");
    await Cookies.remove("userInfo");
    keycloak.logout({
      redirectUri: window.location.protocol + "//" + window.location.host,
    });
  };

  return (
    <AppBar
      position="static"
      sx={{
        height: "100px",
        bgcolor: "background.default",
        boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            height: "100px",
            bgcolor: "background.default",
            justifyContent: "space-between",
          }}
        >
          <Toolbar sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            <Box
              component="img"
              src={MorpheusLogoFull}
              alt="logo"
              sx={{ display: { xs: "none", sm: "flex" } }}
            />
            <Box
              component="img"
              src={SCLogo}
              alt="logo"
              sx={{ display: { xs: "flex", sm: "none" } }}
            />
          </Toolbar>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            {!user && (
              <Box>
                <Button href="/sign-up" variant="secondary" sx={{ mx: 1 }}>
                  Sign up
                </Button>
                <Button href="/sign-in" variant="ghost">
                  Login
                </Button>
              </Box>
            )}
            {user && (
              <Avatar
                alt="avatar"
                src={AvatarIcon}
                sx={{ backgroundColor: "colors.black.50" }}
              />
            )}
            {user && (
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <Box>
                  {user.name && (
                    <Typography variant="body_bold">{user.name}</Typography>
                  )}
                  <IconButton aria-label="settings">
                    <img src={SettingIcon} alt="" />
                  </IconButton>
                </Box>
                <Box>
                  <Typography variant="body" onClick={onLogout}>
                    Log out
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default HeaderComponent;
