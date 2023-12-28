/** @format */

import { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { ISCItemLading, SCItemLanding } from "@/components/atoms/SCItemLanding";
// import { usePaginationState } from "@/hooks/use-pagination-state";
import { Pagination } from "./Pagination";
import { DialogModal } from "./DialogModal";
import { getListSampleSolution } from "@/services/sampleSolution.service";
import { EWindowSize, useReSize } from "@/hooks/useSize";

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
      dataFromApi.solutions.forEach((item: any, idx: number) => {
        if (idx >= (page - 1) * perPage && idx <= page * perPage - 1) {
          listDataDisplay.push({
            id: item.id,
            image: item.photo,
            title: item.title,
            slug: item.slug,
          });
        }
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
          maxWidth: "1600px",
          margin: `${mode !== EWindowSize.MOBILE ? "0 25px" : "0 14px"}`,
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
          {listDataLanding &&
            listDataLanding.length &&
            listDataLanding.map((sample, idx) => {
              return (
                <Stack
                  key={idx}
                  sx={{
                    width: `${
                      mode === EWindowSize.MOBILE
                        ? "100%"
                        : mode === EWindowSize.TABLET
                        ? "50%"
                        : "25%"
                    } `,
                    alignItems: "stretch",
                    height: "auto",
                    // alignSelf: "stretch",
                    maxWidth: `${mode === EWindowSize.PC && "382px"}`,
                  }}
                >
                  <SCItemLanding
                    maxHeight={`${
                      mode === EWindowSize.PC ? "265px" : "400px"
                    } `}
                    minHeight={`${
                      mode === EWindowSize.PC ? "265px" : "200px"
                    } `}
                    title={sample.title}
                    image={sample.image}
                    slug={sample.slug}
                    handleShowDetails={handleShowDetails}
                  />
                </Stack>
              );
            })}
        </Stack>
        <Stack
          spacing={{ xs: 2 }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
          sx={{ pt: "20px", justifyContent: "center" }}
        >
          {dataFromApi && (
            <Pagination
              total={(dataFromApi && dataFromApi.total) || 0}
              page={page}
              perPage={perPage}
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onNextPage={() => {
                setPage(page + 1);
              }}
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onPreviousPage={() => {
                setPage(page - 1);
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
