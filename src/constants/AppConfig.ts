/** @format */

export const {
  VITE_AUTH_APP_ENDPOINT,
  VITE_STRIPE_CLIENT_ID,
  VITE_PROJECT_ID,
  VITE_AUTH_API_ENDPOINT,
  VITE_API_ENDPOINT,
  VITE_SOCKET_API_ENDPOINT,
  VITE_APP_WF_URL,
  VITE_APP_SC_URL,
  VITE_APP_WS_URL,
  VITE_GOOGLE_CLIENT_ID,
  VITE_ROOT_DOMAIN,
  VITE_SEED_AUTH_URL,
  VITE_SEED_CLIENT_ID,
  VITE_SEED_REALM,
  VITE_SAMPLE_SOLUTION_ENDPOINT,
} = import.meta.env;

export const ROUTE_PATH = {
  SIGN_IN: (redirectUrl: string = window.location.origin) => {
    return `${VITE_AUTH_APP_ENDPOINT}/sign-in?redirect_url=${encodeURIComponent(
      redirectUrl
    )}`;
  },
  SIGN_UP: (redirectUrl: string = window.location.origin) => {
    return `${VITE_AUTH_APP_ENDPOINT}/sign-up?redirect_url=${encodeURIComponent(
      redirectUrl
    )}`;
  },
  LOGOUT: (redirectUrl: string = window.location.origin) => {
    return `${VITE_AUTH_APP_ENDPOINT}/logout?redirect_url=${encodeURIComponent(
      redirectUrl
    )}`;
  },
};

export const PATHS = {
  DEFAULT: "/",
  PROFILE: "/profile",
  PRICING: "/pricing-plan",
};
