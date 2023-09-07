import { RouterProvider } from "react-router-dom";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "@emotion/react";
import router from "./router";
import theme from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chains, wagmiConfig } from "./services/web3Setup";
import { VITE_GOOGLE_CLIENT_ID } from "@/constants/AppConfig";
import keycloak from "./services/keycloak.service";
import Cookies from 'js-cookie';

const queryClient = new QueryClient();

function App() {
    
    const tokenLogger = async (tokens: any) => {
        if (tokens && tokens.token) {
            Cookies.set('accessToken', tokens.token)
        }
      };

    return (
        <>
        <ReactKeycloakProvider
            authClient={keycloak}
            initOptions={{
              onLoad: 'check-sso',
              checkLoginIframe: false,
            }}
            onTokens={tokenLogger}
          >
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
        </GoogleOAuthProvider></ReactKeycloakProvider>
      </>
      );
    }
    
    export default App;