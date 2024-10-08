import React from 'react';
import { Modal, Box, Typography, Button, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface ReferFriendModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 800,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

const ReferFriendModal: React.FC<ReferFriendModalProps> = ({ isOpen, handleClose, currentMembership }) => {
  const referralCode = "1103939485";
  const referralLink = `http://invite.morpheuslabs.io/signup?r=${referralCode}`;

  console.log('currentMembership:', currentMembership);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied!');
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="refer-friend-modal-title"
      aria-describedby="refer-friend-modal-description"
    >
      <Box sx={style}>
        {/* Modal Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography id="refer-friend-modal-title" variant="h6" component="h2">
            <span role="img" aria-label="info">📑</span> My Referral Info
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Referral Code */}
        <Box mt={2}>
          <Typography variant="body1">Your referral code:</Typography>
          <Box display="flex" alignItems="center" mt={1}>
            <TextField
              value={referralCode}
              variant="outlined"
              size="small"
              InputProps={{
                readOnly: true,
              }}
              sx={{ flexGrow: 1, marginRight: '8px' }}
            />
            <Button
              variant="contained"
              onClick={() => handleCopy(referralCode)}
              sx={{ borderRadius: '10px', color: 'white' }}
            >
              Copy code
            </Button>
          </Box>
        </Box>

        {/* Referral Link */}
        <Box mt={2}>
          <Typography variant="body1">Your referral link:</Typography>
          <Box display="flex" alignItems="center" mt={1}>
            <TextField
              value={referralLink}
              variant="outlined"
              size="small"
              InputProps={{
                readOnly: true,
              }}
              sx={{ flexGrow: 1, marginRight: '8px' }}
            />
            <Button
              variant="contained"
              onClick={() => handleCopy(referralLink)}
              sx={{ borderRadius: '10px', color: 'white' }}
            >
              Copy referral link
            </Button>
          </Box>
        </Box>

        {/* How It Works */}
        <Box mt={4}>
          <Typography variant="h6">How it Works</Typography>
          <Typography variant="body2" mt={1}>
            <b>1. Sign up number and date</b>
            <ul>
              <li>Below 10 persons signed up per month - Incentive TBC</li>
              <li>Above 10 and below 30 signed up per month - Incentive TBC</li>
              <li>Above 30 signed up per month - Incentive TBC</li>
            </ul>
            <b>2. Paying user number and Tiered Commission</b>
            <ul>
              <li>Below US$15,000 sales per month - 5%</li>
              <li>Above US$15,000 and below US$30,000 per month - 7.5%</li>
              <li>Above US$30,000 - 10% per month</li>
            </ul>
          </Typography>
          <Typography variant="body2" mt={2}>
            Read more details <a href="#">here</a>
          </Typography>
        </Box>

        {/* My Referrals */}
        <Box mt={4}>
          <Typography variant="h6">My Referrals</Typography>
          <table style={{ width: '100%', marginTop: '10px', textAlign: 'left' }}>
            <thead>
              <tr>
                <th>Register Date</th>
                <th>User ID</th>
                <th>Current Subscription</th>
                <th>Earned</th>
              </tr>
            </thead>
            <tbody>
              {/* Repeat this row for each referral */}
              <tr>
                <td>23.01; 13:19:04</td>
                <td>@morpheus93</td>
                <td>Premium</td>
                <td>+2,200 MIND</td>
              </tr>
              <tr>
                <td>23.01; 13:19:04</td>
                <td>@morpheus93</td>
                <td>Premium</td>
                <td>+2,200 MIND</td>
              </tr>
              {/* Add more referral rows as needed */}
            </tbody>
          </table>
        </Box>
      </Box>
    </Modal>
  );
};

export default ReferFriendModal;
