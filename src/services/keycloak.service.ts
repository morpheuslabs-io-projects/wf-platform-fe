import { VITE_SEED_AUTH_URL, VITE_SEED_CLIENT_ID, VITE_SEED_CLIENT_RESOURCE } from "@/constants/AppConfig";
import Keycloak from "keycloak-js";

const KEYCLOACK_CONFIG = {
  realm: "che",
  clientId: VITE_SEED_CLIENT_ID,
  url: VITE_SEED_AUTH_URL,
  sslRequired: "none",
  resource: VITE_SEED_CLIENT_RESOURCE,
  publicClient: true,
  confidentialPort: 0
};

const keycloak = Keycloak(KEYCLOACK_CONFIG);

export default keycloak;
