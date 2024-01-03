/** @format */

import { Box, IconButton } from "@mui/material";
import SliderRight from "@/assets/icons/slider-right.svg";
import SliderLeft from "@/assets/icons/slider-left.svg";
import DotBlack from "@/assets/icons/dot-black.svg";
import DotGrey from "@/assets/icons/dot-grey.svg";
import { useEffect, useState } from "react";
import { useSwiper } from "swiper/react";
interface IPagination {
  total: number;
  page: number;
  perPage: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
}
export const Pagination = ({
  total,
  page,
  perPage,
  onNextPage,
  onPreviousPage,
}: IPagination) => {
  const [pageDisplay, setPageDisplay] = useState(0);
  const swiper = useSwiper();

  useEffect(() => {
    if (perPage) {
      const pages = Math.ceil(total / perPage);
      setPageDisplay(pages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perPage]);
  return (
    <Box
      style={{
        width: "180px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <IconButton
        aria-label="settings"
        onClick={() => {
          swiper.slidePrev();
        }}
        style={
          {
            // opacity: page <= 1 ? "0.2" : "1",
            // cursor: page <= 1 ? "not-allowed" : "pointer",
          }
        }
      >
        <img src={SliderLeft} alt="" />
      </IconButton>
      {/* <>
        {Array.from(Array(pageDisplay), (_e, i) => {
          console.log(page);
          return i + 1 === page ? (
            <IconButton aria-label="settings">
              <img src={DotBlack} alt="" />
            </IconButton>
          ) : (
            <IconButton aria-label="settings">
              <img src={DotGrey} alt="" />
            </IconButton>
          );
        })}
      </> */}
      {/* <IconButton aria-label="settings">
        <img src={DotBlack} alt="" />
      </IconButton>
      <IconButton aria-label="settings">
        <img src={DotGrey} alt="" />
      </IconButton> */}
      <IconButton
        aria-label="settings"
        onClick={() => {
          swiper.slideNext();
        }}
        // style={{
        //   opacity: page == pageDisplay ? "0.2" : "1",
        //   cursor: page == pageDisplay ? "not-allowed" : "pointer",
        // }}
      >
        <img src={SliderRight} alt="" />
      </IconButton>
    </Box>
  );
};
