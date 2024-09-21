import {
  VITE_SEED_AUTH_URL,
  VITE_SEED_CLIENT_ID,
  VITE_SEED_REALM,
} from "@/constants/AppConfig";
import { useAuthentication } from "@/store/authentication";
import { ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { Copyrights } from "./components/atoms/Copyrights";
import WhitelistModal from "./components/atoms/WhitelistModal";
import { CookiesHelper } from "./helper/cookies";
import { ReactKeycloakProvider } from "./providers/KeycloakProvider";
import router from "./router";
import { verify } from "./services/auth.service";
import { MembershipService } from "./services/membership.service";
import theme from "./theme";
import { refreshSession } from "./helper/axios";
import { AxiosError } from "axios";

const queryClient = new QueryClient();

const KEYCLOACK_CONFIG = {
  url: VITE_SEED_AUTH_URL,
  realm: VITE_SEED_REALM,
  clientId: VITE_SEED_CLIENT_ID,
};

function App() {
  const { initAuthentication, user, setCurrentMembership, logout } =
    useAuthentication();
  const [whitelisted, setWhitelisted] = useState(false);

  useEffect(() => {
    const continueSession = async () => {
      try {
        if (!CookiesHelper.get("refreshToken")) return;
        const { access_token, refresh_token } = await refreshSession();
        CookiesHelper.clearAll();
        CookiesHelper.set("accessToken", access_token);
        CookiesHelper.set("refreshToken", refresh_token);
        initAuthentication();
      } catch (error) {
        console.log(`App.tsx error ${error}`);
        alert(`App.tsx error ${error}`);
        if ((error as AxiosError).response?.status === 401) {
          CookiesHelper.remove("accessToken");
          CookiesHelper.remove("refreshToken");
        }
      }
    };
    continueSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) {
      const verifyUser = async () => {
        try {
          await verify();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.log(`verify() error ${error}`);
          if (
            error.response &&
            error.response.status === 401 &&
            error.response.data.message ===
              "Currently the platform functions are restricted for private access"
          ) {
            setWhitelisted(true);
            setTimeout(() => {
              logout();
            }, 5000);
          }
        }
      };
      verifyUser();

      MembershipService.getCurrentMembership()
        .then((res) => setCurrentMembership(res))
        .catch((error) => console.log(error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <ReactKeycloakProvider
      init={KEYCLOACK_CONFIG}
      initOptions={{
        onLoad: "check-sso",
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
          <Copyrights />
          {whitelisted && <WhitelistModal />}
        </ThemeProvider>
      </QueryClientProvider>
    </ReactKeycloakProvider>
  );
}

export default App;
