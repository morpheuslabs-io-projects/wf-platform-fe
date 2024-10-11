import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IMembership } from '@/types';
import "./referralModal.css";
import GiftIcon from '@/assets/icons/Gift.png';
import { useEffect, useState } from 'react';
import { fetchReferralData } from '@/services/wfAdmin.service';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 800,
  bgcolor: 'rgba(243, 243, 243, 1)',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

interface IReferralDialog {
	currentMembership: IMembership | null;
	handleClose: (result?: boolean) => void;
	isOpen?: boolean;
}

interface IReferral {
  id: string;
  date: string;
  token: string;
  amount: string;
}

const ReferralModal = ({ currentMembership, handleClose, isOpen }: IReferralDialog): JSX.Element | null => {
  const referralCode = currentMembership?.member_id;
  const referralLink = `http://invite.morpheuslabs.io/signup?r=${referralCode}`;
  const [referralData, setReferralData] = useState<IReferral[]>([]);

  const handleCopy = (text: any) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    console.log('useEffect ');

    const getReferralData = async () => {
    console.log('getReferralData ');
      try {
        if (currentMembership?.member_id) {
          const data = await fetchReferralData(); 
          setReferralData(data);
        }
      } catch (error) {
        console.error('Error fetching referral data:', error);
      }
    };

    getReferralData();
  }, [currentMembership]);

  const handleModalClose = () => {
    handleClose();
  };

  return (
    <Modal
      open={isOpen || false}
      onClose={handleModalClose}
      aria-labelledby="refer-friend-modal-title"
      aria-describedby="refer-friend-modal-description"
    >
      <Box sx={style}>
        {/* Modal Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography id="refer-friend-modal-title" variant="h6" component="h2" 
            sx={{ 
              display: 'flex',
              fontSize: '24px',
              fontWeight: '700',
              lineHeight: '33px'
            }}
          >
            {/* Set the fill color explicitly */}
            <Box
              component="img"
              src={GiftIcon}
              alt=""
              sx={{ 
                width: '32px',
                height: '32px',
                marginRight: '10px'
               }}
            />
            My Referral Info
          </Typography>
          <IconButton onClick={() => handleClose(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Referral Code */}
        <Box mt={2}>
          <Typography variant="body1"
            sx={{
              fontSize: '24px',
              lineHeight: '33px',
            }}
          >
            Your referral code:
          </Typography>
          <Box display="flex" alignItems="center" mt={1}>
            <Box
              component="span"
              sx={{ 
                marginRight: '8px', 
                borderRadius: '32px', 
                width: '140px',
                backgroundColor: 'white',
                padding: '8px 12px',
                maxWidth: '140px',
                textAlign: 'center',
                fontWeight: '700'
              }}
            >
              {referralCode}
            </Box>
            <Button
              variant="contained"
              onClick={() => handleCopy(referralCode)}
              sx={{ 
                borderRadius: '32px', 
                color: 'white', 
                background: 'rgba(73, 91, 253, 1)',
                textTransform: 'capitalize'
               }}
            >
              Copy code
            </Button>
          </Box>
        </Box>

        {/* Referral Link */}
        <Box mt={2}>
          <Typography variant="body1"
            sx={{
              fontSize: '24px',
              lineHeight: '33px',
            }}
          >
            Your referral link:
          </Typography>
          <Box display="flex" alignItems="center" mt={1}>
            <Box
              component="span"
              sx={{ 
                marginRight: '8px', 
                borderRadius: '32px',
                backgroundColor: 'white',
                padding: '8px 24px',
                textAlign: 'center',
                fontWeight: '700'
              }}
            >
              {referralLink}
            </Box>
            <Button
              variant="contained"
              onClick={() => handleCopy(referralLink)}
              sx={{ 
                borderRadius: '32px', 
                color: 'white', 
                background: 'rgba(73, 91, 253, 1)',
                textTransform: 'capitalize'
               }}
            >
              Copy referral link
            </Button>
          </Box>
        </Box>

        {/* How It Works */}
        <Box mt={4}>
          <Typography variant="body1"
            sx={{
              fontSize: '24px',
              lineHeight: '33px',
            }}
          >
            How it Works
          </Typography>
          <Typography variant="body2" mt={1}>
            <b>1. Sign up number and date</b>
          </Typography>
          <ul>
            <li>Below 10 persons signed up per month - Incentive TBC</li>
            <li>Above 10 and below 30 signed up per month - Incentive TBC</li>
            <li>Above 30 signed up per month - Incentive TBC</li>
          </ul>

          <Typography variant="body2" mt={1}>
            <b>2. Paying user number and Tiered Commission</b>
          </Typography>
          <ul>
            <li>Below US$15,000 sales per month - 5%</li>
            <li>Above US$15,000 and below US$30,000 per month - 7.5%</li>
            <li>Above US$30,000 - 10% per month</li>
          </ul>

          <Typography variant="body2" mt={2}>
            Read more details <a href="#">here</a>
          </Typography>
        </Box>

        {/* My Referrals */}
        <Box mt={4}>
          <Typography variant="body1"
            sx={{
              fontSize: '24px',
              lineHeight: '33px',
            }}
          >
            My Referrals
          </Typography>
          <table id={'table-my-referral'} style={{ width: '100%', marginTop: '10px', textAlign: 'left' }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Id</th>
                <th>Token</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {referralData.map((referral: IReferral, index) => (
                <tr key={index}>
                  <td>{referral.date}</td>
                  <td>{referral.id}</td>
                  <td>{referral.token}</td>
                  <td>{referral.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Box>
    </Modal>
  );
};

export default ReferralModal;