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
import { PaymentService } from "@/services/payments.service";
import { useNotification } from "@/store/notification";
import { useAuthentication } from "@/store/authentication";

interface IMakePaymentDialog {
  selected: IMembership | null;
  onClose: (result?: boolean) => void;
  loading?: boolean;
}

const CheckoutForm = ({
  selected,
  onClose,
  durationPeriod,
}: IMakePaymentDialog & { durationPeriod: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { success } = useNotification();
  const { currentMembership } = useAuthentication();

  const [errorMessage, setErrorMessage] = useState<any>(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }

    // Create the PaymentIntent and obtain clientSecret from your server endpoint
    try {
      if (selected) {
        const requestBody: IUpgradeMembershipCardBody = {
          membership_id: selected.id,
          return_url: `${window.location.origin}/pricing-plan`,
          duration_period: durationPeriod,
        };
        const { client_secret } =
          await PaymentService.createStripePaymentIntent(requestBody);
        if (stripe) {
          // Confirm the PaymentIntent with the payment method
          const { error } = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            clientSecret: client_secret,
            confirmParams: {
              return_url: `${window.location.origin}/pricing-plan`,
            },
          });

          // Your customer will be redirected to your `return_url`. For some payment
          // methods like iDEAL, your customer will be redirected to an intermediate
          // site first to authorize the payment, then redirected to the `return_url`.
          if (error) {
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Show error to your customer (for example, payment
            // details incomplete)
            setErrorMessage(error.message);
          } else {
            success(
              `Payment submited, we will confirm and ${
                currentMembership?.id === selected.id ? "extend" : "upgrade"
              } your membership ${selected.tier_name} soon`
            );
            onClose();
          }
        }
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button
        variant="primary"
        type="submit"
        disabled={!stripe || !elements}
        sx={{ marginTop: "20px" }}
      >
        Pay
      </Button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

function CreditCardPaymentDialog(
  props: IMakePaymentDialog & { durations: number[] }
) {
  const { selected, onClose, loading, durations } = props;
  const stripePromise = loadStripe(VITE_STRIPE_CLIENT_ID);
  const [duration, setDuration] = useState(durations[0]);
  const durationPeriod = Math.floor(duration / 30);

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
          {durations.map((item) => {
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
          />
        </Elements>
      </DialogContent>
    </>
  );
}

export default CreditCardPaymentDialog;
