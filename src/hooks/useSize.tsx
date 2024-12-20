/** @format */

import { useEffect, useState } from "react";

/** @format */

export const WindowSize = {
  TABLET: 1200,
  MOBILE: 768,
  PCMIN: 1368,
};

// eslint-disable-next-line react-refresh/only-export-components
export enum EWindowSize {
  PC = "pc",
  TABLET = "tablet",
  MOBILE = "mobile",
  PCMIN = "pcmin",
}

const getIsMobile = () => {
  if (window.innerWidth <= WindowSize.MOBILE) return EWindowSize.MOBILE;
  if (window.innerWidth <= WindowSize.TABLET) return EWindowSize.TABLET;
  return EWindowSize.PC;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useReSize = () => {
  const [mode, setMode] = useState(getIsMobile());

  useEffect(() => {
    const onResize = () => {
      setMode(getIsMobile());
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return mode;
};
