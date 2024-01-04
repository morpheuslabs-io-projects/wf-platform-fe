/** @format */

import { Box, IconButton } from "@mui/material";
import SliderRight from "@/assets/icons/slider-right.svg";
import SliderLeft from "@/assets/icons/slider-left.svg";

import { useSwiper } from "swiper/react";

export const Pagination = () => {
  const swiper = useSwiper();

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
