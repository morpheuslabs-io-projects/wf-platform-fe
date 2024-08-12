import NextIcon from "@/assets/icons/next.svg";

import MetamaskIconSmall from "@/assets/images/metamaskIconSmall.svg";
import WalletconnectIconSmall from "@/assets/images/walletconnectIconSmall.svg";
import useApproveToken from "@/hooks/useApproveToken";
import { useSubscribe } from "@/hooks/useSubscribe";
import { useTokenAllowance } from "@/hooks/useTokenAllowance";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import { useTokenDecimals } from "@/hooks/useTokenDecimals";
import { PaymentService } from "@/services/payments.service";
import { chains } from "@/services/web3Setup";
import { useAuthentication } from "@/store/authentication";
import { useNotification } from "@/store/notification";
import { IMembership, ISubscribeParams, IUpgradeMembershipBody } from "@/types";
import {
  IAddress,
  INetworkResponse,
  IPriceConversionResponse,
  IWagmiConfig,
} from "@/types/web3.type";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { waitForTransactionReceipt } from "@wagmi/core";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { parseUnits } from "viem";
import { useAccount, useChainId, useDisconnect, useSwitchChain } from "wagmi";
import CreditCardPaymentDialog from "./CreditCardPaymentDialog";
import SelectPaymentDialog from "./SelectPaymentDialog";

interface IMakePaymentDialog {
  selected: IMembership | null;
  onClose: (result?: boolean) => void;
  networks: INetworkResponse;
  wagmiConfig: IWagmiConfig;
}

enum PaymentType {
  CREDIT_CARD = "credit_card",
  TOKEN = "token_payment",
}

