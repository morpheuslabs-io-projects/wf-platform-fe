import HeaderComponent from "@/components/header/Header";
import Inside from "@/pages/Inside";
import { Logout } from "@/pages/Logout";
import NotFound from "@/pages/NotFound";
import Pricing from "@/pages/Pricing/Pricing";
import Profile from "@/pages/Profile/Profile";
import { useAuthentication } from "@/store/authentication";
import { Outlet, RouteObject } from "react-router-dom";

const PrivateElementWithHeader = () => {
  const { user } = useAuthentication();
  return (
    <>
      <HeaderComponent />
      {user ? <Outlet /> : user === false ? <NotFound /> : null}
    </>
  );
};

const AuthRouter: RouteObject[] = [
  {
    path: "/",
    element: <PrivateElementWithHeader />,
    children: [
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/inside",
        element: <Inside />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "pricing-plan",
        element: <Pricing />,
      },
    ],
  },
];

export default AuthRouter;
