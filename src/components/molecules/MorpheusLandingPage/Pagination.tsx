/** @format */

import { IconButton, Stack } from "@mui/material";
import SliderRight from "@/assets/icons/slider-right.svg";
import SliderLeft from "@/assets/icons/slider-left.svg";
import DotBlack from "@/assets/icons/dot-black.svg";
import DotGrey from "@/assets/icons/dot-grey.svg";
import { useEffect, useState } from "react";
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
  useEffect(() => {
    if (perPage) {
      const pages = Math.ceil(total / perPage);
      setPageDisplay(pages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perPage]);
  console.log(page);
  return (
    <>
      <IconButton
        aria-label="settings"
        onClick={() => {
          if (page > 1) {
            onPreviousPage();
          }
        }}
        style={{
          opacity: page <= 1 ? "0.2" : "1",
          cursor: page <= 1 ? "not-allowed" : "pointer",
        }}
      >
        <img src={SliderLeft} alt="" />
      </IconButton>
      <>
        {Array.from(Array(pageDisplay), (e, i) => {
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
      </>
      {/* <IconButton aria-label="settings">
        <img src={DotBlack} alt="" />
      </IconButton>
      <IconButton aria-label="settings">
        <img src={DotGrey} alt="" />
      </IconButton> */}
      <IconButton
        aria-label="settings"
        onClick={() => {
          if (page < pageDisplay) {
            onNextPage();
          }
        }}
        style={{
          opacity: page == pageDisplay ? "0.2" : "1",
          cursor: page == pageDisplay ? "not-allowed" : "pointer",
        }}
      >
        <img src={SliderRight} alt="" />
      </IconButton>
    </>
  );
};
