import GoogleButton from "@/components/atoms/GoogleButton";
import MetamaskButton from "@/components/atoms/MetamaskButton";
import SeedButton from "@/components/atoms/SeedButton";
import { CookiesHelper } from "@/helper/cookies";
import { signUpGoogle, signUpKeycloak } from "@/services/auth.service";
import { useAuthentication } from "@/store/authentication";
import { useKeycloakStore } from "@/store/keycloak";
import { Alert, Box, Stack, Typography } from "@mui/material";
import { CodeResponse, useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const SignUpWithOtherMethod = () => {
  const navigate = useNavigate();
  const { login: keycloakLogin, token: keycloakToken } = useKeycloakStore();
  const { initAuthentication } = useAuthentication();

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

  const [error, setError] = useState<string>("");

  const handleSignUpWithGoogle = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse: CodeResponse) => {
      setError("");
      const { access_token, refresh_token }: any = await signUpGoogle({
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

  const signUpWithSeed = async () => {
    setError("");
    await keycloakLogin();
  };

  const handleSignUpWithMetamask = () => {
    console.log("Signing up with Metamask");
  };

  useEffect(() => {
    if (keycloakToken) {
      handleSignInWithKeycloak(keycloakToken);
    }
  }, [keycloakToken]);

  const handleSignInWithKeycloak = async (token: string) => {
    const { access_token, refresh_token }: any = await signUpKeycloak({
      token,
    }).catch((error: string) => {
      setError(error);
    });

    CookiesHelper.set("accessToken", access_token);
    CookiesHelper.set("refreshToken", refresh_token);
    initAuthentication();
    redirectBack();
  };

  return (
    <div>
      {/* <Typography variant="body" color="primary.contrastText">
        Continue with
      </Typography> */}
      <Stack direction="row" spacing="16px" mt="12px">
        <SeedButton onClick={signUpWithSeed} />
        <GoogleButton onClick={handleSignUpWithGoogle} />
        <MetamaskButton onClick={handleSignUpWithMetamask} />
      </Stack>

      {error && (
        <Box sx={{ mt: "20px" }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
    </div>
  );
};
