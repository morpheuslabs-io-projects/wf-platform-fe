import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

import "./pricing.css";
import { ReactComponent as CreditCardIcon } from "@/assets/icons/creditcard.svg";
import { ReactComponent as TokenPaymentIcon } from "@/assets/icons/token.svg";

export interface SelectPaymentDialogProps {
  open: boolean;
  selectedOption: any;
  onClose: () => void;
  handleOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleConfirm: () => void;
}
function SelectPaymentDialog({
  open,
  selectedOption,
  onClose,
  handleOptionChange,
  handleConfirm,
}: SelectPaymentDialogProps) {
  return (
    <Box
      sx={{
        backgroundColor: "colors.white.200",
        position: "relative",
      }}
    >
      <Dialog
        style={{ zIndex: 1 }}
        fullWidth
        maxWidth="sm"
        sx={{ pt: 12 }}
        open={!!open}
        onClose={() => onClose()}
      >
        <DialogTitle sx={{ background: "#F1F5FA", paddingBottom: 0 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="header_3" fontSize={24} sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              Select Payment Method
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent
          sx={{
            zIndex: 1,
            background: "#F3F3F3",
            marginTop: "0 !important",
          }}
        >
          <FormControl
            component="fieldset"
            sx={{
              width: "100%",
              marginBottom: "40px",
            }}
          >
            <RadioGroup
              aria-label="option"
              name="option"
              value={selectedOption}
              onChange={handleOptionChange}
              row
              className={"paymentType"}
              defaultValue={"token_payment"}
            >
              {
                <FormControlLabel
                  value="credit_card"
                  control={<Radio />}
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        flexDirection: "column",
                      }}
                    >
                      <CreditCardIcon />
                      <Typography>Credit Card</Typography>
                    </Box>
                  }
                />
              }
              <FormControlLabel
                value="token_payment"
                control={<Radio />}
                label={
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      flexDirection: "column",
                    }}
                  >
                    <TokenPaymentIcon />
                    <Typography>Token Payment</Typography>
                  </Box>
                }
              />
            </RadioGroup>
          </FormControl>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button onClick={onClose} variant="ghost">
              Cancel
            </Button>

            <Button onClick={handleConfirm} variant="primary">
              Next
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default SelectPaymentDialog;
