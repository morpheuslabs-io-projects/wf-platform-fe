import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import UsdIcon from '@/assets/icons/usd.png';
import CheckMarkIcon from "@/assets/icons/checkmark.svg";

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
      <DialogTitle sx={{ 
          paddingBottom: 0, 
          position: 'relative', 
          minHeight: '50px', 
          fontWeight: '700', 
          fontSize: '24px',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <img src={CheckMarkIcon} width={64} height={64}/>
        <Box 
          sx={{
            fontWeight: '700',
            lineHeight: '48px',
            fontSize: '36px',
          }}
        >
          Payment Successful
        </Box>
      </DialogTitle>
      <DialogContent sx={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: '30px'
        }}
      >
        <Box>
         You have paid 
        </Box>
        <Box display="flex" alignItems="center" gap={0.5}
          sx={{
            fontWeight: '400',
            lineHeight: '48px',
            fontSize: '36px',
            display: 'flex',
            marginTop: '15px'
          }}
        >
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
        </Box>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={onClose} 
          variant="primary"
          type="submit"
          sx={{ marginTop: "20px", marginBottom: '20px', padding: '8px 70px', radius: '4px' }}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentSuccessDialog;
