import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

interface PaymentSuccessDialogProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

const PaymentSuccessDialog: React.FC<PaymentSuccessDialogProps> = ({ open, onClose, message }) => {
  return (
    <Dialog
      style={{ zIndex: 1 }}
      fullWidth
      maxWidth="sm"
      sx={{ pt: 12 }}
      open={open} onClose={onClose}
    >
      <DialogTitle sx={{ background: "#F1F5FA", paddingBottom: 0, position: 'relative', minHeight: '50px' }}>
        Payment Successful!
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          {message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="ghost">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentSuccessDialog;
