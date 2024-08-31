import { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Background from "@/assets/icons/morpheus-background.svg";
import AI from "@/assets/icons/AI.svg";
import { EWindowSize, useReSize } from "@/hooks/useSize";
import FAQ from "@/assets/images/faq.png";
import Documentations from "@/assets/images/documentations.png";
import SupportChat from "@/assets/images/support-chat.png";

const SectionCardsSupportCenter: FC = () => {
  const mode = useReSize();

  return (
    <>
      <Box
        style={{
          backgroundImage: `${
            mode === EWindowSize.MOBILE ? `url(${Background})` : ""
          }`,
          minHeight: `${mode === EWindowSize.MOBILE ? "542px" : "unset"}`,
        }}
      >
        <Box
          sx={{
            backgroundImage: `${
              mode !== EWindowSize.MOBILE && `url(${Background})`
            }`,
            minHeight: `${mode !== EWindowSize.MOBILE && "400px"}`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            textAlign: "center",
            position: "relative",
          }}
        >
          <Box sx={{ pt: "15px" }}>
            <Box>
              {mode !== EWindowSize.MOBILE && <img src={AI} alt="" />}

              <Box>
                <Typography
                  variant="header_2"
                  style={{
                    display: "inline-block",
                    marginTop: "10px",
                    lineHeight: `${
                      mode === EWindowSize.MOBILE ? "48px" : "70px"
                    }`,
                    // padding: "0 50px",
                    marginBottom: `${
                      mode === EWindowSize.MOBILE ? "20px" : "0"
                    }`,
                    width: `${mode === EWindowSize.MOBILE ? "320px" : "100%"}`,
                    fontSize: `${
                      mode === EWindowSize.MOBILE ? "36px" : "48px"
                    }`,
                    // background:
                    //   "linear-gradient(90deg, #FFF 0%, rgba(255, 255, 255, 0.47) 60.71%, rgba(255, 255, 255, 0.49) 100%)",
                  }}
                >
                  How can we help?
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            background: "#FFF",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: `${
                mode === EWindowSize.MOBILE ? "column" : "row"
              } `,
              alignItems: `${mode === EWindowSize.MOBILE && "center"}`,
              position: "relative",
              gap: `${mode === EWindowSize.MOBILE ? "24px" : "16px"}`,
              top: `${mode !== EWindowSize.MOBILE && "-45px"}`,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                gap: "16px",

                padding: `${
                  mode === EWindowSize.MOBILE
                    ? "10px 20px"
                    : mode === EWindowSize.TABLET
                    ? "10px 10px"
                    : "32px 32px"
                } `,
                width: `${
                  mode === EWindowSize.MOBILE
                    ? "70%"
                    : mode === EWindowSize.TABLET
                    ? "240px"
                    : "345px"
                } `,
                minWidth: `${mode !== EWindowSize.MOBILE ? "240px" : "320px"} `,
                boxSizing: "border-box",
                alignItems: "center",
                backgroundColor: "#FFFFFF66",
                border: "3px solid #FFFFFF",
                borderRadius: "7px",
                boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.15)",
                backdropFilter: "blur(4px)",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={(e) => {
                const faq = document.getElementById("faq");
                e.preventDefault(); // Stop Page Reloading
                faq && faq.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <img src={FAQ} alt="faq" />
              <Typography
                variant="subtitle_bold"
                style={{
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                FAQ
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                gap: "16px",

                padding: `${
                  mode === EWindowSize.MOBILE
                    ? "10px 20px"
                    : mode === EWindowSize.TABLET
                    ? "10px 10px"
                    : "32px 32px"
                } `,
                width: `${
                  mode === EWindowSize.MOBILE
                    ? "70%"
                    : mode === EWindowSize.TABLET
                    ? "240px"
                    : "345px"
                } `,
                minWidth: `${mode !== EWindowSize.MOBILE ? "240px" : "320px"} `,
                boxSizing: "border-box",
                alignItems: "center",
                backgroundColor: "#FFFFFF66",
                border: "3px solid #FFFFFF",
                borderRadius: "7px",
                boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.15)",
                backdropFilter: "blur(4px)",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={(e) => {
                const faq = document.getElementById("faq");
                e.preventDefault(); // Stop Page Reloading
                faq && faq.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <img src={Documentations} alt="docunmentations" />
              <Typography
                variant="subtitle_bold"
                style={{
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                Documentations
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                gap: "16px",

                padding: `${
                  mode === EWindowSize.MOBILE
                    ? "10px 20px"
                    : mode === EWindowSize.TABLET
                    ? "10px 10px"
                    : "32px 48px"
                } `,
                width: `${
                  mode === EWindowSize.MOBILE
                    ? "70%"
                    : mode === EWindowSize.TABLET
                    ? "240px"
                    : "345px"
                } `,
                minWidth: `${mode !== EWindowSize.MOBILE ? "240px" : "320px"} `,
                boxSizing: "border-box",
                alignItems: "center",
                backgroundColor: "#FFFFFF66",
                border: "3px solid #FFFFFF",
                borderRadius: "7px",
                boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.15)",
                backdropFilter: "blur(4px)",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={(e) => {
                const supportChat = document.getElementById("support-chat");
                e.preventDefault(); // Stop Page Reloading
                supportChat &&
                  supportChat.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <img src={SupportChat} alt="support-chat" />
              <Typography
                variant="subtitle_bold"
                style={{
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                Chat with
                <br />
                Support Team
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SectionCardsSupportCenter;
