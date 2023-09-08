import { useKeycloak } from '@react-keycloak/web';
import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const PublicGuard = () => {
	const { keycloak } = useKeycloak();
  const userInfo = Cookies.get('userInfo');

	if ((keycloak && keycloak.token) || userInfo) {
		document.location.href = '/inside';
	}

	return <Outlet />;
};

export default PublicGuard;