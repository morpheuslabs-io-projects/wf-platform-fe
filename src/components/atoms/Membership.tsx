import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { ReactComponent as FreemiumIcon } from "@/assets/icons/freemium.svg";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useAuthentication } from "@/store/authentication";

const Membership = () => {
  const { currentMembership } = useAuthentication();
  const navigate = useNavigate();
  const getExpiredAt = useMemo(() => {
    const expiredAt = new Date(currentMembership?.expired_at ?? "");
    return expiredAt instanceof Date ? expiredAt.toLocaleDateString() : "";
  }, [currentMembership?.expired_at]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: "0 1 50%",
        gap: "16px",
      }}
    >
      <>
        <Typography variant="subtitle_bold">Membership</Typography>
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
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px",
              }}
            >
              <Typography variant="body">Member tier</Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "8px",
                }}
              >
                <FreemiumIcon style={{ width: "20px" }} />
                <Typography variant="body_bold">
                  {currentMembership?.tier_name}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body">Member ID</Typography>
              <Typography variant="body_bold">
                {currentMembership?.member_id}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body">Expired At</Typography>
              <Typography variant="body_bold">{getExpiredAt}</Typography>
            </Box>
            <Box sx={{ marginTop: "8px" }}>
              <Button
                variant="primary"
                sx={{
                  gap: "12px",
                  px: "55px",
                }}
                onClick={() => {
                  navigate("/pricing-plan");
                }}
              >
                Upgrade
              </Button>
            </Box>
          </CardContent>
        </Card>
      </>
    </Box>
  );
};

export default Membership;
