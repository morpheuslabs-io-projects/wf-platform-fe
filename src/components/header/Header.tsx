/** @format */

import MorpheusLogoFull from "@/assets/icons/morpheus-logo-full.svg";
// import SCLogo from "@/assets/icons/sc-logo.svg";
import AvatarIcon from "@/assets/icons/avatar.svg";
import SettingIcon from "@/assets/icons/setting-blue.svg";
import SupportCenterIcon from "@/assets/icons/support-center.svg";

import { ROUTE_PATH } from "@/constants/AppConfig";
import { EWindowSize, useReSize } from "@/hooks/useSize";
import { useAuthentication } from "@/store/authentication";
import {
  Avatar,
  Link,
  Menu,
  MenuItem,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";
import { Copyrights } from "../atoms/Copyrights";

const HeaderComponent: React.FC = () => {
  const navigate = useNavigate();
  const mode = useReSize();
  const { user } = useAuthentication();
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const open = Boolean(anchorEl);
  const [showModalMenuMobile, setShowModalMenuMobile] = React.useState(false);

  const onGoToSignIn = async () => {
    window.open(ROUTE_PATH.SIGN_IN(), "_self");
  };

  const onGoToLogout = async () => {
    window.open(ROUTE_PATH.LOGOUT(), "_self");
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickMyProfile = () => {
    handleClose();
    navigate("/profile");
  };

  const onClickPricingPlans = () => {
    handleClose();
    navigate("/pricing-plan");
  };

  return (
    <AppBar
      position="static"
      sx={{
        height: `${mode === EWindowSize.PC ? "100px" : "80px"}`,
        bgcolor: "background.default",
        boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <Container
        maxWidth="xl"
        style={{
          padding: `${mode === EWindowSize.PC ? "0 16px" : 0}`,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            height: `${mode === EWindowSize.PC ? "100px" : "80px"}`,
            bgcolor: `${
              mode === EWindowSize.PC ? "background.default" : "#EFF2FF"
            }`,
            justifyContent: "space-between",
          }}
        >
          <Toolbar onClick={() => navigate("/")}>
            <Box
              component="img"
              src={MorpheusLogoFull}
              alt="logo"
              sx={{
                display: { sm: "flex" },
                width: `${mode !== EWindowSize.PC && "158px"}`,
              }}
            />
            {/* <Box
              component="img"
              src={SCLogo}
              alt="logo"
              sx={{ display: { xs: "flex", sm: "none" } }}
            /> */}
          </Toolbar>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              cursor: "pointer",
              position: "relative",
            }}
            id={"user-avatar-box"}
          >
            <Box>
              <Tooltip title="Support Center">
                <IconButton
                  onClick={() => {
                    window.open("/support-center", "_blank");
                  }}
                >
                  <img src={SupportCenterIcon} alt="support-center" />
                </IconButton>
              </Tooltip>
            </Box>
            {!user && (
              <Box>
                <Button onClick={onGoToSignIn} variant="ghost">
                  Login
                </Button>
              </Box>
            )}
            {user && (
              <>
                <Avatar
                  alt="avatar"
                  src={user.avatar || AvatarIcon}
                  sx={{
                    backgroundColor: "colors.black.50",
                    position: "relative",
                    marginRight: mode === EWindowSize.MOBILE ? "10px" : "0",
                  }}
                  onClick={handleClick}
                />
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  slotProps={{
                    paper: {
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                        "& .MuiMenu-list": {
                          paddingBottom: 0,
                          paddingTop: 0,
                        },
                        "& .MuiMenuItem-root": {
                          padding: "14px 20px",
                        },
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem
                    sx={{ minWidth: "250px" }}
                    onClick={onClickMyProfile}
                  >
                    My Profile
                  </MenuItem>
                  <MenuItem onClick={onClickPricingPlans}>Pricing</MenuItem>
                  {mode === EWindowSize.MOBILE && (
                    <MenuItem onClick={onGoToLogout}>Logout</MenuItem>
                  )}
                </Menu>
              </>
            )}
            {user && mode !== EWindowSize.MOBILE && (
              <Box>
                <Box onClick={handleClick}>
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
                  <Link
                    sx={{
                      color: "black",
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                    onClick={onGoToLogout}
                  >
                    Log out
                  </Link>
                </Box>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
      {mode === EWindowSize.MOBILE && !user && (
        <Modal
          open={showModalMenuMobile}
          onClose={() => {
            setShowModalMenuMobile(false);
          }}
          slotProps={{
            backdrop: {
              sx: {
                top: "80px",
              },
            },
          }}
          style={{}}
        >
          <Box
            style={{
              width: "100%",
              minHeight: "200px",
              position: "absolute",
              backgroundColor: "white",
              top: "80px",
            }}
          >
            <p
              onClick={() => {
                window.open(`${ROUTE_PATH.SIGN_IN()}`, "_self");
              }}
              style={{
                color: "#252525",
                fontSize: "24px",
                fontFamily: "Poppins",
                fontWeight: "400",
                lineHeight: "33.6px",
                wordWrap: "break-word",
                textAlign: "center",
              }}
            >
              Login
            </p>
            <p
              onClick={() => {
                window.open(`${ROUTE_PATH.SIGN_UP()}`, "_self");
              }}
              style={{
                color: "#252525",
                fontSize: "24px",
                fontFamily: "Poppins",
                fontWeight: "400",
                lineHeight: "33.6px",
                wordWrap: "break-word",
                textAlign: "center",
              }}
            >
              Sign up
            </p>
            <p
              style={{
                color: "#252525",
                fontSize: "24px",
                fontFamily: "Poppins",
                fontWeight: "400",
                lineHeight: "33.6px",
                wordWrap: "break-word",
                textAlign: "center",
              }}
            >
              About
            </p>
            <Copyrights />
          </Box>
        </Modal>
      )}
    </AppBar>
  );
};
export default HeaderComponent;
