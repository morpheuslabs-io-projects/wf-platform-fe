import { Box, Button } from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";
import Cookies from "js-cookie";

const Inside = () => {
  const { keycloak } = useKeycloak();

  const onLogout = async () => {
    await Cookies.remove("accessToken");
    keycloak.logout({
      redirectUri: window.location.protocol + "//" + window.location.host,
    });
  };

  return (
    <div>
      <Box sx={{ maxWidth: "493px", px: "80px", flexGrow: 1 }}>
        <h3>Inside PAGE</h3>
        <pre>{Cookies.get("accessToken")}</pre>

        <Button onClick={onLogout}>Log out</Button>
      </Box>
    </div>
  );
};

export default Inside;
