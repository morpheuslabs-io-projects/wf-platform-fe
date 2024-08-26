import { CookiesHelper } from "@/helper/cookies";
import { useReactKeycloak } from "@/providers/KeycloakProvider";
import { Container } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const Logout = () => {
  const { authenticated, logout } = useReactKeycloak();
  const accessToken = CookiesHelper.get("accessToken");
  const refreshToken = CookiesHelper.get("refreshToken");
  const isHasToken = accessToken || refreshToken;

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url");

  useEffect(() => {
    if (authenticated || isHasToken) {
      handleLogout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, isHasToken]);

  const handleLogout = async () => {
    CookiesHelper.remove("accessToken");
    CookiesHelper.remove("refreshToken");
    CookiesHelper.remove("userInfo");
    try {
      await logout({
        redirectUri: redirectUrl || window.location.origin,
      });
    } catch (error) {
      console.log(error);
    }
    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      navigate("/");
    }
  };
  return <Container maxWidth="xl"></Container>;
};
