import { Box, Card, CardContent, Typography } from "@mui/material";

import { useAuthentication } from "@/store/authentication";
// import PaymentMethod from '@/components/atoms/PaymentMethod';
import Membership from "@/components/atoms/Membership";
import MembershipPerks from "@/components/atoms/MembershipPerks";
import MyProfile from "@/components/atoms/MyProfile";
import PaidMembership from "@/components/atoms/PaidMembership";
import PaymentHistory from "@/components/atoms/PaymentHistory";
import { PaymentService } from "@/services/payments.service";
import { useEffect, useState } from "react";

const Profile = () => {
  const { currentMembership } = useAuthentication();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [paymentHistory, setPaymentHistory] = useState<any[]>([]);

  useEffect(() => {
    PaymentService.getPaymentHistory()
      .then((res) => setPaymentHistory(res))
      .catch(() => setPaymentHistory([]));
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "1200px",
        margin: "0 auto",
        gap: "32px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          margin: "52px 0",
        }}
      >
        <Box sx={{ display: "flex", gap: "16px" }}>
          {currentMembership?.tier_name === "Freemium" ? (
            <>
              <MyProfile />
              <Membership />
            </>
          ) : (
            <>
              <PaidMembership />
            </>
          )}
        </Box>
        {currentMembership?.tier_name === "Freemium" ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <Box>
              <Typography variant="sub_title">Membership Perks</Typography>
            </Box>
          </Box>
        ) : (
          <MembershipPerks />
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <Box>
            <Typography variant="subtitle_bold">Payment</Typography>
          </Box>
          <Box>
            <Card>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                  padding: "44px",
                }}
              >
                {/* <Typography variant="body_bold">
									Payment Method
								</Typography>
								<PaymentMethod /> */}

                <Typography variant="body_bold">Payment History</Typography>
                <PaymentHistory paymentHistory={paymentHistory} />
              </CardContent>
            </Card>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <Box>
            <Typography variant="subtitle_bold">Reward</Typography>
          </Box>
          <Box>
            <Card>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              ></CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
