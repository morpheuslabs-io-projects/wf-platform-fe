import { KeycloakInitOptions } from "keycloak-js";
import Keycloak from "keycloak-js";
import type T_Keycloak from "keycloak-js";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface I_InitKeycloak {
  init: {
    url: string;
    realm: string;
    clientId: string;
  };
}

export interface TReactKeycloakProvider extends I_InitKeycloak {
  children: JSX.Element;
  loadingComponent?: JSX.Element | string;
  errorComponent?: JSX.Element | string;
  initOptions?: KeycloakInitOptions;
}

const ReactKeycloakCTX = createContext<T_Keycloak | null>(null);

export const ReactKeycloakProvider = ({
  init,
  children,
  loadingComponent,
  errorComponent,
  initOptions,
}: TReactKeycloakProvider) => {
  const [dataKeycloak, setDataKeycloak] = useState<T_Keycloak | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const keycloakInitOptions: KeycloakInitOptions = {
    onLoad: "login-required",
    checkLoginIframe: false,
    ...initOptions,
  };

  const initKey = useCallback(() => {
    const initKeycloak = new Keycloak(init);
    initKeycloak
      .init(keycloakInitOptions)
      .then((authenticated) => {
        if (authenticated) {
          setDataKeycloak(initKeycloak);
        }
        setDataKeycloak(initKeycloak);
      })
      .catch((e) => {
        console.error("Error init keycloak: ", e);
        setIsError(true);
      });
  }, []);

  useEffect(() => {
    initKey();
  }, [initKey]);

  return (
    <>
      {isError ? (
        <>{errorComponent ? errorComponent : "Something went error!"}</>
      ) : dataKeycloak ? (
        <ReactKeycloakCTX.Provider value={dataKeycloak}>
          {children}
        </ReactKeycloakCTX.Provider>
      ) : (
        <>{loadingComponent ? loadingComponent : "Loading..."}</>
      )}
    </>
  );
};

export const useReactKeycloak = (): T_Keycloak => {
  const dataKeycloak = useContext(ReactKeycloakCTX);

  const allData = {
    ...dataKeycloak,
  };
  return allData as T_Keycloak;
};
