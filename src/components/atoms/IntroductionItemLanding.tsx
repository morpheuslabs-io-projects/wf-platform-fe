/** @format */

import { EWindowSize, useReSize } from "@/hooks/useSize";
import { Box, Typography } from "@mui/material";
export interface ISCItemLading {
  image: string;
  title: string;
  video: string;
  handleShowDetails?: (slug: string) => void;
  maxHeight: string;
  minHeight: string;
  cta?: string;
  description?: string;
}
export const IntroductionItemLanding = (params: ISCItemLading) => {
  const mode = useReSize();
  console.log("params", params);
  return (
    <Box
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#FFFFFF",
        minHeight: params.minHeight,
        cursor: "pointer",
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.15)",
      }}
      onClick={() => {
        if (params.cta) window.open(params.cta, "_blank");
      }}
    >
      <Box
        style={{
          textAlign: "center",
          maxHeight: params.maxHeight,
          width: "100%",
        }}
      >
        <img
          src={params.image}
          alt="bubble"
          style={{
            width: "100%",
            maxWidth: "100%",
            maxHeight: `${
              mode === EWindowSize.PC
                ? "218px"
                : mode === EWindowSize.PCMIN
                ? "181px"
                : mode === EWindowSize.TABLET
                ? "210px"
                : "100%"
            }`,
            height: "100%",
          }}
        />
      </Box>
      <Box
        style={{
          width: "100%",
          height: `calc(100% - 200px)`,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="body"
          style={{
            color: "#252525",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
            fontSize: "14",
            textAlign: "center",
            fontFamily: "Poppins",
            fontWeight: "400",
            height: "54px",
          }}
        >
          {params.title}
        </Typography>
      </Box>
    </Box>
  );
};
