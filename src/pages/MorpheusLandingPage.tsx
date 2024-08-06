/** @format */

import HeaderComponent from "@/components/header/Header";
import Introduction from "@/components/molecules/MorpheusLandingPage/Introduction";
import SampleComponent from "@/components/molecules/MorpheusLandingPage/Samples";
import { FC } from "react";

const MorpheusLandingPage: FC = () => {
  return (
    <>
      <HeaderComponent />
      <Introduction />
      <SampleComponent />
    </>
  );
};

export default MorpheusLandingPage;
