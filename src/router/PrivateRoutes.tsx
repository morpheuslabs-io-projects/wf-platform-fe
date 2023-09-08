import Inside from "@/pages/Inside";
import { RouteObject } from "react-router-dom";


const AuthRouter: RouteObject[] = [
	{
		path: '/inside',
		element: <Inside />,
	},
]

export default AuthRouter;