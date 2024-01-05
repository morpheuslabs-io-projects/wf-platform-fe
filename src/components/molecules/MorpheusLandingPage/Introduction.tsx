/** @format */

import { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Background from "@/assets/icons/morpheus-background.svg";
import AI from "@/assets/icons/AI.svg";
import NextIcon from "@/assets/icons/next-black.svg";
import { VITE_APP_SC_URL, VITE_APP_WF_URL } from "@/constants/AppConfig";
import { EWindowSize, useReSize } from "@/hooks/useSize";

const Introduction: FC = () => {
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
              <Box
                sx={{
                  margin: "auto",
                  px: 3,
                  wordBreak: "break-word",
                  width: "100%",
                  boxSizing: "border-box",
                  padding: `${
                    mode === EWindowSize.MOBILE ? "33px 54px 16px" : "0 16px"
                  }`,
                }}
              >
                <Typography
                  variant="sub_title"
                  style={{
                    display: "inline-block",
                    padding: "0 10px",
                    lineHeight: `${
                      mode === EWindowSize.MOBILE ? "21px" : "34px"
                    }`,
                    // padding: "0 16px",
                    fontSize: `${
                      mode === EWindowSize.MOBILE ? "14px" : "24px"
                    }`,
                    background:
                      "linear-gradient(90deg, #FFF 0%, rgba(255, 255, 255, 0.47) 60.71%, rgba(255, 255, 255, 0.49) 100%)",
                  }}
                >
                  Enable Web3 Transformation and Process Automation with our
                </Typography>
              </Box>
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
                  AI-Powered Web3 Workflow Platform
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box>
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
              top: `${mode !== EWindowSize.MOBILE && "-110px"}`,
            }}
          >
            <Box
              sx={{
                display: "flex",
                padding: `${
                  mode === EWindowSize.MOBILE
                    ? "10px 20px"
                    : mode === EWindowSize.TABLET
                    ? "10px 10px"
                    : "45px 50px"
                } `,
                width: `${
                  mode === EWindowSize.MOBILE
                    ? "70%"
                    : mode === EWindowSize.TABLET
                    ? "240px"
                    : "327px"
                } `,
                minWidth: `${mode !== EWindowSize.MOBILE ? "240px" : "320px"} `,
                boxSizing: "border-box",
                alignItems: "start",
                background: "linear-gradient(160deg, #D7E0FF 0%, #FFF 100%)",
                boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.15)",
                backdropFilter: "blur(4px)",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => window.open(`${VITE_APP_WF_URL}`)}
            >
              <Typography
                variant="sub_title"
                style={{
                  fontSize: `${mode === EWindowSize.MOBILE ? "16px" : "24px"}`,
                  lineHeight: `${
                    mode === EWindowSize.MOBILE ? "24px" : "34px"
                  }`,
                  display: `${
                    mode === EWindowSize.MOBILE ? "inline-flex" : "inline"
                  }`,
                  alignItems: "center",
                }}
              >
                Start Process Automation
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                padding: `${
                  mode === EWindowSize.MOBILE
                    ? "10px 20px"
                    : mode === EWindowSize.TABLET
                    ? "10px 10px"
                    : "45px 50px"
                } `,
                width: `${
                  mode === EWindowSize.MOBILE
                    ? "70%"
                    : mode === EWindowSize.TABLET
                    ? "240px"
                    : "327px"
                } `,
                minWidth: `${mode !== EWindowSize.MOBILE ? "240px" : "320px"} `,
                boxSizing: "border-box",
                alignItems: "start",
                background: "linear-gradient(160deg, #DCFFD7 0%, #FFF 100%)",
                boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.15)",
                backdropFilter: "blur(4px)",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => window.open(`${VITE_APP_WF_URL}`)}
            >
              <Typography
                variant="sub_title"
                style={{
                  fontSize: `${mode === EWindowSize.MOBILE ? "16px" : "24px"}`,
                  lineHeight: `${
                    mode === EWindowSize.MOBILE ? "24px" : "34px"
                  }`,
                  display: `${
                    mode === EWindowSize.MOBILE ? "inline-flex" : "inline"
                  }`,
                  alignItems: "center",
                }}
              >
                Start Integration Automation
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                padding: `${
                  mode === EWindowSize.MOBILE
                    ? "10px 20px"
                    : mode === EWindowSize.TABLET
                    ? "10px 10px"
                    : "45px 50px"
                } `,
                width: `${
                  mode === EWindowSize.MOBILE
                    ? "70%"
                    : mode === EWindowSize.TABLET
                    ? "240px"
                    : "327px"
                } `,
                minWidth: `${mode !== EWindowSize.MOBILE ? "240px" : "320px"} `,
                boxSizing: "border-box",
                alignItems: "start",
                background: "linear-gradient(160deg, #FFFBD7 0%, #FFF 100%)",
                boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.15)",
                backdropFilter: "blur(4px)",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => window.open(`${VITE_APP_SC_URL}`)}
            >
              <Typography
                variant="sub_title"
                style={{
                  fontSize: `${mode === EWindowSize.MOBILE ? "16px" : "24px"}`,
                  lineHeight: `${
                    mode === EWindowSize.MOBILE ? "24px" : "34px"
                  }`,
                  display: `${
                    mode === EWindowSize.MOBILE ? "inline-flex" : "inline"
                  }`,
                  alignItems: "center",
                }}
              >
                Create {mode === EWindowSize.PC && <br />}
                Smart Contracts
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          px: `${mode === EWindowSize.MOBILE ? "14px" : "8%"}`,
          pt: `${mode === EWindowSize.MOBILE ? "0" : "8px"}`,
          bgcolor: `${
            mode === EWindowSize.MOBILE ? "#F1F5FA" : "background.default"
          }`,
          position: "relative",
          top: `${mode === EWindowSize.MOBILE ? "-53px" : "0"}`,
        }}
      >
        <Grid
          container
          columnSpacing={3}
          rowSpacing={3}
          style={{ overflow: "hidden" }}
        >
          <Grid item xs={12} md={6}>
            <Box>
              <iframe
                width="100%"
                height="350"
                src="https://www.youtube.com/embed/5wOhrU2V-SI"
                title="Artificial intelligence Intro Template"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: "flex" }}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
              }}
            >
              Find out more info from the product demo video
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Introduction;
