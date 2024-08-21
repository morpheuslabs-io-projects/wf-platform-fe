import {
  VITE_SEED_AUTH_URL,
  VITE_SEED_CLIENT_ID,
  VITE_SEED_REALM,
} from "@/constants/AppConfig";
import { useAuthentication } from "@/store/authentication";
import { ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { createConfig, http, WagmiProvider } from "wagmi";
import { Copyrights } from "./components/atoms/Copyrights";
import WhitelistModal from "./components/atoms/WhitelistModal";
import { CookiesHelper } from "./helper/cookies";
import { ReactKeycloakProvider } from "./providers/KeycloakProvider";
import router from "./router";
import { verify } from "./services/auth.service";
import { refreshSession } from "./services/axiosSetup";
import { MembershipService } from "./services/membership.service";
import { PaymentService } from "./services/payments.service";
import {
  chains,
  connectors,
  PROJECT_ID,
  transports,
} from "./services/web3Setup";
import theme from "./theme";
import { INetworkPayment } from "./types/web3.type";

const queryClient = new QueryClient();

const KEYCLOACK_CONFIG = {
  url: VITE_SEED_AUTH_URL,
  realm: VITE_SEED_REALM,
  clientId: VITE_SEED_CLIENT_ID,
};

function App() {
  const {
    initAuthentication,
    user,
    setCurrentMembership,
    logout,
    setConfig,
    wagmiConfig,
  } = useAuthentication();
  const [whitelisted, setWhitelisted] = useState(false);

  useEffect(() => {
    const continueSession = async () => {
      try {
        if (!CookiesHelper.get("refreshToken")) return;
        const { access_token, refresh_token } = await refreshSession();
        CookiesHelper.set("accessToken", access_token);
        CookiesHelper.set("refreshToken", refresh_token);
        initAuthentication();
      } catch (error) {
        CookiesHelper.remove("accessToken");
        CookiesHelper.remove("refreshToken");
      }
    };
    continueSession();
    PaymentService.getNetworks()
      .then((networks) => {
        if (!networks) return;
        Object.entries(networks).forEach(
          ([id, payment]: [string, INetworkPayment]) => {
            const chainId = Number(id) as (typeof chains)[number]["id"];
            if (transports[chainId]) transports[chainId] = http(payment.rpcUrl);
          }
        );
        const wagmiConfig = createConfig({ chains, connectors, transports });
        createWeb3Modal({
          projectId: PROJECT_ID,
          wagmiConfig: wagmiConfig,
        });

        setConfig(networks, wagmiConfig);
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) {
      const verifyUser = async () => {
        try {
          await verify();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          if (
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

  if (!wagmiConfig) return null;

  return (
    <ReactKeycloakProvider
      init={KEYCLOACK_CONFIG}
      initOptions={{
        onLoad: "check-sso",
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
            <Copyrights />
            {whitelisted && <WhitelistModal />}
          </ThemeProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </ReactKeycloakProvider>
  );
}

export default App;
