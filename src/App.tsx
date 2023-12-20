import { ReactKeycloakProvider } from "@/providers/KeycloakProvider";
import { useAuthentication } from "@/store/authentication";
import { ThemeProvider } from "@emotion/react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { WagmiConfig } from "wagmi";
import router from "./router";
import { chains, wagmiConfig } from "./services/web3Setup";
import theme from "./theme";
import {
  VITE_SEED_AUTH_URL,
  VITE_SEED_CLIENT_ID,
  VITE_SEED_REALM,
} from "@/constants/AppConfig";

const queryClient = new QueryClient();

const KEYCLOACK_CONFIG = {
  url: VITE_SEED_AUTH_URL,
  realm: VITE_SEED_REALM,
  clientId: VITE_SEED_CLIENT_ID,
};

function App() {
  const { initAuthentication } = useAuthentication();

  useEffect(() => {
    initAuthentication();
  }, []);
  return (
    <>
      <ReactKeycloakProvider
        init={KEYCLOACK_CONFIG}
        initOptions={{
          onLoad: "check-sso",
        }}
      >
        <QueryClientProvider client={queryClient}>
          <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains}>
              <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
              </ThemeProvider>
            </RainbowKitProvider>
          </WagmiConfig>
        </QueryClientProvider>
      </ReactKeycloakProvider>
    </>
  );
}

export default App;
