

import { PaymentService } from "@/services/payments.service";
import { useNotification } from "@/store/notification";
import { useAuthentication } from "@/store/authentication";
import { IMembership, IUpgradeMembershipCardBody } from "@/types";
import { Button } from "@mui/material";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import NextIcon from "@/assets/icons/next.svg";
import { info } from "console";

interface IMakePaymentDialog {
  selected: IMembership | null;
  onClose: (result?: boolean) => void;
  loading?: boolean;
}
  
const CheckoutForm = ({
  selected,
  onClose,
  durationPeriod,
  referralCode,
}: IMakePaymentDialog & { durationPeriod: number, referralCode: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { success } = useNotification();
  const { currentMembership } = useAuthentication();
  const [errorMessage, setErrorMessage] = useState<any>(null);
  const [isPaying, setIsPaying] = useState<boolean>(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }
    
    setIsPaying(true);

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
          referral_code: referralCode,
        };
        const { client_secret } =
          await PaymentService.createStripePaymentIntent(requestBody);
        
        console.log('CheckoutForm client_secret: ', client_secret);
        console.log('CheckoutForm stripe: ', stripe);

        if (stripe) {
          // Confirm the PaymentIntent with the payment method
          const { error, paymentIntent } = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            clientSecret: client_secret,
            confirmParams: {
              // return_url: `${window.location.origin}/pricing-plan`,
              return_url: undefined, 
            },
            redirect: "if_required",
          });

          // Your customer will be redirected to your `return_url`. For some payment
          // methods like iDEAL, your customer will be redirected to an intermediate
          // site first to authorize the payment, then redirected to the `return_url`.
          if (error) {
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Show error to your customer (for example, payment
            // details incomplete)
            setErrorMessage(error.message);
            setIsPaying(false);
          } else if (paymentIntent?.status === "succeeded") {
            success(
              `Payment submitted, we will confirm and ${
                currentMembership?.id === selected.id ? "extend" : "upgrade"
              } your membership ${selected.tier_name} soon`
            );

            // Show a message to the user before redirecting
            info("Redirecting you to the pricing page...");

            setTimeout(() => {
              setIsPaying(false);
              onClose();
              window.location.href = `${window.location.origin}/pricing-plan`; // Manually redirect
            }, 3000); // Wait 3 seconds before redirecting
          }
        }
      }
    } catch (error) {
      console.log("Error", error);
      setIsPaying(false);
    }
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
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;