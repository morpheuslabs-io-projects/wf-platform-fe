import { ROUTE_PATH } from '@/constants/AppConfig';
import { CookiesHelper } from '@/helper/cookies';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ReferralCapture: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const referralCode = searchParams.get('referralBy');
    console.log('Referral code set in cookie: ', referralCode);

    if (referralCode) {
      // Set the referral code into the cookie
      CookiesHelper.set('referralBy', referralCode);
      console.log('saved: ', referralCode);
    }
    navigate(ROUTE_PATH.SIGN_IN(), { replace: true });
  }, [location, navigate]);

  return null;
};

export default ReferralCapture;
