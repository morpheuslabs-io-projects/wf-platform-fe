import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IMembership } from '@/types';
import "./referralModal.css";
import { ReactComponent as GiftIcon } from '@/assets/icons/gift.svg';
import { useEffect, useState } from 'react';
import { MembershipService } from '@/services/membership.service';
import { ROUTE_PATH, TEXT } from '@/constants/AppConfig';
import { format } from 'date-fns';

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
  subscriptions: IReferralSubscriptions[];
}

interface IReferralSubscriptions {
  id: string;
  date: string;
  token: string;
  amount: string;
  name: string;
}

interface IReferralFlatMap {
  orgId: string;
  subId: string;
  date: string;
  token: string;
  amount: string;
  name: string;
}

const ReferralModal = ({ currentMembership, handleClose, isOpen }: IReferralDialog): JSX.Element | null => {
  const referralCode = currentMembership?.member_id;
  const referralLink = `${ROUTE_PATH.REFERRAL_URL()}?${TEXT.REFERRAL_BY}=${referralCode}`;
  const [referralData, setReferralData] = useState<IReferral[]>([]);

  const handleCopy = (text: any) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    const getReferralData = async () => {
      if (isOpen && currentMembership?.member_id) {
        MembershipService.getReferralData()
        .then((res) => setReferralData(res))
        .catch((error) => console.log(error));
      }
    };

    getReferralData();
  }, [isOpen, currentMembership]);

  const handleModalClose = () => {
    handleClose();
  };

  const referralDataFlatMap = (): IReferralFlatMap[] => {
    return referralData.flatMap((org) =>
      org.subscriptions.map((sub: any) => ({
        orgId: org.id.toString(),
        subId: sub.id.toString(),
        date: convertTimestampToDate(sub.date),
        token: sub.token,
        amount: sub.amount,
        name: sub.name,
      }))
    );
  };

  const convertTimestampToDate = (timestamp: number): string => {
    return format(new Date(timestamp * 1000), 'dd.MM; HH:mm:ss');
  };

  return (
    <Modal
      open={isOpen || false}
      onClose={handleModalClose}
      aria-labelledby="refer-friend-modal-title"
      aria-describedby="refer-friend-modal-description"
    >
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography id="refer-friend-modal-title" variant="h6" component="h2"
            sx={{
              display: 'flex',
              fontSize: '24px',
              fontWeight: '700',
              lineHeight: '33px'
            }}
          >
            <GiftIcon style={{ fill: '#252525' }}/> My Referral Info
          </Typography>
          <IconButton onClick={() => handleClose(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

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

        <Box mt={4}>
          <Typography variant="body1"
            sx={{
              fontSize: '24px',
              lineHeight: '33px',
            }}
          >
            How it Works
          </Typography>

          <Typography variant="body2" mt={2}>
            Read more details <a href="https://morpheuslabs.io/" target="_blank" rel="noopener noreferrer">here</a>
          </Typography>
        </Box>

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
                <th style={{ width: '30%' }}>Register Date</th>
                <th style={{ width: '20%' }}>User ID</th>
                <th style={{ width: '25%' }}>Current Subscription</th>
                <th style={{ width: '15%' }}>Earned</th>
              </tr>
            </thead>
            <tbody>
              {referralDataFlatMap().map((referral: IReferralFlatMap, index: number) => (
                <tr key={index}>
                  <td>{referral.date}</td>
                  <td>@{referral.orgId}</td>
                  <td>{referral.name}</td>
                  <td>
                    +{(parseFloat(referral.amount) !== 0 
                      ? parseFloat(referral.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) 
                      : '0.00')} {parseFloat(referral.amount) !== 0 && referral.token?.toUpperCase()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
        <Box sx={{ textAlign: 'left', marginTop: '10px' }}>
          <Button
            variant="contained"
            disabled
            sx={{ 
              borderRadius: '32px', 
              color: 'white', 
              background: 'rgba(73, 91, 253, 1)',
              textTransform: 'capitalize'
            }}
          >
            Claim Rewards
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ReferralModal;