export default function MakePaymentDialog(props: IMakePaymentDialog) {
  const { selected, onClose, networks, wagmiConfig } = props;
  const [chainId, setChainId] = useState<number | undefined>(
    Number(Object.keys(networks)[0])
  );
  const [token, setToken] = useState<IAddress | undefined>(
    chainId ? networks[`${chainId}`]?.acceptTokens[0]?.address : undefined
  );
  const [rates, setRates] = useState<IPriceConversionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const web3Modal = useWeb3Modal();
  const walletconnectAccount = useAccount();
  const { switchChain } = useSwitchChain();
  const networkChainId = useChainId();
  const { disconnect } = useDisconnect();
  const { success, error } = useNotification();
  const { currentMembership } = useAuthentication();
  const [isCreditCardSelected, setIsCreditCardSelected] = useState(false);
  const [isTokenSelected, setIsTokenSelected] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentType | null>(null);

  const {
    decimals,
    isLoading: loadingDecimals,
    error: errorDecimals,
  } = useTokenDecimals(token);

  const {
    balance,
    isLoading: loadingBalance,
    error: errorBalance,
  } = useTokenBalance(token);

  const networkSelected = chainId ? networks[`${chainId}`] : null;

  const tokenSelected = networkSelected?.acceptTokens.find(
    (item) => item.address === token
  );

  const {
    allowance,
    refetch: refetchAllowance,
    isLoading: loadingAllowance,
    error: errorAllowance,
  } = useTokenAllowance(token, networkSelected?.smartContractAddress);

  const tokenPrice = useMemo(() => {
    if (tokenSelected?.name.toUpperCase() === "USDT") return selected?.price;
    if (!tokenSelected || !rates) return;
    const conversion = rates[tokenSelected.name.toUpperCase()];
    const priceInUSD = conversion?.quote["USD"];
    if (!priceInUSD) return;
    return ((selected?.price || 0) * conversion.amount) / priceInUSD.price;
  }, [tokenSelected, rates, selected]);

  const amountInWei =
    tokenPrice && decimals
      ? parseUnits(tokenPrice.toString() || "", decimals)
      : undefined;

  const isNotEnough =
    amountInWei !== undefined && balance !== undefined && balance < amountInWei;

  const { approve } = useApproveToken(
    wagmiConfig,
    token,
    networkSelected?.smartContractAddress
  );

  const { subscribe } = useSubscribe(wagmiConfig);

  const handleSelectNetwork = async (event: SelectChangeEvent<number>) => {
    const value = Number(event.target.value);
    setChainId(value);
    if (walletconnectAccount.isConnected && value && switchChain) {
      switchChain({ chainId: value });
      web3Modal.open();
    }
  };

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedPaymentMethod(event.target.value as PaymentType);
  };

  const handleOnCloseModal = () => {
    setIsCreditCardSelected(false);
    setIsTokenSelected(false);
    onClose();
  };

  const handleSelectedPaymentMethod = () => {
    switch (selectedPaymentMethod) {
      case PaymentType.CREDIT_CARD:
        setIsCreditCardSelected(true);
        break;
      case PaymentType.TOKEN:
        setIsTokenSelected(true);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const getMindRate = () => {
      PaymentService.getMindRate()
        .then((rates) => setRates(rates))
        .catch((error) => console.log(error));
    };
    getMindRate();
    const interval = setInterval(() => getMindRate(), 300000);

    return () => clearTimeout(interval);
  }, []);

  const handleApprove = async (amount: bigint) => {
    if (allowance && allowance >= amount) return true;
    try {
      const hash = await approve(amount);
      if (hash) await waitForTransactionReceipt(wagmiConfig, { hash });
      return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log({ err });
      setLoading(false);
      if (err?.cause?.cause?.code === 4001) error("Transaction Reject");
      else error("Transaction Error");
    }
  };

  const handleSubmit = async () => {
    if (
      !selected ||
      !networkSelected ||
      !tokenSelected ||
      !walletconnectAccount.address ||
      !chainId
    )
      return;
    setLoading(true);
    try {
      const { address, name } = tokenSelected;
      const body: IUpgradeMembershipBody = {
        membership_id: selected.id,
        subscriber_address: walletconnectAccount.address,
        token_address: address,
        chain_id: chainId,
        token_name: name.toLowerCase(),
      };

      const postPayment = async () => {
        try {
          const data = await PaymentService.postPayment(body);
          return data;
        } catch (error) {
          console.log(error);
        }
      };

      const data = await postPayment();

      if (!data) throw new Error("Cannot get payment");

      await handleApprove(BigInt(data.payload.paymentAmount));

      await refetchAllowance();

      const params: ISubscribeParams = {
        ...data.payload,
        signature: data.signature,
      };

      const hash = await subscribe(
        networkSelected.smartContractAddress,
        params
      );

      try {
        await PaymentService.putPaymentHash(data.payload.item, {
          paymentGatewayTransactionId: hash,
        });
      } catch (error) {
        console.log(error);
      }
      if (hash) await waitForTransactionReceipt(wagmiConfig, { hash });
      await refetchAllowance();
      success(
        `Payment submited, we will confirm and ${
          currentMembership?.id === selected.id ? "extend" : "upgrade"
        } your membership ${selected.tier_name} soon`
      );
      handleOnCloseModal();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      if (err?.cause?.cause?.code === 4001) error("Transaction Reject");
      else error("Transaction Error");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (networkChainId !== chainId) {
      if (networks[`${networkChainId}`]) {
        setChainId(Number(networkChainId));
      } else if (chainId) switchChain?.({ chainId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [networkChainId, switchChain]);

  const paymentChains = useMemo(() => {
    return chains.filter((item) => networks[`${item.id}`]);
  }, [networks]);

  const disabled =
    loadingDecimals ||
    loadingBalance ||
    loadingAllowance ||
    !!errorAllowance ||
    !!errorDecimals ||
    !!errorBalance ||
    networkChainId !== chainId ||
    !tokenPrice;

  return (
    <Box
      sx={{
        backgroundColor: "colors.white.100",
        position: "relative",
      }}
    >
      <Dialog
        style={{ zIndex: 1 }}
        fullWidth
        maxWidth="sm"
        sx={{ pt: 12 }}
        open={!!selected}
        onClose={() => handleOnCloseModal()}
      >
        {!isCreditCardSelected && !isTokenSelected && (
          <SelectPaymentDialog
            open={!!selected}
            selectedOption={selectedPaymentMethod}
            onClose={handleOnCloseModal}
            handleOptionChange={handleOptionChange}
            handleConfirm={handleSelectedPaymentMethod}
          />
        )}

        {isCreditCardSelected && (
          <CreditCardPaymentDialog
            selected={selected}
            onClose={handleOnCloseModal}
          />
        )}

        {isTokenSelected && (
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
                  <CloseIcon
                    onClick={() => handleOnCloseModal()}
                    sx={{ cursor: "pointer" }}
                  />
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
              <Typography fontSize={14}>Select network:</Typography>
              <Select
                value={chainId}
                sx={{
                  height: "40px",
                  width: "100%",
                  m: "16px 0 24px",
                  border: "none",
                  background: "white",
                  borderRadius: 0,
                  fieldset: { border: "none" },
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                onChange={handleSelectNetwork}
              >
                {paymentChains.map((item) => {
                  return (
                    <MenuItem value={item.id} key={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
              <Typography fontSize={14}>Select token:</Typography>
              <Select
                value={token}
                sx={{
                  height: "40px",
                  width: "100%",
                  m: "16px 0 24px",
                  border: "none",
                  background: "white",
                  borderRadius: 0,
                  fieldset: { border: "none" },
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                onChange={(e) => setToken(e.target.value as `0x${string}`)}
              >
                {networkSelected?.acceptTokens.map((item) => {
                  return (
                    <MenuItem
                      value={item.address}
                      key={item.address}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        lineHeight={1.5}
                        gap={0.5}
                      >
                        <Box
                          component="img"
                          src={item.logo}
                          alt=""
                          width={18}
                          height={18}
                        />
                        {item.name.toUpperCase()}
                      </Box>
                    </MenuItem>
                  );
                })}
              </Select>
              <Typography fontSize={14} mb={1}>
                You have to pay:
              </Typography>
              {tokenSelected && (
                <Box mb={3} display="flex" alignItems="center" gap={1}>
                  {!rates ? (
                    <CircularProgress size={20} />
                  ) : (
                    <Typography variant="h5" fontWeight="normal">
                      {new Intl.NumberFormat("en", {
                        maximumFractionDigits: 2,
                      }).format(
                        Number(
                          (Math.ceil((tokenPrice || 0) * 100) / 100).toFixed(2)
                        )
                      )}
                    </Typography>
                  )}
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Box
                      component="img"
                      src={tokenSelected.logo}
                      alt=""
                      width={18}
                      height={18}
                    />
                    <Typography variant="h5" fontWeight="normal">
                      {tokenSelected.name.toUpperCase()}
                    </Typography>
                  </Box>
                </Box>
              )}
              <Typography fontSize={14} mb={1}>
                Payment description:
              </Typography>
              <Typography fontWeight={700} mb={3}>
                {currentMembership?.id === selected?.id
                  ? "Extending "
                  : "Upgrading to "}
                {selected?.tier_name} tier for a duration of{" "}
                {networks.membershipDuration || 30} days
              </Typography>
              {walletconnectAccount?.address ? (
                <>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Typography>
                      {walletconnectAccount?.connector?.name}
                    </Typography>
                    <Button
                      onClick={() => disconnect()}
                      sx={{
                        marginLeft: "10px",
                        backgroundColor: "transparetn",
                        color: "red",
                        textTransform: "none",
                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      Disconnect
                    </Button>
                  </Box>
                  <Box display="flex" alignItems="center" mb={3}>
                    <Typography fontWeight="bold">
                      {walletconnectAccount?.address}
                    </Typography>
                    <Button
                      onClick={() => web3Modal.open()}
                      sx={{
                        paddingX: "15px",
                        borderRadius: "100px",
                        margin: "0px 15px",
                        backgroundColor: "#495BFD",
                        color: "white",
                        textTransform: "none",
                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      Change
                    </Button>
                  </Box>
                </>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    mb: 4,
                    gap: 1,
                  }}
                >
                  <Box
                    width="100%"
                    justifyContent="space-around"
                    sx={{
                      padding: "5px 15px",
                      borderRadius: "100px",
                      fontSize: "16x",
                      lineHeight: "16px",
                      display: "flex",
                      width: "max-content",
                      border: "1px solid #495BFD",
                      backgroundColor: "#495BFD",
                      color: "white",
                      "&:hover": {
                        cursor: "pointer",
                        border: "1px solid grey",
                      },
                    }}
                    onClick={() => web3Modal.open()}
                  >
                    Connect Web3 Wallet
                  </Box>
                  <img src={MetamaskIconSmall} alt="" />
                  <img src={WalletconnectIconSmall} alt="" />
                </Box>
              )}
              {isNotEnough && (
                <Typography
                  color="#FF0000"
                  padding="5px 0px"
                  fontSize={14}
                  lineHeight="16px"
                >
                  You don't have enough
                </Typography>
              )}
              {rates && !tokenPrice && (
                <Typography
                  color="#FF0000"
                  padding="5px 0px"
                  fontSize={14}
                  lineHeight="16px"
                >
                  Cannot get Price conversion
                </Typography>
              )}
              <Button
                disabled={isNotEnough || disabled}
                variant="primary"
                sx={{
                  gap: "8px",
                  mt: "10px",
                  px: "55px",
                  borderRadius: 1,
                }}
                onClick={handleSubmit}
              >
                PAY
                <img src={NextIcon} alt="" />
              </Button>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
}