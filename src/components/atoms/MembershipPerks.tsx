import { useAuthentication } from "@/store/authentication";
import { Box, Card, CardContent, Typography } from "@mui/material";

const MembershipPerks = () => {
  const { currentMembership } = useAuthentication();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: "0 1 100%",
        gap: "16px",
      }}
    >
      <>
        <Card>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              padding: "24px",
            }}
          >
            <Typography variant="sub_title">Membership Perks</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px",
              }}
            >
              <Typography variant="body">
                Total number of workflow servers
              </Typography>
              <Typography variant="body_bold">
                {currentMembership?.benefits?.workflow_servers}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body">
                Total number of workflow deployed
              </Typography>
              <Typography variant="body_bold">
                {currentMembership?.benefits?.workflows_deployed}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body">
                Number of workflow execution per month
              </Typography>
              <Typography variant="body_bold">
                {currentMembership?.benefits?.workflow_execution_per_month}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body">
                Total number of smart contracts deployed on Mainnet
              </Typography>
              <Typography variant="body_bold">
                {
                  currentMembership?.benefits
                    ?.smart_contracts_deployed_on_mainnet
                }
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </>
    </Box>
  );
};

export default MembershipPerks;
