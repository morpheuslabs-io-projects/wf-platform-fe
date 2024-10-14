import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { ROUTE_PATH } from "@/constants/AppConfig";

const ReferralCapture = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const referralCode = searchParams.get('referralBy');

    if (referralCode) {
      Cookies.set('ReferralBy', referralCode, { domain: '.morpheuslabs.io' });
      console.log('Referral code saved: ', referralCode);
      window.open(`${ROUTE_PATH.SIGN_IN()}`, "_self");
    }
  }, [location, navigate]);

  return children;
};

export default ReferralCapture;
