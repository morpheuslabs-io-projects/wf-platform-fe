/** @format */

import { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { ISCItemLading, SCItemLanding } from "@/components/atoms/SCItemLanding";
import { usePaginationState } from "@/hooks/use-pagination-state";
import { Pagination } from "./Pagination";
import { DialogModal } from "./DialogModal";
import { getListSampleSolution } from "@/services/sampleSolution.service";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination as PaginationSwiper } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
const SampleComponent: FC = () => {
  const pagination = usePaginationState({
    initialPage: 1,
    initialPerPage: 4,
  });

  const [slugShowModalDetails, setShowModalDetails] = useState("");
  const [dataFromApi, setDataFromApi] = useState<any>();
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const [listDataLanding, setListDataLanding] = useState<ISCItemLading[]>([]);

  useEffect(() => {
    if (dataFromApi && dataFromApi.total) {
      const listDataDisplay: any[] = [];
      dataFromApi.solutions.forEach((item: any, idx: number) => {
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
  }, [dataFromApi]);

  useEffect(() => {
    // async () => {
    getListSampleSolution().then((data) => {
      setDataFromApi(data.data);
    });

    // };
  }, [pagination.page]);

  const handleShowDetails = (slug: string) => {
    // setShowModalDetails(slug);
  };

  return (
    <Box
      sx={{
        pt: "120px",
        pb: "80px",
        backgroundColor: "#F1F5FA ",
      }}
    >
      <Box sx={{ maxWidth: "1600px", marginLeft: "25px" }}>
        <Stack
          spacing={{ xs: 2 }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
          sx={{ pb: "32px", justifyContent: "center" }}
        >
          <Typography variant="header_3">Sample Solutions</Typography>
        </Stack>
        <Stack
          direction={{ sm: "column", md: "row" }}
          spacing={{ xs: 1, sm: 2 }}
        >
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            modules={[PaginationSwiper]}
            className="mySwiper"
          >
            {listDataLanding &&
              listDataLanding.length &&
              listDataLanding.map((sample, idx) => {
                return (
                  <SwiperSlide key={idx}>
                    <Stack sx={{ width: "100%", height: "auto" }}>
                      <SCItemLanding
                        title={sample.title}
                        image={sample.image}
                        slug={sample.slug}
                        handleShowDetails={handleShowDetails}
                      />
                    </Stack>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </Stack>
        <Stack
          spacing={{ xs: 2 }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
          sx={{ pb: "32px", justifyContent: "center" }}
        >
          {dataFromApi && (
            <Pagination
              total={(dataFromApi && dataFromApi.total) || 0}
              page={pagination.page}
              perPage={pagination.perPage}
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onNextPage={() => {
                pagination.setPage(pagination.page + 1);
              }}
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onPreviousPage={() => {
                pagination.setPage(pagination.page - 1);
              }}
            />
          )}
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
