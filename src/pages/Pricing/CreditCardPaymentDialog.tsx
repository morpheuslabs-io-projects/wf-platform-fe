import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
} from "@stripe/react-stripe-js";
import CloseIcon from "@mui/icons-material/Close";
import { VITE_STRIPE_CLIENT_ID } from "@/constants/AppConfig";
import { useState } from "react";
import {
  Backdrop,
  Box,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import UsdIcon from '@/assets/icons/usd.png';
import { PaymentService } from "@/services/payments.service";
import { IMembership, IUpgradeMembershipCardBody } from "@/types";
import { Button } from "@mui/material";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import NextIcon from "@/assets/icons/next.svg";
import PaymentSuccessDialog from "./PaymentSuccessDialog";

interface IMakePaymentDialog {
  selected: IMembership | null;
  onClose: (result?: boolean) => void;
  loading?: boolean;
  currentMembership: IMembership | null;
  hasReferralData?: boolean;
}

const CheckoutForm = ({
  selected,
  onClose,
  durationPeriod,
  referralCode,
  currentMembership,
}: IMakePaymentDialog & { durationPeriod: number, referralCode: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<any>(null);
  const [isPaying, setIsPaying] = useState<boolean>(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements || !selected) return;

    setIsPaying(true);
    setShowSuccessDialog(false);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setIsPaying(false);
      return;
    }

    try {
      if (selected) {
        const returnUrl = `${window.location.origin}/pricing-plan`;
        const requestBody: IUpgradeMembershipCardBody = {
          membership_id: selected.id,
          return_url: returnUrl,
          duration_period: durationPeriod,
          referral_code: referralCode,
        };
        const { client_secret } =
          await PaymentService.createStripePaymentIntent(requestBody);

        if (stripe) {
          const { error } = await stripe.confirmPayment({
            elements,
            clientSecret: client_secret,
            confirmParams: {
              return_url: returnUrl,
            },
            redirect: "if_required"
          });

          if (error) {
            setErrorMessage(error.message);
            setIsPaying(false);
          } else {
            const successMessage = `Payment submitted, we will confirm and ${
              currentMembership?.id === selected.id ? "extend" : "upgrade"
            } your membership ${selected.tier_name} soon`;
            setSuccessMessage(successMessage);
            setShowSuccessDialog(true);
            setIsPaying(false);

            // Delay to show message dialog in 4s
            setTimeout(() => {
              window.location.href = returnUrl;
            }, 4000); 
          }
        }
      }
    } catch (error) {
      console.log("Error", error);
      setIsPaying(false);
    }
  };

  const handleCloseDialog = () => {
    setShowSuccessDialog(false);
    onClose();
    window.location.href = `${window.location.origin}/pricing-plan`;
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button
        variant="primary"
        type="submit"
        disabled={!stripe || !elements || isPaying}
        sx={{ marginTop: "20px" }}
      >
        Pay <img style={{marginLeft: '10px'}} src={NextIcon} alt="" />
      </Button>
      {errorMessage && <div>{errorMessage}</div>}

      <PaymentSuccessDialog
        open={showSuccessDialog}
        onClose={handleCloseDialog}
        message={successMessage} 
      />
    </form>
  );
};

function CreditCardPaymentDialog(
  props: IMakePaymentDialog & { durations: number[] }
) {
  const { selected, onClose, loading, durations, currentMembership } = props;
  const stripePromise = loadStripe(VITE_STRIPE_CLIENT_ID);
  const [duration, setDuration] = useState(durations[0]);
  const durationPeriod = Math.floor(duration / 30);
  const [referralCode, setReferralCode] = useState(''); 

  const options = {
    mode: "payment",
    amount: (selected?.price || 0) * durationPeriod,
    currency: "usd",
    confirmation_method: "automatic",
    appearance: { },
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

      <DialogTitle sx={{ background: "#F1F5FA", paddingBottom: 0, position: 'relative', minHeight: '50px' }}>
        <Typography
          variant="header_3"
          fontSize={24}
          sx={{
            textAlign: 'center',
            width: '100%',
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          Final step, make the payment.
        </Typography>
        <IconButton
          aria-label="delete"
          size="small"
          sx={{ position: 'absolute', right: 8, top: 15 }}
        >
          <CloseIcon onClick={() => onClose()} sx={{ cursor: "pointer" }} />
        </IconButton>
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
            Plan you have selected <b>{selected?.tier_name || ""}</b>
          </Typography>
        </Box>
        <Typography fontSize={14}>Select duration</Typography>
        <Select
          value={duration}
          sx={{
            height: "40px",
            width: "100%",
            marginBottom: "20px",
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
            You have to pay{" "} <br/>
            
            <Box display="flex" alignItems="center" gap={0.5}
              sx={{
                fontWeight: '400',
                lineHeight: '48px',
                fontSize: '36px',
                display: 'flex',
              }}
            >
              {selected?.price ? `${selected.price * durationPeriod}` : ""}       
              <Box sx={{
                  fontWeight: '400',
                  lineHeight: '33px',
                  fontSize: '24px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box
                  component="img"
                  src={UsdIcon}
                  alt=""
                  sx={{ 
                    width: '24px',
                    height: '24px',
                  }}
                />
                USD
              </Box>     
            </Box>
          </Typography>
        </Box>
        
        {!!currentMembership?.referralBy && (
          <>
            <div style={{marginBottom: '20px' }}>
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
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
          </>
        )}

        <Typography fontSize={14}>
          Payment description
        </Typography>
        <Typography fontWeight={700} mb={3}>
          {currentMembership?.id === selected?.id
            ? "Extending "
            : "Upgrading to "}
          {selected?.tier_name} tier for a duration of {durationPeriod}{" "}
          month{durationPeriod > 1 ? "s" : ""}
        </Typography>

        <Elements
          stripe={stripePromise}
          options={{ ...options, mode: "payment" }}
        >
          <CheckoutForm
            selected={selected}
            onClose={onClose}
            durationPeriod={durationPeriod}
            referralCode={referralCode}
            currentMembership={currentMembership}
          />
        </Elements>

      </DialogContent>
    </>
  );
}

export default CreditCardPaymentDialog;
