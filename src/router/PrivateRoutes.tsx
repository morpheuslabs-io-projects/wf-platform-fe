import Inside from "@/pages/Inside";
import { Logout } from "@/pages/Logout";
import { RouteObject } from "react-router-dom";

const AuthRouter: RouteObject[] = [
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/inside",
    element: <Inside />,
  },
];

export default AuthRouter;
