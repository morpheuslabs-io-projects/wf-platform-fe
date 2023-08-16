import { createBrowserRouter } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import NotFound from '../pages/NotFound';
import SignUp from '@/pages/SignUp';
import MorpheusLandingPage from '@/pages/MorpheusLandingPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <MorpheusLandingPage />,
	},
	{
		path: '/sign-in',
		element: <SignIn />,
	},
	{
		path: '/sign-up',
		element: <SignUp />,
	},
	{
		path: '*',
		element: <NotFound />,
	},
]);

export default router;
