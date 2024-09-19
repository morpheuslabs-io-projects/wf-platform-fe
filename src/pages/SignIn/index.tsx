import { CookiesHelper } from "@/helper/cookies";
import { useReactKeycloak } from "@/providers/KeycloakProvider";
import { getTokensByKeycloakToken } from "@/services/auth.service";
import { useAuthentication } from "@/store/authentication";
import { Container } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SignIn = () => {
  const { authenticated, login, idToken } = useReactKeycloak();
  const { initAuthentication } = useAuthentication();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url");

  const redirectBack = () => {
    setTimeout(() => {
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        navigate("/");
      }
    });
  };
  useEffect(() => {
    if (!authenticated || !idToken) {
      login();
    } else {
      handleSignInWithKeycloak(idToken);
    }
  }, [authenticated, idToken]);

  const handleSignInWithKeycloak = async (token: string) => {
    console.log(`handleSignInWithKeycloak - token ${token}`);
    const { access_token, refresh_token } = await getTokensByKeycloakToken({
      token,
    });
    console.log(`handleSignInWithKeycloak - token ${token} - 0`);
    CookiesHelper.set("accessToken", access_token);
    CookiesHelper.set("refreshToken", refresh_token);
    console.log(`handleSignInWithKeycloak - token ${token} - 1`);
    initAuthentication();
    console.log(`handleSignInWithKeycloak - token ${token} - 2`);
    redirectBack();
  };

  return <Container maxWidth="xl"></Container>;
};

export default SignIn;
