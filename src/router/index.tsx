import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/SignIn";
import NotFound from "../pages/NotFound";
import SignUp from "@/pages/SignUp";
import MorpheusLandingPage from "@/pages/MorpheusLandingPage";
import Cookies from "js-cookie";
import AuthRouter from "./PrivateRoutes";
import PublicGuard from "./PublicGuard";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const authLoader = (_: unknown) => {
	// Temporay
	const accessToken = Cookies.get('accessToken');
	const userInfo = Cookies.get('userInfo');
	// console.log(accessToken)

	if (!accessToken && !userInfo) document.location.href = '/sign-in';
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
