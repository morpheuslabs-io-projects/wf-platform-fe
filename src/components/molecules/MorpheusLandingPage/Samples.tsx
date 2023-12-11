/** @format */

import { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import SCImg1 from "@/assets/images/sc-image1.png";
import SCImg2 from "@/assets/images/sc-image2.png";
import SCImg3 from "@/assets/images/sc-image3.png";
import SCImg4 from "@/assets/images/sc-image4.png";
import { ISCItemLading, SCItemLanding } from "@/components/atoms/SCItemLanding";
import { usePaginationState } from "@/hooks/use-pagination-state";
import { Pagination } from "./Pagination";

const SampleComponent: FC = () => {
  const pagination = usePaginationState({
    initialPage: 1,
    initialPerPage: 4,
  });

  const [showModalDetails, setShowModalDetails] = useState("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const samples: ISCItemLading[] = [
    {
      id: "1",
      image: SCImg1,
      title: (
        <>
          Sed ut perspiciatis unde
          <br /> omnis iste natus error
        </>
      ),
    },
    { id: "2", image: SCImg2, title: "NFT Marketplace" },
    { id: "3", image: SCImg3, title: "Automate Workflow" },
    { id: "4", image: SCImg4, title: "Smart Contracts Development1" },
    { id: "5", image: SCImg4, title: "Smart Contracts Development2" },
    { id: "6", image: SCImg4, title: "Smart Contracts Development3" },
  ];

  const [listDataLanding, setListDataLanding] = useState<ISCItemLading[]>([]);

  useEffect(() => {
    if (samples.length) {
      const listDataDisplay = samples.filter((item, idx) => {
        if (
          idx >= (pagination.page - 1) * pagination.perPage &&
          idx <= pagination.page * pagination.perPage - 1
        ) {
          return item;
        }
      });
      setListDataLanding(listDataDisplay as ISCItemLading[]);
    }
  }, [pagination.page]);

  const handleShowDetails = (id: string) => {
    setShowModalDetails(id);
  };

  return (
    <Box
      sx={{
        pt: "120px",
        pb: "80px",
        backgroundColor: "#F1F5FA ",
      }}
    >
      <Box sx={{ maxWidth: "1600px" }}>
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
          {listDataLanding &&
            listDataLanding.length &&
            listDataLanding.map((sample, idx) => {
              return (
                <Stack key={idx} sx={{ width: "25%" }}>
                  <SCItemLanding
                    title={sample.title}
                    image={sample.image}
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
          sx={{ pb: "32px", justifyContent: "center" }}
        >
          <Pagination
            total={samples.length}
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
        </Stack>
      </Box>
    </Box>
  );
};

export default SampleComponent;
