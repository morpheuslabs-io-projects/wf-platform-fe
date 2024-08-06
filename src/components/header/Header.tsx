/** @format */

import MorpheusLogoFull from "@/assets/icons/morpheus-logo-full.svg";
// import SCLogo from "@/assets/icons/sc-logo.svg";
import AvatarIcon from "@/assets/icons/avatar.svg";
import SettingIcon from "@/assets/icons/setting-blue.svg";
import { ROUTE_PATH } from "@/constants/AppConfig";
import { EWindowSize, useReSize } from "@/hooks/useSize";
import { useAuthentication } from "@/store/authentication";
import { Avatar, Link, Modal, Typography } from "@mui/material";
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
  const [showDropdownMenu, setShowDropdownMenu] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);
  const [showModalMenuMobile, setShowModalMenuMobile] = React.useState(false);

  const onGoToSignIn = async () => {
    window.open(ROUTE_PATH.SIGN_IN(), "_self");
  };

  const onGoToLogout = async () => {
    window.open(ROUTE_PATH.LOGOUT(), "_self");
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdownMenu(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            {!user && (
              <Box>
                <Button onClick={onGoToSignIn} variant="ghost">
                  Login
                </Button>
              </Box>
            )}
            {user && (
              <Avatar
                alt="avatar"
                src={user.avatar || AvatarIcon}
                sx={{
                  backgroundColor: "colors.black.50",
                  position: "relative",
                  marginRight: mode === EWindowSize.MOBILE ? "10px" : "0",
                }}
                onClick={() => {
                  setShowDropdownMenu(!showDropdownMenu);
                }}
              />
            )}
            {user && (
              <Box
                ref={dropdownRef}
                sx={{
                  display: showDropdownMenu ? "flex" : "none",
                  minWidth: "87px",
                }}
                id={"user-avatar-box-menu"}
              >
                <Link href={"/profile"} className={"user-dropdown-menu-item"}>
                  <Typography variant="body">My Profile</Typography>
                </Link>
                <Link
                  href={"/pricing-plan"}
                  className={"user-dropdown-menu-item"}
                >
                  <Typography variant="body">Pricing</Typography>
                </Link>
                {mode === EWindowSize.MOBILE && (
                  <Box
                    className={"user-dropdown-menu-item"}
                    onClick={onGoToLogout}
                  >
                    <Typography variant="body">Logout</Typography>
                  </Box>
                )}
              </Box>
            )}
            {user && mode !== EWindowSize.MOBILE && (
              <Box>
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
