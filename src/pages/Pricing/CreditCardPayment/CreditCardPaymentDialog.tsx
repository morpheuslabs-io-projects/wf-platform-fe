import { IMembership, IUpgradeMembershipCardBody } from "@/types";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CloseIcon from "@mui/icons-material/Close";

import { VITE_STRIPE_CLIENT_ID } from "@/constants/AppConfig";

import { useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import CheckoutForm from "./CheckoutForm";

interface IMakePaymentDialog {
  selected: IMembership | null;
  onClose: (result?: boolean) => void;
  loading?: boolean;
}

function CreditCardPaymentDialog(
  props: IMakePaymentDialog & { durations: number[] }
) {
  const { selected, onClose, loading, durations } = props;
  const stripePromise = loadStripe(VITE_STRIPE_CLIENT_ID);
  const [duration, setDuration] = useState(durations[0]);
  const durationPeriod = Math.floor(duration / 30);
  const [referralCode, setReferralCode] = useState(''); 

  const options = {
    mode: "payment",
    amount: (selected?.price || 0) * durationPeriod,
    currency: "usd",
    confirmation_method: "automatic",
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };

  const handleReferralCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReferralCode(event.target.value);
  };

  return (
    <>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={!!loading}
      >
        <Typography variant="sub_title" sx={{ color: "colors.white.50" }}>
          Submitting
          <span className="dot-one"> .</span>
          <span className="dot-two"> .</span>
          <span className="dot-three"> .</span>
        </Typography>
      </Backdrop>

      <DialogTitle sx={{ background: "#F1F5FA", paddingBottom: 0 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="header_3" fontSize={24}>
            Final step, make the payment.
          </Typography>
          <IconButton aria-label="delete" size="small">
            <CloseIcon onClick={() => onClose()} sx={{ cursor: "pointer" }} />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent
        sx={{
          zIndex: 1,
          background: "#F1F5FA",
          marginTop: "0 !important",
        }}
      >
        <Box>
          <Typography fontSize={14} mb={1}>
            Plan you have selected: <b>{selected?.tier_name || ""}</b>
          </Typography>
        </Box>
        <Typography fontSize={14}>Select duration:</Typography>
        <Select
          value={duration}
          sx={{
            height: "40px",
            width: "100%",
            m: "12px 0",
            border: "none",
            background: "white",
            borderRadius: 0,
            fieldset: { border: "none" },
          }}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          onChange={(e) => setDuration(Number(e.target.value))}
        >
          {durations.map((item: any) => {
            return (
              <MenuItem value={item} key={item}>
                <Box
                  display="flex"
                  alignItems="center"
                  lineHeight={1.5}
                  gap={0.5}
                >
                  {Math.floor(item / 30)} month{item > 30 ? "s" : ""}
                </Box>
              </MenuItem>
            );
          })}
        </Select>
        <Box>
          <Typography fontSize={14} mb={1}>
            You have to pay:{" "}
            <b>
              {selected?.price ? `${selected.price * durationPeriod} USD` : ""}
            </b>
          </Typography>
        </Box>
        <Elements
          stripe={stripePromise}
          options={{ ...options, mode: "payment" }}
        >
          <CheckoutForm
            selected={selected}
            onClose={onClose}
            durationPeriod={durationPeriod}
            referralCode={referralCode}
          />
        </Elements>
        
        <div style={{ marginTop: '20px' }}>
          <Typography fontSize={14}>Referral code</Typography>
          <input
            id="referralCode"
            type="text"
            value={referralCode}
            onChange={handleReferralCodeChange}
            placeholder="Enter referral code"
            style={{
              padding: '10px',
              width: '100%',
              maxWidth: '300px',
              marginTop: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>

      </DialogContent>
    </>
  );
}

export default CreditCardPaymentDialog;
