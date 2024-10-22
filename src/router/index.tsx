import { CookiesHelper } from "@/helper/cookies";
import MorpheusLandingPage from "@/pages/MorpheusLandingPage";
import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import SignIn from "../pages/SignIn";
import AuthRouter from "./PrivateRoutes";
import PublicGuard from "./PublicGuard";
import { Logout } from "@/pages/Logout";
import SupportCenterPage from "@/pages/SupportCenter";
import ReferralCapture from "@/pages/ReferralCapture";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const authLoader = (_: unknown) => {
  const accessToken = CookiesHelper.get("accessToken");
  const userInfo = CookiesHelper.get("userInfo");

  if (!accessToken && !userInfo) {
    return false;
  }
  return true;
};

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    children: [
      {
        path: "/",
        element: (
          <ReferralCapture>
            <MorpheusLandingPage />
          </ReferralCapture>
        ),
      },
      {
        path: "/",
        element: <PublicGuard />,
        children: [
          {
            path: "/sign-in",
            element: <SignIn />,
          },
        ],
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/support-center",
        element: <SupportCenterPage />,
      },
      {
        path: "/",
        loader: authLoader,
        children: [...AuthRouter],
      },
    ],
  },
]);

export default router;
