import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";

import AdditionIcon from "@/assets/icons/addition.svg";
import { ReactComponent as NotAvailableIcon } from "@/assets/icons/not-available.svg";
import { ReactComponent as CheckIcon } from "@/assets/icons/tick.svg";
import { MembershipService } from "@/services/membership.service";
import { PaymentService } from "@/services/payments.service";
import {
  chains,
  connectors,
  PROJECT_ID,
  transports,
} from "@/services/web3Setup";
import { useAuthentication } from "@/store/authentication";
import { useNotification } from "@/store/notification";
import { IMembership } from "@/types";
import { INetworkPayment } from "@/types/web3.type";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import React, { useEffect, useState } from "react";
import { createConfig, http, WagmiProvider } from "wagmi";
import {
  AdditionalFeatures,
  SmartcontractFeatures,
  specialReplaceNull,
  WebStudioFeatures,
  WorkFlowFeatures,
} from "./features";
import MakePaymentDialog from "./MakePaymentDialog";

const pricingPlans = [
  {
    title: "Smart Contract Studio",
    features: SmartcontractFeatures,
  },
  {
    title: "Workflow Studio",
    features: WorkFlowFeatures,
  },
  {
    title: "Web3 Web Studio",
    features: WebStudioFeatures,
  },
  {
    title: "Additional Subscription Benefits",
    features: AdditionalFeatures,
    icon: AdditionIcon,
  },
];

const Pricing = () => {
  const {
    setCurrentMembership,
    currentMembership,
    networks,
    wagmiConfig,
    setConfig,
  } = useAuthentication();
  const [loading, setLoading] = useState(true);
  const [memberships, setMemberships] = useState<IMembership[]>([]);
  const [selected, setSelected] = useState<IMembership | null>(null);
  const { success } = useNotification();

  console.log('Pricing wagmiConfig', wagmiConfig)
  console.log('Pricing networks', networks)

  const currentTierIndex = memberships.findIndex(
    ({ id }) => id === currentMembership?.id
  );

  useEffect(() => {
    PaymentService.getNetworks()
      .then((networks) => {
        if (!networks) return;
        Object.entries(networks).forEach(
          ([id, payment]: [string, INetworkPayment]) => {
            const chainId = Number(id) as (typeof chains)[number]["id"];
            if (transports[chainId]) transports[chainId] = http(payment.rpcUrl);
          }
        );
        const wagmiConfig = createConfig({ chains, connectors, transports });
        createWeb3Modal({
          projectId: PROJECT_ID,
          wagmiConfig: wagmiConfig,
        });

        setConfig(networks, wagmiConfig);
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLoading(true);
    MembershipService.getMemberships()
      .then((res) => {
        setMemberships(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    const redirect_status = new URLSearchParams(window.location.search).get(
      "redirect_status"
    );
    if (redirect_status == "succeeded") {
      success(
        "Payment submited, we will confirm and update your membership soon"
      );

      window.history.pushState(
        {},
        document.title,
        window.location.origin + window.location.pathname
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = (result?: boolean) => {
    if (selected && result) setCurrentMembership(selected);
    setSelected(null);
  };

  const renderPlan = (plan: (typeof pricingPlans)[0]) => {
    return (
      <React.Fragment key={plan.title}>
        <Typography
          variant="body_bold"
          sx={{
            fontSize: 22,
            color: "#495BFD",
            width: "max-content",
            ...(plan.icon && {
              background: "-webkit-linear-gradient(45deg, #7656FA, #69D6DC)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }),
          }}
        >
          {plan.icon && (
            <Box
              component="img"
              src={plan.icon}
              sx={{ width: 24, height: 24 }}
            />
          )}
          {plan.title}
        </Typography>
        {plan.features.map((feature, index: number) => (
          <Grid container spacing={2} key={`${plan.title}-features-${index}`}>
            <Grid item sx={{ display: "flex", alignItems: "center" }} xs={4}>
              <Typography
                variant="body"
                fontSize={feature.key ? 14 : 18}
                fontWeight={feature.key ? 400 : 700}
              >
                {feature.title}
              </Typography>
              {feature.icon && (
                <img
                  src={feature.icon}
                  alt="premium-badge"
                  style={{ marginLeft: "8px" }}
                />
              )}
            </Grid>
            {memberships.map((membership, index) => {
              if (!feature.key) return;
              const value = membership.benefits[feature.key];
              const replaceValue =
                value || (specialReplaceNull[feature.key] ?? value);

              return (
                <Grid
                  key={membership.id}
                  item
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  xs={2}
                >
                  {typeof replaceValue === "boolean" ? (
                    replaceValue ? (
                      <CheckIcon />
                    ) : (
                      <NotAvailableIcon />
                    )
                  ) : (
                    <Typography variant="body_bold">
                      {index === memberships.length - 1 && !replaceValue
                        ? "Custom"
                        : replaceValue || 0}
                    </Typography>
                  )}
                </Grid>
              );
            })}
          </Grid>
        ))}
        <br />
      </React.Fragment>
    );
  };

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
      {loading || !currentMembership ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            padding: "20px",
          }}
        >
          <CircularProgress sx={{ width: "10px" }} />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            margin: "52px 0",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="h4">Pricing</Typography>

              <Typography variant="body">
                Select a plan that is suitable for you
              </Typography>
            </Grid>
            {memberships.map((membership, index) => {
              return (
                <Grid key={membership.id} item xs={2}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <Typography
                      variant="subtitle_bold"
                      sx={{ color: "#9F87E9", position: "relative" }}
                    >
                      {membership.tier_name}
                      {membership.most_popular && (
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: "400",
                            lineHeight: "120%",
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "absolute",
                            width: "60px",
                            height: "60px",
                            color: "white",
                            background: "#495BFD",
                            zIndex: "-1",
                            borderRadius: "50%",
                            transform: "rotate(-30deg)",
                            top: "-120%",
                            left: "-50%",
                          }}
                        >
                          Most Popular
                        </span>
                      )}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyItems: "center",
                        alignItems: "center",
                      }}
                    >
                      {index === memberships.length - 1 ? (
                        <>
                          <Typography variant="h4">Talk to us</Typography>
                        </>
                      ) : membership.price > 0 ? (
                        <>
                          <Typography variant="h4">
                            ${membership.price}
                          </Typography>
                          <Typography variant="body">/month</Typography>
                        </>
                      ) : (
                        <Typography variant="h4">&nbsp;</Typography>
                      )}
                    </Box>
                    <Button
                      variant={
                        !index || index < currentTierIndex
                          ? "primary"
                          : "ghost_no_background"
                      }
                      sx={
                        !index || index < currentTierIndex
                          ? {
                              fontSize: "16px",
                              borderRadius: "4px",
                            }
                          : {
                              minWidth: "174px",
                              borderRadius: "4px",
                            }
                      }
                      disabled={!index || index < currentTierIndex}
                      onClick={() => setSelected(membership)}
                    >
                      {!index || index < currentTierIndex
                        ? "Get Started"
                        : index === currentTierIndex
                        ? "Extend"
                        : "Select"}
                    </Button>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
          {pricingPlans.map(renderPlan)}
        </Box>
      )}
      {!!networks && !!wagmiConfig && (
        <WagmiProvider config={wagmiConfig}>
          <MakePaymentDialog
            selected={selected}
            onClose={handleClose}
            networks={networks}
            wagmiConfig={wagmiConfig}
          />
        </WagmiProvider>
      )}
    </Box>
  );
};

export default Pricing;
