import { CookiesHelper } from "@/helper/cookies";
import { useAuthentication } from "@/store/authentication";
import { useKeycloakStore } from "@/store/keycloak";
import { Box, Button } from "@mui/material";

const Inside = () => {
  const { logout: keycloakLogout } = useKeycloakStore();

  const { user } = useAuthentication();

  const onLogout = async () => {
    await CookiesHelper.remove("accessToken");
    await CookiesHelper.remove("refreshToken");
    await CookiesHelper.remove("userInfo");
    await keycloakLogout(window.location.origin);
  };

  return (
    <div>
      <Box sx={{ maxWidth: "493px", px: "80px", flexGrow: 1 }}>
        <h3>Inside PAGE</h3>
        {JSON.stringify(user)}
        {user && (
          <p>
            USER: {user?.email} - {user?.first_name} - {user?.last_name}
          </p>
        )}
        <pre>{CookiesHelper.get("accessToken")}</pre>

        <Button onClick={onLogout}>Log out</Button>
      </Box>
    </div>
  );
};

export default Inside;
