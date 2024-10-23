import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

interface PaymentSuccessDialogProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

const PaymentSuccessDialog: React.FC<PaymentSuccessDialogProps> = ({ open, onClose, message }) => {

  console.log('PaymentSuccessDialog open: ', open)

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Payment Successful!</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          {message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentSuccessDialog;
