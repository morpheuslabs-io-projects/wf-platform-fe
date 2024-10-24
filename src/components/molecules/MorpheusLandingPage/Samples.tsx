/** @format */

import { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { ISCItemLading, SCItemLanding } from "@/components/atoms/SCItemLanding";
// import { usePaginationState } from "@/hooks/use-pagination-state";
import { Pagination } from "./Pagination";
import { DialogModal } from "./DialogModal";
import { getListSampleSolution } from "@/services/wfAdmin.service";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination as PaginationSwiper,
  Navigation,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { EWindowSize, useReSize } from "@/hooks/useSize";
import "swiper/css";
import "swiper/css/pagination";

const SampleComponent: FC = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(4);

  const mode = useReSize();

  const [slugShowModalDetails, setShowModalDetails] = useState("");
  const [dataFromApi, setDataFromApi] = useState<any>();
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const [listDataLanding, setListDataLanding] = useState<ISCItemLading[]>([]);

  useEffect(() => {
    if (dataFromApi && dataFromApi.total) {
      const listDataDisplay: any[] = [];
      dataFromApi.solutions.forEach((item: any) => {
        // if (
        //   idx >= (pagination.page - 1) * pagination.perPage &&
        //   idx <= pagination.page * pagination.perPage - 1
        // ) {
        listDataDisplay.push({
          id: item.id,
          image: item.photo,
          title: item.title,
          slug: item.slug,
        });
        // }
      });
      setListDataLanding(listDataDisplay as ISCItemLading[]);
    }
  }, [dataFromApi, perPage, page]);

  useEffect(() => {
    // async () => {
    getListSampleSolution().then((data) => {
      setDataFromApi(data.data);
    });

    // };
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

  const handleShowDetails = (slug: string) => {
    setShowModalDetails(slug);
  };

  return (
    <Box
      sx={{
        pt: ` ${mode === EWindowSize.MOBILE ? "0" : "120px"}`,
        pb: ` ${mode === EWindowSize.MOBILE ? "30px" : "80px"}`,
        backgroundColor: "#F1F5FA ",
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
          sx={{ pb: "32px", justifyContent: "center" }}
        >
          <Typography variant="header_3">Featured Solutions</Typography>
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
              mode === EWindowSize.PC ? 4 : mode === EWindowSize.TABLET ? 2 : 1
            }
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            modules={[PaginationSwiper, Navigation, Scrollbar, A11y]}
            className="mySwiper"
          >
            {listDataLanding &&
              listDataLanding.map((sample, idx) => {
                return (
                  <SwiperSlide key={idx} style={{ height: "auto" }}>
                    <Stack
                      sx={{
                        width: "100%",
                        // alignSelf: "stretch",
                        maxWidth: `${mode === EWindowSize.PC && "382px"}`,
                      }}
                    >
                      <SCItemLanding
                        maxHeight={`${
                          mode === EWindowSize.PC
                            ? "218px"
                            : mode === EWindowSize.PCMIN
                            ? "181px"
                            : mode === EWindowSize.TABLET
                            ? "210px"
                            : "100%"
                        }`}
                        minHeight={`${mode === EWindowSize.PC ? "" : "200px"} `}
                        title={sample.title}
                        image={sample.image}
                        slug={sample.slug}
                        handleShowDetails={handleShowDetails}
                      />
                    </Stack>
                  </SwiperSlide>
                );
              })}

            {listDataLanding &&
              listDataLanding.length >
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
        {slugShowModalDetails && (
          <DialogModal
            slugShowModalDetails={slugShowModalDetails}
            handleClose={() => {
              setShowModalDetails("");
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default SampleComponent;
