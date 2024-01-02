import { CookiesHelper } from "@/helper/cookies";
import { useReactKeycloak } from "@/providers/KeycloakProvider";
import { Container } from "@mui/material";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const Logout = () => {
  const { authenticated, logout } = useReactKeycloak();
  const accessToken = CookiesHelper.get("accessToken");
  const refreshToken = CookiesHelper.get("refreshToken");
  const isHasToken = accessToken || refreshToken;

  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url");

  useEffect(() => {
    if (authenticated || isHasToken) {
      handleLogout();
    }
  }, [authenticated, isHasToken]);

  const handleLogout = async () => {
    CookiesHelper.remove("accessToken");
    CookiesHelper.remove("refreshToken");
    CookiesHelper.remove("userInfo");
    await logout({
      redirectUri: redirectUrl || window.location.origin,
    });
  };
  return <Container maxWidth="xl"></Container>;
};
