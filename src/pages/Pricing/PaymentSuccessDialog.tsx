import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import UsdIcon from '@/assets/icons/usd.png';

interface PaymentSuccessDialogProps {
  open: boolean;
  onClose: () => void;
  paymentAmount: number;
}

const PaymentSuccessDialog: React.FC<PaymentSuccessDialogProps> = ({ open, onClose, paymentAmount }) => {
  return (
    <Dialog
      style={{ zIndex: 1 }}
      fullWidth
      maxWidth="sm"
      sx={{ pt: 12 }}
      open={open} onClose={onClose}
    >
      <DialogTitle sx={{ background: "#F1F5FA", paddingBottom: 0, position: 'relative', minHeight: '50px' }}>
        Payment Successful
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          You have paid          
          {paymentAmount}
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
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} 
          variant="primary"
          type="submit"
          sx={{ marginTop: "20px" }}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentSuccessDialog;
