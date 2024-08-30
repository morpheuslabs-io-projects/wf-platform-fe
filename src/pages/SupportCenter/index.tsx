import HeaderComponent from "@/components/header/Header";
import { FC, useEffect } from "react";
import SectionCardsSupportCenter from "./SectionCards";
import Faq from "./Faq";
import SupportChat from "./SupportChat";
import { ZendeskService } from "@/services/zendesk.service";

declare global {
  interface Window {
    zE: any;
  }
}

const SupportCenterPage: FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.id = "ze-snippet";
    script.src =
      "https://static.zdassets.com/ekr/snippet.js?key=0cd87e1f-467a-4e3c-840b-c3857aa6f2bf";
    document.body.appendChild(script);

    const interval = setInterval(() => {
      if (typeof window.zE === "function") {
        clearInterval(interval);
        window.zE("messenger", "loginUser", function (cb: any) {
          console.log("zenDesk initialized");
          ZendeskService.getToken().then((zenToken) => {
            cb(zenToken);
          });
        });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <HeaderComponent />
      <SectionCardsSupportCenter />
      <Faq />
      <SupportChat />
    </>
  );
};

export default SupportCenterPage;
