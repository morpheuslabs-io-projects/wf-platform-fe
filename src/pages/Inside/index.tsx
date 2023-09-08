import { useEffect, useState } from 'react';
import { IUserToken } from "@/types";
import { Box, Button } from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";
import Cookies from "js-cookie";
import jwt from 'jwt-decode';

const Inside = () => {
  const { keycloak } = useKeycloak();

  const [user, setUser] = useState<IUserToken>();
	useEffect(() => {
		const _token = Cookies.get('accessToken')
		const _userInfo = Cookies.get('userInfo') 
		if (_token) {
			const user = jwt(_token);
			setUser(user as IUserToken);
		} else if (_userInfo) {
			setUser(JSON.parse(_userInfo) as IUserToken);
		}
	}, []);
  
  const onLogout = async () => {
		await Cookies.remove('accessToken');
		await Cookies.remove('userInfo');
		keycloak.logout({
			redirectUri: window.location.protocol + '//' + window.location.host,
		});
	};

  return (
    <div>
      <Box sx={{ maxWidth: "493px", px: "80px", flexGrow: 1 }}>
        <h3>Inside PAGE</h3>
        {user && <p>USER: {user?.name} / {user?.email}</p>}
        <pre>{Cookies.get("accessToken")}</pre>

        <Button onClick={onLogout}>Log out</Button>
      </Box>
    </div>
  );
};

export default Inside;
