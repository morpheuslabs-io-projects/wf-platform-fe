import { FC, useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Background from "@/assets/icons/morpheus-background.svg";
import AI from "@/assets/icons/AI.svg";
import {
  VITE_APP_SC_URL,
  VITE_APP_WF_URL,
  VITE_APP_WS_URL,
} from "@/constants/AppConfig";
import { EWindowSize, useReSize } from "@/hooks/useSize";
import { Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { IntroductionItemLanding } from "@/components/atoms/IntroductionItemLanding";
import {
  Pagination as PaginationSwiper,
  Navigation,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { Pagination } from "./Pagination";

import { getListIntroductionVideos } from "@/services/introduction.service";
import "swiper/css";
import "swiper/css/pagination";

const Introduction: FC = () => {
  const mode = useReSize();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(4);
  const [videoIntroductions, setVideoIntroductions] = useState<any[]>([]);
  const [dataFromApi, setDataFromApi] = useState<any>();

  const getIntroductionVideos = useCallback(async () => {
    const introductionVideos = await getListIntroductionVideos();
    setDataFromApi(introductionVideos);
  }, [videoIntroductions?.length]);

  useEffect(() => {
    if (dataFromApi && dataFromApi.total) {
      const listDataDisplay: any[] = [];
      dataFromApi.introductions.forEach((item: any) => {
        // if (
        //   idx >= (pagination.page - 1) * pagination.perPage &&
        //   idx <= pagination.page * pagination.perPage - 1
        // ) {
        listDataDisplay.push({
          id: item.id,
          title: item.title,
          image: item.image,
          description: item.description,
          video: item.video,
          cta: item.cta,
        });
        // }
      });
      setVideoIntroductions(listDataDisplay);
    }
  }, [dataFromApi, perPage, page]);

  useEffect(() => {
    getIntroductionVideos();
  }, []);

  useEffect(() => {
    if (mode === EWindowSize.MOBILE) {
      setPerPage(2);
      setPage(1);
    }

    if (mode === EWindowSize.TABLET) {
      setPerPage(2);
      setPage(1);
    }
    if (mode === EWindowSize.PC) {
      setPerPage(4);
      setPage(1);
    }
  }, [mode]);

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
                  Enable Web3 Transformation and Process Automation with
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
                  AI-Powered Web3 Platform
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            background: "#F1F5FA",
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
                justifyContent: "center",
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
                Start Web3 <br /> Process Automation
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
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
                alignItems: "start",
                background: "linear-gradient(160deg, #DCFFD7 0%, #FFF 100%)",
                boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.15)",
                backdropFilter: "blur(4px)",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => window.open(`${VITE_APP_WS_URL}`)}
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
                Create Web3 <br /> Web Applications
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
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
          width: "100%",
          background: "#F1F5FA",
        }}
      >
        <Box
          sx={{
            maxWidth: "1536px",
            padding: `${mode !== EWindowSize.MOBILE ? "0 25px" : "0 14px"}`,
            margin: "0 auto",
          }}
        >
          <Stack
            spacing={{ xs: 2 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
            sx={{ pb: "48px", justifyContent: "center" }}
          >
            <Typography variant="header_3">Platform Overview</Typography>
          </Stack>
          <Stack
            direction={{ sm: "column", md: "row" }}
            spacing={{ xs: 1, sm: 3 }}
            alignItems="center"
            justifyContent={mode === EWindowSize.PC ? "stretch" : "center"}
            style={{ textAlign: "center" }}
          >
            <Swiper
              slidesPerView={
                mode === EWindowSize.PC
                  ? 4
                  : mode === EWindowSize.TABLET
                  ? 2
                  : 1
              }
              spaceBetween={20}
              pagination={{
                clickable: true,
              }}
              modules={[PaginationSwiper, Navigation, Scrollbar, A11y]}
              className="mySwiper"
            >
              {videoIntroductions &&
                videoIntroductions.map((introduction, idx) => {
                  return (
                    <SwiperSlide key={idx} style={{ height: "auto" }}>
                      <Stack
                        sx={{
                          width: "100%",
                          alignSelf: "stretch",
                          maxWidth: `${mode === EWindowSize.PC && "382px"}`,
                        }}
                      >
                        <IntroductionItemLanding
                          maxHeight={`${
                            mode === EWindowSize.PC
                              ? "218px"
                              : mode === EWindowSize.PCMIN
                              ? "181px"
                              : mode === EWindowSize.TABLET
                              ? "210px"
                              : "100%"
                          }`}
                          minHeight={`${
                            mode === EWindowSize.PC ? "" : "200px"
                          } `}
                          title={introduction.title}
                          image={introduction.image}
                          video={introduction.video}
                          cta={introduction.cta}
                          description={introduction.description}
                        />
                      </Stack>
                    </SwiperSlide>
                  );
                })}

              {videoIntroductions &&
                videoIntroductions.length >
                  (mode === EWindowSize.PC
                    ? 4
                    : mode === EWindowSize.TABLET
                    ? 2
                    : 1) && (
                  <>
                    <Stack
                      spacing={{ xs: 2 }}
                      direction="row"
                      useFlexGap
                      flexWrap="wrap"
                      sx={{ pt: "20px", justifyContent: "center" }}
                    >
                      {dataFromApi && <Pagination />}
                    </Stack>
                  </>
                )}
            </Swiper>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Introduction;
