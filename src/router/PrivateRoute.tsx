import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import { Navigate, useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const location = useLocation()
  const { keycloak } = useKeycloak();
  const isLoggedIn = keycloak.authenticated;
  // const isLoggedIn = false

  return (
    <>
      {isLoggedIn ? (
        children
      ) : (
        <Navigate to="/" state={{ from: location }} replace />
      )}
    </>
  );
};

export default PrivateRoute;
