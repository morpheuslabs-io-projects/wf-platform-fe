import { CookiesHelper } from "@/helper/cookies";
import MorpheusLandingPage from "@/pages/MorpheusLandingPage";
import SignUp from "@/pages/SignUp";
import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import SignIn from "../pages/SignIn";
import AuthRouter from "./PrivateRoutes";
import PublicGuard from "./PublicGuard";
import { ROUTE_PATH } from "@/constants/AppConfig";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const authLoader = (_: unknown) => {
  // Temporay
  const accessToken = CookiesHelper.get("accessToken");
  const userInfo = CookiesHelper.get("userInfo");
  // console.log(accessToken)

  if (!accessToken && !userInfo) document.location.href = ROUTE_PATH.SIGN_IN;
  return true;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MorpheusLandingPage />,
  },
  {
    path: "/",
    element: <PublicGuard />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },

  {
    path: "/",
    loader: authLoader,
    children: [...AuthRouter],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
