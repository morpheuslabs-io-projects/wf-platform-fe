import { VITE_GOOGLE_CLIENT_ID } from "@/constants/AppConfig";
import { ThemeProvider } from "@emotion/react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { WagmiConfig } from "wagmi";
import router from "./router";
import { chains, wagmiConfig } from "./services/web3Setup";
import theme from "./theme";
import { useAuthentication } from "@/store/authentication";
import { useKeycloakStore } from "@/store/keycloak";
import { useEffect } from "react";

const queryClient = new QueryClient();

function App() {
  const { initKeycloak } = useKeycloakStore();
  const { initAuthentication } = useAuthentication();

  useEffect(() => {
    initKeycloak();
  }, []);

  useEffect(() => {
    initAuthentication();
  }, []);
  return (
    <>
      <GoogleOAuthProvider clientId={VITE_GOOGLE_CLIENT_ID}>
        <QueryClientProvider client={queryClient}>
          <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains}>
              <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
              </ThemeProvider>
            </RainbowKitProvider>
          </WagmiConfig>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
