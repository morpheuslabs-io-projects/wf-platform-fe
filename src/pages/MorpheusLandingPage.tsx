/** @format */

import { FC } from "react";
import HeaderComponent from "@/components/molecules/MorpheusLandingPage/Header";
import Introduction from "@/components/molecules/MorpheusLandingPage/Introduction";
import SampleComponent from "@/components/molecules/MorpheusLandingPage/Samples";
import { FooterComponent } from "@/components/molecules/MorpheusLandingPage/FooterComponent";

const MorpheusLandingPage: FC = () => {
  return (
    <>
      <HeaderComponent />
      <Introduction />
      <SampleComponent />
      <FooterComponent />
    </>
  );
};

export default MorpheusLandingPage;
