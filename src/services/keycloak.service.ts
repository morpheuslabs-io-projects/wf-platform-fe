import {
  VITE_SEED_AUTH_URL,
  VITE_SEED_CLIENT_ID,
  VITE_SEED_REALM,
} from "@/constants/AppConfig";
import Keycloak from "keycloak-js";

const KEYCLOACK_CONFIG = {
  url: VITE_SEED_AUTH_URL,
  realm: VITE_SEED_REALM,
  clientId: VITE_SEED_CLIENT_ID,
};

const keycloak = new Keycloak(KEYCLOACK_CONFIG);

export default keycloak;
