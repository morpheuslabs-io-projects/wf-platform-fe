import { CookiesHelper } from "@/helper/cookies";
import { useReactKeycloak } from "@/providers/KeycloakProvider";
import { Container } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const Logout = () => {
  const { authenticated, logout } = useReactKeycloak();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url");

  useEffect(() => {
    (async () => {
      CookiesHelper.clearAll();
      try {
        if (authenticated)
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
    })();
  }, [redirectUrl, authenticated, logout, navigate]);

  return <Container maxWidth="xl"></Container>;
};
