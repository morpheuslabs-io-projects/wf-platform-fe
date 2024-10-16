import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { ROUTE_PATH, TEXT } from "@/constants/AppConfig";

const ReferralCapture = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const referralCode = searchParams.get(TEXT.REFERRAL_BY);

    if (referralCode) {
      Cookies.set(TEXT.REFERRAL_BY, referralCode, { domain: `.${TEXT.MORPHEUSLABS_IO}` });
      window.open(`${ROUTE_PATH.SIGN_IN()}`, "_self");
    }
  }, [location, navigate]);

  return children;
};

export default ReferralCapture;
