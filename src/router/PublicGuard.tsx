import { useAuthentication } from "@/store/authentication";
import { Outlet } from "react-router-dom";

const PublicGuard = () => {
  const { user } = useAuthentication();

  if (user) {
    document.location.href = "/";
  }
  return <Outlet />;
};

export default PublicGuard;
