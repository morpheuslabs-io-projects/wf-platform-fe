import { Box, Card, CardContent, Typography } from "@mui/material";
import { ReactComponent as StarIcon } from "@/assets/icons/star.svg";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useAuthentication } from "@/store/authentication";

const MyProfile = () => {
  const { user } = useAuthentication();

  if (!user) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        flex: "0 1 50%",
      }}
    >
      <Typography variant="subtitle_bold">My Profile</Typography>
      <Card>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            padding: "24px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <StarIcon />
            <Typography variant="subtitle_bold">158</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body">User ID</Typography>
            <Typography variant="body_bold">{user?.id}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body">Name</Typography>
            <Typography variant="body_bold">
              {user?.first_name} {user?.last_name}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body">Email</Typography>
            <Typography variant="body_bold">{user?.email}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body">Enable 2FA</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <CheckCircleOutlineIcon />
              <Typography variant="body_bold">Yes</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MyProfile;
