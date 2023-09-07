import { useKeycloak } from '@react-keycloak/web';
import { Outlet } from 'react-router-dom';

const PublicGuard = () => {
	const { keycloak } = useKeycloak();

	if (keycloak.token) {
		document.location.href = '/inside';
	}

	return <Outlet />;
};

export default PublicGuard;
