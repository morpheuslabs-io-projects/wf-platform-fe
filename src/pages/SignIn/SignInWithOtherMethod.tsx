import GoogleButton from "@/components/atoms/GoogleButton";
import MetamaskButton from "@/components/atoms/MetamaskButton";
import SeedButton from "@/components/atoms/SeedButton";
import { CookiesHelper } from "@/helper/cookies";
import { signInGoogle, signInKeycloak } from "@/services/auth.service";
import { useAuthentication } from "@/store/authentication";
import { useKeycloakStore } from "@/store/keycloak";
import { Alert, Box, Stack, Typography } from "@mui/material";
import { CodeResponse, useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const SignInWithOtherMethod = () => {
  const navigate = useNavigate();

  const { login: keycloakLogin, token: keycloakToken } = useKeycloakStore();
  const { initAuthentication } = useAuthentication();
  const [error, setError] = useState<string>("");

  const handleSignInWithSeed = async () => {
    await keycloakLogin();
  };

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

  const hanleSignInWithGoogle = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse: CodeResponse) => {
      setError("");
      const { access_token, refresh_token }: any = await signInGoogle({
        code: codeResponse.code,
      }).catch((error: string) => {
        setError(error);
      });

      CookiesHelper.set("accessToken", access_token);
      CookiesHelper.set("refreshToken", refresh_token);
      initAuthentication();
      redirectBack();
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  useEffect(() => {
    if (keycloakToken) {
      handleSignInWithKeycloak(keycloakToken);
    }
  }, [keycloakToken]);

  const handleSignInWithKeycloak = async (token: string) => {
    setError("");
    const { access_token, refresh_token }: any = await signInKeycloak({
      token,
    }).catch((error: string) => {
      setError(error);
    });

    CookiesHelper.set("accessToken", access_token);
    CookiesHelper.set("refreshToken", refresh_token);
    initAuthentication();
    redirectBack();
  };

  const handleSignInWithMetamask = () => {
    console.log("Signing in with Metamask");
  };

  return (
    <div>
      <Typography variant="body" color="primary.contrastText">
        Continue with
      </Typography>
      <Stack direction="row" spacing="16px" mt="12px">
        <SeedButton onClick={handleSignInWithSeed} />
        <GoogleButton onClick={hanleSignInWithGoogle} />
        <MetamaskButton onClick={handleSignInWithMetamask} />
      </Stack>

      {error && (
        <Box sx={{ mt: "20px" }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
    </div>
  );
};
