import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { ROUTE_PATH, VITE_ROOT_DOMAIN } from "@/constants/AppConfig";

const ReferralCapture = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const referralCode = searchParams.get('referralBy');

    if (referralCode) {
      Cookies.set('referralBy', referralCode, { domain: `.${VITE_ROOT_DOMAIN}` });
      window.open(`${ROUTE_PATH.SIGN_IN()}`, "_self");
    }
  }, [location, navigate]);

  return children;
};

export default ReferralCapture;
