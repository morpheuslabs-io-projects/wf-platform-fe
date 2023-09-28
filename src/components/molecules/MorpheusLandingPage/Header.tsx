import AvatarIcon from "@/assets/icons/avatar.svg";
import MorpheusLogoFull from "@/assets/icons/morpheus-logo-full.svg";
import SCLogo from "@/assets/icons/sc-logo.svg";
import SettingIcon from "@/assets/icons/setting-blue.svg";
import { ROUTE_PATH } from "@/constants/AppConfig";
import { CookiesHelper } from "@/helper/cookies";
import { useAuthentication } from "@/store/authentication";
import { useKeycloakStore } from "@/store/keycloak";
import { Avatar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { useNavigate } from "react-router-dom";

const HeaderComponent: React.FC = () => {
  const navigate = useNavigate();
  const { logout: keycloakLogout } = useKeycloakStore();

  const { user } = useAuthentication();

  const onLogout = async () => {
    await CookiesHelper.remove("accessToken");
    await CookiesHelper.remove("refreshToken");
    await CookiesHelper.remove("userInfo");
    await keycloakLogout(window.location.origin);
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
                <Button
                  href={ROUTE_PATH.SIGN_UP}
                  variant="secondary"
                  sx={{ mx: 1 }}
                >
                  Sign up
                </Button>
                <Button href={ROUTE_PATH.SIGN_IN} variant="ghost">
                  Login
                </Button>
              </Box>
            )}
            {user && (
              <Avatar
                alt="avatar"
                src={user.avatar || AvatarIcon}
                sx={{ backgroundColor: "colors.black.50" }}
              />
            )}
            {user && (
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <Box>
                  {user.first_name && user.last_name ? (
                    <Typography variant="body_bold">
                      {`${user.first_name} ${user.last_name}`}
                    </Typography>
                  ) : (
                    <Typography variant="body_bold">
                      {`${user.email} `}
                    </Typography>
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
