import { CookiesHelper } from "@/helper/cookies";
import { useReactKeycloak } from "@/providers/KeycloakProvider";
import { Container } from "@mui/material";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const Logout = () => {
  const { authenticated, logout } = useReactKeycloak();

  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url");

  useEffect(() => {
    if (authenticated) {
      handleLogout();
    }
  }, [authenticated]);

  const handleLogout = async () => {
    await CookiesHelper.remove("accessToken");
    await CookiesHelper.remove("refreshToken");
    await CookiesHelper.remove("userInfo");
    await logout({
      redirectUri: redirectUrl || window.location.origin,
    });
  };
  return <Container maxWidth="xl"></Container>;
};
